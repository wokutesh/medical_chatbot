# 🚀 Medical AI Assistant — FastAPI + React + RAG + Gemini + ChromaDB

A full‑stack **Medical AI Assistant** built with **FastAPI**, **React**, **Retrieval‑Augmented Generation (RAG)**, **Google Gemini LLM**, and **ChromaDB**.

This application allows users to ask **medical-related questions** and receive **accurate, knowledge‑grounded responses** using a custom knowledge base.

---

# ✨ Features

* 🤖 Google Gemini LLM Integration
* 🔎 Retrieval‑Augmented Generation (RAG)
* 📚 ChromaDB Vector Database
* ⚡ FastAPI Backend
* 🎨 React Frontend
* 💬 Chat UI Interface
* 🔐 Authentication (Login & Register)
* 🧠 Medical Knowledge Base
* 🗂 Chat History Support
* 🚀 Scalable Architecture

---

# 🧠 How It Works (RAG Flow)

1. User asks a question from React UI
2. FastAPI receives the query
3. Query converted into embeddings
4. ChromaDB retrieves relevant medical documents
5. Context sent to Gemini LLM
6. Gemini generates grounded response
7. Response returned to UI

```
User → React → FastAPI → Retriever → ChromaDB → Gemini → Response → UI
```

---

# 🏗️ Project Structure

```
root/
│
├── backend/
│   │
│   ├── chromadb/
│   ├── data/
│   │
│   ├── main.py
│   ├── chatbot.py
│   ├── chat_history.py
│   ├── retriever.py
│   ├── vector.py
│   ├── supabase_client.py
│   │
│   └── requirements.txt
│
├── medical-ui/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatUi.jsx
│   │   │   └── ChatLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Home.jsx
│   │   │
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# 🛠️ Tech Stack

## Backend

* FastAPI
* Python
* Groq LLM
* ChromaDB
* Supabase (Chat History / Auth)
* Uvicorn

## Frontend

* React
* Axios
* CSS / Tailwind (optional)

## AI / RAG

* Retrieval‑Augmented Generation
* Embeddings
* Vector Search

---

# ⚙️ Backend Setup

## 1️⃣ Navigate to Backend

```bash
cd backend
```

## 2️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

## 3️⃣ Environment Variables

Create `.env` file:

```
Groq=your_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

---

# ▶️ Run Backend

```bash
uvicorn main:app --reload
```

Backend runs on:

```
http://localhost:8000
```

---

# 🎨 Frontend Setup

## 1️⃣ Navigate to UI

```bash
cd medical-ui
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Run App

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔌 API Endpoints

## Chat Endpoint

```
POST /chat
```

### Request

```json
{
  "message": "What are symptoms of malaria?"
}
```

### Response

```json
{
  "response": "Malaria symptoms include..."
}
```

---

# 📚 Backend Modules

### main.py

* FastAPI entry point
* API routes

### chatbot.py

* Gemini LLM integration
* Response generation

### retriever.py

* RAG retrieval logic

### vector.py

* Embeddings and vector handling

### chat_history.py

* Chat storage and retrieval

### supabase_client.py

* Supabase connection




