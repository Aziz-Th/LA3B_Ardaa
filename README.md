

# Project Overview

This project is designed to provide a conversational interface that leverages ALLaM to allow users to explore and understand traditional Arabic poetry called "Al-`Arḍah" (العرضة). 


# Key Features

1. **Poetry Search and Explanation**: Users can search for specific poems or ask questions about Al-`Arḍah, and the application will provide relevant results along with explanations and meanings.
2. **Conversational Interface**: The application offers a chat-like interface for users to interact with the system, making it easy to ask questions and receive answers in a conversational manner.



# How it works

**1. Getting Ready**
The program starts by setting up everything it needs: it loads important details (like passwords and access keys) from a safe place so they aren’t visible in the code.
It gets ready by loading tools for handling user requests, performing searches, and understanding questions.


**2. Setting Up the “Thinkers” and “Searchers”**
The app uses a language model to help answer questions, along with two search engines:
Qdrant helps find related pieces of text based on the meaning of the user’s question (like finding similar ideas).
MeiliSearch does a traditional search by looking for specific words in the text.
The two search engines work together to cover both general ideas and exact matches.


**3. Making Search Results Better**
The program has a “relevance checker” that looks at search results and ranks them by how closely they match the question.
It selects the best match from these results, or gives a general answer if nothing relevant is found.


**4. Answering the User**
When a user asks a question, the program:
Creates an answer by pulling together text from the best match.
Adjusts the answer by sending it through the language model for a more natural response.
This answer is then sent back to the user as a reply.


**5. Connecting with Users**
A web interface (webpage) lets users ask questions, which are sent to the backend.
The backend replies back with answers, and this exchange continues, improving with each question.


# Technologies Used



1. **Allam Model by Sdaia**: The application utilizes the Allam model by Sdaia for advanced natural language processing capabilities, specifically tailored for Arabic language.
2. **FastAPI**: The application is built using FastAPI, a modern, fast (high-performance), web framework for building APIs with Python 3.7+ based on standard Python type hints.
3. **Qdrant**: Qdrant is used for vector search and indexing of poetry documents, enabling efficient and accurate search capabilities.
4. **Meilisearch**: Meilisearch is employed for full-text search and filtering of poetry documents, providing a robust search functionality.
5. **Sentence Transformers**: Sentence Transformers are used for generating embeddings of poetry texts, facilitating semantic search and analysis.
6. **Transformers**: The application leverages pre-trained transformer models for sequence classification and generation tasks, such as reranking.
7. **IBM Watson**: IBM Watson's AI foundation models are utilized for generating human-like text explanations and insights about the poetry.
8. **Semantic Search**: The application incorporates semantic search capabilities, allowing users to search for poems based on their meaning and context, rather than just keywords. This is achieved through the use of advanced NLP techniques and vector embeddings.

# How to Use

To run the application, follow these steps:

1. **Run the backend**: Execute the following command in your terminal to start the backend server:
   ```
   python app.py
   ```
   This will start the FastAPI server on `http://localhost:8000`.

2. **Start the frontend**: Navigate to the frontend directory and run the following command to start the React application:
   ```
   npm start
   ```
   This will start the React application on `http://localhost:3000`.



 **You need to have**: in order to be able to run the repo you need these key:

3. **Environment Variables**: The application requires the following environment variables to be set in a .env file in the root directory:
   - `IBM_CLOUD_URL`: The URL for the IBM Cloud service.
   - `IBM_CLOUD_APIKEY`: The API key for the IBM Cloud service.
   - `MEILI_URL`: The URL for the Meilisearch service.
   - `MEILI_API_KEY`: The API key for the Meilisearch service.
   - `QDRANT_URL`: The URL for the Qdrant service.
   - `QDRANT_API_KEY`: The API key for the Qdrant service.
   - `REACT_APP_API_URL`: The URL for the backend API.

  



Once both the backend and frontend are running, you can interact with the application by visiting `http://localhost:3000` in your web browser.



# License

This project is licensed under the Apache License 2.0.
