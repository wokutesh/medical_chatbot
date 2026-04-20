import chromadb
from sentence_transformers import SentenceTransformer
import json

model = SentenceTransformer("all-MiniLM-L6-v2")

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection("medical_chatbot")

data_files = [
    "data/translated.json",
    "data/translated4.json",
    "data/translated5.json"
]

all_data = []

for file in data_files:
    with open(file, "r", encoding="utf-8") as f:
        all_data.extend(json.load(f))

print(f"Total records loaded: {len(all_data)}")


# 🧠 SAFE CONVERTER
def safe(value):
    if value is None:
        return ""
    if isinstance(value, list):
        return ", ".join(map(str, value))
    return str(value)


for i, item in enumerate(all_data):

    symptoms = safe(item.get("symptoms"))
    disease = safe(item.get("disease"))
    cures = safe(item.get("cures"))

    text = symptoms

    embedding = model.encode(text).tolist()

    collection.add(
        ids=[str(i)],
        documents=[text],
        embeddings=[embedding],
        metadatas=[{
            "disease": disease,
            "cures": cures
        }]
    )

print("Vector DB created successfully 🚀")