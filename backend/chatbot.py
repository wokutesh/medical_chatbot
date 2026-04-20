import os
from dotenv import load_dotenv
from google import genai
from retriever import retrieve_context
from chat_history import get_chat_history, save_chat
load_dotenv()

client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))


def generate_response(user_id, session_id, message):

    save_chat(user_id, session_id, "user", message)

    history = get_chat_history(session_id)[-8:]

    conversation = ""
    for msg in history:
        role = "User" if msg["role"] == "user" else "Assistant"
        conversation += f"{role}: {msg['content']}\n"

    context = retrieve_context(message)

    prompt = f"""
You are a helpful and safe Ethiopian medical assistant.

Your task:
- Understand user symptoms using medical context (RAG)
- Use conversation history for continuity
- Keep conversation natural and not repetitive
- Respond ONLY in Amharic language

CRITICAL CONVERSATION RULES:

1. Do NOT ask many follow-up questions.
2. Ask ONLY clarifying questions per session.
3. If enough symptom information is already available, DO NOT ask more questions.
4. Avoid repeating or rephrasing previous questions.
5. Keep questions very short and only for essential diagnosis.

6. Do NOT give treatment advice unless the user explicitly asks for advice or suggestion.
7. If the user asks for advice → provide safe, simple medical guidance.
8. If symptoms are serious → gently recommend visiting a hospital.

9. Keep responses short, natural, and conversational (not long explanations).

Conversation History:
{conversation}

Medical Context (RAG):
{context}

User Message:
{message}

RESPONSE FORMAT:

- If advice NOT requested:
  → brief understanding + OPTIONAL single core question (only if necessary)

- If advice requested:
  → simple explanation + safe recommendation + optional warning

Respond in Amharic:
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config={"temperature": 0.3}
    )

    answer = response.text

    save_chat(user_id, session_id, "model", answer)

    return answer