import puppeteer from "puppeteer";
export const scrapePage = async (url: string, topic: string) => {
  try {
    // If Cheerio fails or no relevant content is found, use Puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    console.log("Page loaded");
    await page.type("input.gsc-input", topic);
    await page.keyboard.press("Enter");
    await page.waitForSelector(".gsc-webResult .gs-title a", { timeout: 5000 });
    const firstArticleLink = await page.evaluate(() => {
      const firstArticle = document.querySelector(".gsc-webResult .gs-title a");
      return firstArticle ? firstArticle.getAttribute("href") : null;
    });
    console.log(firstArticleLink);

    if (!firstArticleLink) {
      throw new Error("No search results found");
    }

    // Navigate to the first article's page
    await page.goto(firstArticleLink, { waitUntil: "networkidle2" });
    console.log("Article loaded");

    // Extract content from the page
    const textContent = await page.evaluate(() => {
      // Get the text content of the body (or a specific element like 'article')
      const body = document.querySelector("body");
      return body ? body.textContent?.trim() : "";
    });
    if (textContent) {
      const cleanedContent = textContent
        .replace(/\s+/g, " ") // Replace multiple spaces with a single space
        .replace(/[\r\n]+/g, "\n") // Replace multiple newlines with a single newline
        .trim();
      return cleanedContent as string;
    }

    //await browser.close();
    // Filter content by topic
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    throw new Error("Failed to scrape the page");
  }
};
