# Project Overview

This project is designed to provide a conversational interface that leverages ALLaM to allow users to explore and understand traditional Arabic poetry called "Al-`Arḍah" (العرضة). 


# Key Features

1. **Poetry Search and Explanation**: Users can search for specific poems or ask questions about Al-`Arḍah, and the application will provide relevant results along with explanations and meanings.
2. **Conversational Interface**: The application offers a chat-like interface for users to interact with the system, making it easy to ask questions and receive answers in a conversational manner.


# Technologies Used



1. **Allam Model by Sdaia**: The application utilizes the Allam model by Sdaia for advanced natural language processing capabilities, specifically tailored for Arabic language.
2. **FastAPI**: The application is built using FastAPI, a modern, fast (high-performance), web framework for building APIs with Python 3.7+ based on standard Python type hints.
3. **Qdrant**: Qdrant is used for vector search and indexing of poetry documents, enabling efficient and accurate search capabilities.
4. **Meilisearch**: Meilisearch is employed for full-text search and filtering of poetry documents, providing a robust search functionality.
5. **Sentence Transformers**: Sentence Transformers are used for generating embeddings of poetry texts, facilitating semantic search and analysis.
6. **Transformers**: The application leverages pre-trained transformer models for sequence classification and generation tasks, such as reranking.
7. **IBM Watson**: IBM Watson's AI foundation models are utilized for generating human-like text explanations and insights about the poetry.

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

Once both the backend and frontend are running, you can interact with the application by visiting `http://localhost:3000` in your web browser.



# License

This project is licensed under the Apache License 2.0.
