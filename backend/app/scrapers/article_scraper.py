import time
import re
import langdetect
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def scrape_article_content(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        # Remove unnecessary elements
        for tag in soup(["script", "style", "header", "footer", "nav", "aside", "form", "meta"]):
            tag.extract()

        text = soup.get_text(separator="\n").strip()
        text = re.sub(r'\s+', ' ', text)

     
        english_sentences = []
        for sentence in text.split(". "):
            try:
                if langdetect.detect(sentence) == "en":
                    english_sentences.append(sentence)
            except:
                continue 

        return ". ".join(english_sentences)

    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return None

def search_and_scrape_factcheck(topic):
    driver = None
    try:
        options = webdriver.ChromeOptions()
        driver = webdriver.Chrome(options=options)
        driver.get("https://www.factcheck.org")
        time.sleep(2)

        nav_link = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'a.nav-link[title="Search"]'))
        )
        nav_link.click()
        time.sleep(3)

        search_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'input.gsc-input'))
        )
        search_input.send_keys(topic)
        search_input.send_keys(Keys.RETURN)
        time.sleep(3)

        first_article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '.gsc-webResult .gs-title a'))
        )
        first_article_url = first_article.get_attribute('href')

        driver.get(first_article_url)
        time.sleep(3)

        page_content =  driver.page_source

        soup = BeautifulSoup(page_content, 'html.parser')
        for tag in soup(["script", "style", "header", "footer", "nav", "aside", "form", "meta"]):
            tag.extract()

        
        text = soup.get_text(separator="\n").strip()
        text = re.sub(r'\s+', ' ', text)

        return text

    except Exception as e:
        print(f"Error searching and scraping FactCheck.org: {e}")
        return None

    finally:
        if driver:
            driver.quit()