from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from supabase_client import supabase
from chatbot import generate_response
from auth import register_user, login_user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



class ChatRequest(BaseModel):
    message: str
    user_id: str
    session_id: str


class RegisterRequest(BaseModel):
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str




@app.post("/register")
def register(request: RegisterRequest):

    register_user(request.email, request.password)

    return {"message": "User registered successfully"}


# ----------------------------
# Login
# ----------------------------

@app.post("/login")
def login(request: LoginRequest):

    user = login_user(request.email, request.password)

    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "user": user
    }


@app.post("/chat")
def chat(request: ChatRequest):

    try:
        response = generate_response(
            request.user_id,
            request.session_id,
            request.message
        )

        return {"response": response}

    except Exception as e:
        print("Chat error:", e)
        raise HTTPException(
            status_code=500,
            detail="Chat service temporarily unavailable"
        )
@app.get("/history/{session_id}")
def get_history(session_id: str):
    try:
        response = supabase.table("chats") \
            .select("role, content, created_at") \
            .eq("session_id", session_id) \
            .order("created_at", desc=False) \
            .execute()

        data = response.data

        if not data:
            return []

        history = []

        for item in data:
            history.append({
                "role": item.get("role", "user"),
                "content": item.get("content", ""),
                "created_at": item.get("created_at", "")
            })

        return history

    except Exception as e:
        print("HISTORY ERROR:", e)
        return []
    
@app.get("/sessions/{user_id}")
def get_sessions(user_id: str):
    try:
        response = supabase.table("chats") \
            .select("session_id, content, created_at, role") \
            .eq("user_id", user_id) \
            .order("created_at", desc=False) \
            .execute()

        data = response.data or []

        sessions = {}

        for item in data:
            sid = item.get("session_id")
            content = item.get("content", "")

            if not sid:
                continue

            if sid not in sessions:
                sessions[sid] = [
                    {
                        "text": content,
                        "role": item.get("role", "user"),
                        "time": item.get("created_at", "")
                    }
                ]

        return sessions

    except Exception as e:
        print("SESSION ERROR:", e)
        return {}