import puppeteer from "puppeteer";
import { GoogleGenerativeAI } from "@google/generative-ai";
export const scrapeInput = async (input: string) => {
  const browser = await puppeteer.launch({ headless: false }); // Set headless: true for production
  const page = await browser.newPage();

  try {
    await page.goto(input, { waitUntil: "networkidle2" });

    const textContent = await page.evaluate(() => {
      // Get the text content of the body (or a specific element like 'article')
      const body = document.querySelector("body");
      return body ? body.textContent?.trim() : "";
    });

    if (textContent) {
      const cleanedContent = textContent
        .replace(/\s+/g, " ") // Replace multiple spaces with a single space
        .replace(/[\r\n]+/g, "\n") // Replace multiple newlines with a single newline
        .trim(); // Remove leading/trailing spaces
      const mod = cleanedContent.slice(0, 2000);
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `what clould be the best title for this content , just give me one title for this that is most suitable for this content , with the help of which we can serach this topic on google , the max word for the title can be three and the content is ${mod}`;
      const result = await model.generateContent(prompt);
      console.log(result.response.text(), "name of the content");

      return result.response.text();
    }
  } catch (error) {
    console.error(`Error scraping ${input}:`, error);
    throw new Error("Failed to scrape the page");
  } finally {
    // Close the browser
    await browser.close();
  }
};
