from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer
import meilisearch
import pandas as pd
from transformers import AutoModelForSequenceClassification
import os
from dotenv import load_dotenv
from ibm_watsonx_ai.foundation_models import Model


load_dotenv()  # Load environment variables from .env file


def get_credentials():
    return {
        "url": os.getenv("IBM_CLOUD_URL"),  # Fetch URL from environment variable
        "apikey": os.getenv("IBM_CLOUD_APIKEY")  # Fetch API key from environment variable
    }
model_id = "sdaia/allam-1-13b-instruct"
project_id = "c7f6c5ed-b85a-45a0-8983-28d25590308f"

parameters = {
    "decoding_method": "greedy",
    "max_new_tokens": 900,
    "repetition_penalty": 1
}

model = Model(
	model_id = model_id,
	params = parameters,
	credentials = get_credentials(),
	project_id = project_id,
	)
    
# init FastAPI
app = FastAPI()

# init meilisearch
client = meilisearch.Client(
    os.getenv('MEILI_URL'),  # Use environment variable for MeiliSearch URL
    os.getenv('MEILI_API_KEY'),  # Use environment variable for MeiliSearch API key
    timeout=10
)
meili_index = client.index('my_collection_scalar')

# embedding model
embedding_model = SentenceTransformer('nomic-ai/nomic-embed-text-v1',trust_remote_code=True)

# init qdrant
qdrant_client = QdrantClient(
        url=os.getenv("QDRANT_URL"),
        api_key=os.getenv("QDRANT_API_KEY"),
    )

collection_name = "poems"



# Initialize Meilisearch index settings
try:
    print("Updating Meilisearch index settings...")
    meili_index.update_settings({
            'searchableAttributes': ['verse', 'meaning'],
            'filterableAttributes': ['verse', 'meaning'],
            'sortableAttributes': ['verse']
        })
        
        # Fetch all documents from Qdrant and populate Meilisearch
    qdrant_docs = qdrant_client.scroll(
        collection_name="poems",
        limit=100  # adjust as needed
    )[0]  # [0] gets just the points, not the next page token
        
    # Prepare and index documents to Meilisearch
    meili_docs = [
        {
            'id': str(doc.id),
                'verse': doc.payload['verse'],
                'meaning': doc.payload['meaning']
            }
            for doc in qdrant_docs
        ]
        
    meili_index.add_documents(meili_docs)
    print(f"Successfully indexed {len(meili_docs)} documents in Meilisearch")
        
except Exception as e:
    print(f"Error during Meilisearch setup: {e}")

# app = FastAPI()

print("loading reranker model")
reranker_model = AutoModelForSequenceClassification.from_pretrained(
    'jinaai/jina-reranker-v2-base-multilingual',
    torch_dtype="auto",
    trust_remote_code=True,
    # timeout=300  # Increase timeout to 5 minutes
)

# reranker_model.to('cuda') # or 'cpu' if no GPU is available
reranker_model.eval()

print("reranker model loaded")

# Configure CORS for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the message structure
class Message(BaseModel):
    role: str
    content: str

# Define the chat request structure
class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Message]] = []

prompt_input = """<|start_header_id|>system<|end_header_id|>
انت نموذج ذكاء اصطناعي يشرح شعر العرضة باختصار وايجاز. اجب في جملتين او ثلاث فقط. تجنب الاطالة والتفاصيل غير الضرورية.<|eot_id|><|start_header_id|>user<|end_header_id|>
"""


def search(query):
    query_embedding = embedding_model.encode([query])[0]

    # Search Qdrant
    qdrant_results = qdrant_client.search(
        collection_name=collection_name,
        query_vector=query_embedding,
        limit=6
    )

    # Extract verses from Qdrant results
    qdrant_tweets = [{'verse': result.payload['verse'], 'meaning': result.payload['meaning']} for result in qdrant_results]

    # Search Meilisearch
    meilisearch_results = meili_index.search(
        query=query,
    )

    meilisearch_texts = [hit["verse"] for hit in meilisearch_results["hits"]]

    # Combine results
    combined_results = qdrant_tweets + meilisearch_texts

    return combined_results

# main general function
def response_to_user(question):

    # Perform the search and filter valid results
    results = search(question)
    filtered_results = [item for item in results if isinstance(item, dict) and "verse" in item]
    results_df = pd.DataFrame(filtered_results)
    

    # Create sentence pairs and compute scores if there are results; otherwise, use defaults
    sentence_pairs = [[question, doc["verse"]] for doc in results_df.to_dict(orient="records")]
    scores = reranker_model.compute_score(sentence_pairs, max_length=1024)


    # Check if none of the scores are higher than 0.4
    if all(score <= 0.2 for score in scores):
        return """شعر العرضة هو فن أدائي تقليدي من المملكة العربية السعودية، يتميز بإيقاعاته الحماسية وكلماته القوية. يعتبر شعر العرضة جزءاً هاماً من التراث الشعبي السعودي ويعكس تاريخ وثقافة المملكة.

                  يبدو أنه لم يتم توفير بيت شعري من العرضة محدد للشرح. إذا كنت ترغب في شرح بيت شعري معين، يرجى تزويدي بالبيت الشعري وسأقوم بشرحه لك بالتفصيل.

                  فلا تتردد في طرح سؤالك وسأكون سعيداً بمساعدتك"""
    

    results_df["score"] = scores
    results_df_sorted = results_df.sort_values("score", ascending=False)

    best_poem = results_df_sorted.iloc[0]['verse']
    best_poem_meaning = results_df_sorted.iloc[0]['meaning']



    prompt_template = f"""<|start_header_id|>system<|end_header_id|>
    انت خبير في شعر العرضة تقوم بشرح معانيه.
    سيتم تزويدك بالبيت الشعري ومعناه والسؤال عنه , اشرح بتفصيل واذكر معلومات متأكد منها فقط.
    لا تذكر اسم الشاعر.
    أضف بعض المعلومات العامة في البداية عن شعر العرضة.
    <|eot_id|><|start_header_id|>user<|end_header_id|>
    البيت الشعري: {best_poem},  معنى البيت الشعري: {best_poem_meaning},  سؤال المستخدم: {question}.
    <|eot_id|><|start_header_id|>assistant<|end_header_id|>"""


    generated_response = model.generate_text(prompt=prompt_template, guardrails=False)


    return generated_response


# main endpoint
@app.post("/api/chat")
async def chat(request: ChatRequest):

    # extract payload
    question = request.message

    # run main function
    response = response_to_user(question)
    
    # return to client
    return {
        "response": response
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)