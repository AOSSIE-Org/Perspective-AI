
from article_scraper import scrape_article_content , search_and_scrape_factcheck

# Test scraping content from a webpage
test_url = "https://www.nrdc.org/stories/global-warming-101"
print("Scraped English content from the URL:")
print(scrape_article_content(test_url))

# Test searching and scraping from FactCheck.org
topic = "climate change"
print("\nScraped FactCheck article content:")
print(search_and_scrape_factcheck(topic) ,"this sis resss")
