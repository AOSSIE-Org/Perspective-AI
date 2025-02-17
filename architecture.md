# AI Debate System Architecture

## Overview

The AI Debate System is designed to analyze an article based on a user-provided URL, extract relevant facts, and engage in an AI-driven debate on the topic. It utilizes web scraping, vector databases, embeddings, and an LLM for generating counterarguments.

## Architecture

1. **User Input:** User submits an article URL.
2. **Web Scraping:** Scraper extracts text content from the article.
3. **Understanding Input:** After extracting the input article, pass it to the LLM to understand its content. The LLM generates relevant titles or keywords for further fact collection.
4. **Web Scraping for Facts:** The scraper searches the titles or keywords given by the LLM and gathers additional information.
5. **Text Processing:** The content is split into smaller chunks.
6. **Embeddings Generation:** Each chunk is converted into a vector representation.
7. **Vector Storage:** The embeddings are stored in AstraDB.
8. **Debate Preparation:**
   - The system searches the vector database for relevant facts.
   - LLM processes these facts and generates counterarguments.
9. **AI Debate:**
   - The AI presents counterarguments.
   - The user can interact and challenge responses.

## API Routes

### **User Input**

- **POST `/process-url`** - Accepts a JSON body with a URL, processes the article, and prepares the debate.

### **Scraping & Fact Gathering**

- **POST `/scrape-article`** - Scrapes the given URL for text content pass it to an llm and generates titles.
- **POST `/scrape-facts`** - Scrapes the web for additional facts based on generated titles and do all stuff of converting into vector embeddings and so on .

### **Debate Execution**

- **POST `/chatroom/`** - Initiates the AI debate using the gathered facts.

## Future Enhancements

- **Multi-Input Support:** Users can input images, videos, etc.
- **Multi-Language Support:** Expand to multiple languages.
- **Improved Fact Verification:** Use more sources for validation.
- **Customizable AI Personalities:** Allow users to choose AI debate styles.
