import os
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from openai import OpenAI
from sklearn.cluster import KMeans
import numpy as np
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class Message(BaseModel):
    text: str

class AnalysisResult(BaseModel):
    text: str
    category: str
    sentiment: str
    urgency: str

@app.post("/analyze", response_model=List[AnalysisResult])
async def analyze_messages(messages: List[Message]):
    results = []
    for message in messages:
        prompt = f"""Analyze the following customer message and provide the category, sentiment, and urgency.

Message: "{message.text}"

Category (complaint, bug, praise, question, feature request):
Sentiment (positive, neutral, negative):
Urgency (high, medium, low):
"""
        response = await client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=50,
        )
        analysis = response.choices[0].message.content.strip().split('\n')
        category = analysis[0].split(': ')[1]
        sentiment = analysis[1].split(': ')[1]
        urgency = analysis[2].split(': ')[1]
        results.append(
            AnalysisResult(
                text=message.text,
                category=category,
                sentiment=sentiment,
                urgency=urgency,
            )
        )
    return results

class ClusterResult(BaseModel):
    themes: List[str]

@app.post("/cluster", response_model=ClusterResult)
async def cluster_messages(messages: List[Message]):
    texts = [msg.text for msg in messages]
    response = await client.embeddings.create(
        input=texts,
        model="text-embedding-3-small"
    )
    embeddings = [item.embedding for item in response.data]
    
    n_clusters = min(len(texts), 3)
    kmeans = KMeans(n_clusters=n_clusters, random_state=0).fit(embeddings)
    
    themes = []
    for i in range(n_clusters):
        cluster_indices = np.where(kmeans.labels_ == i)[0]
        cluster_texts = [texts[j] for j in cluster_indices]
        
        prompt = f"""The following customer messages have been clustered together. What is the main theme of this cluster?

Messages:
- {"\n- ".join(cluster_texts)}

Theme:
"""
        theme_response = await client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=20,
        )
        themes.append(theme_response.choices[0].message.content.strip())
        
    return ClusterResult(themes=themes)

class SummaryResult(BaseModel):
    summary: str

@app.post("/summary", response_model=SummaryResult)
async def get_summary(messages: List[Message]):
    texts = [msg.text for msg in messages]
    prompt = f"""Generate an executive summary based on the following customer messages. Include top issues, sentiment breakdown, and recommendations.

Messages:
- {"\n- ".join(texts)}

Executive Summary:
"""
    response = await client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=200,
    )
    summary = response.choices[0].message.content.strip()
    return SummaryResult(summary=summary)

@app.get("/")
def read_root():
    return {"Hello": "World"}
