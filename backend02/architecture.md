## Overview

The AI Debate System is designed to analyze an article based on a user-provided URL, extract relevant facts, and engage in an AI-driven debate on the topic. It utilizes web scraping, vector databases, embeddings, and an LLM for generating counterarguments.

## Architecture

1. **User Input:** User submits an article URL.
2. **Web Scraping:** Scraper extracts text content from the article.
3. **UnderStanding input** After extracting the input article pass it to the llm the understand about the article and it will give us the proper titles to search regarding it on the web for fact collecting.
4. **web scrapping:** Now the scrapper will search the titles or keywords given by the llm and geather information about it.
5. **Text Processing:** The content is split into smaller chunks.
6. **Embeddings Generation:** Each chunk is converted into a vector representation.
7. **Vector Storage:** The embeddings are stored in AstraDB.
8. **Debate Preparation:**
   - The system searches the vector database for relevant facts.
   - LLM processes these facts and generates counterarguments.
9. **AI Debate:**
   - The AI presents counterarguments.
   - The user can interact and challenge responses.

## Future Enhancements

- **Mutli-inputsupport:** User can input images , videos etc.
- **Multi-Language Support:** Expand to multiple languages
- **Improved Fact Verification:** Use more sources for validation
- **Customizable AI Personalities:** Allow users to choose AI debate styles
