import os
from dotenv import load_dotenv
from groq import Groq
from retriever import retrieve_context
from chat_history import get_chat_history, save_chat

load_dotenv()

client = Groq(api_key=os.getenv("Groq")) 


def generate_response(user_id, session_id, message):

   
    save_chat(user_id, session_id, "user", message)

   
    history = get_chat_history(session_id)[-8:]

    
    messages = [
    {
        "role": "system",
        "content": """
You are a friendly Ethiopian doctor assistant chatting in natural spoken Amharic.

🚨 VERY IMPORTANT STYLE RULES:
- Speak like a real person, not a textbook or translator.
- Use simple everyday Amharic (casual tone).
- NEVER use robotic or formal phrases like:
  ❌ "አስችላለሁ"
  ❌ "ዶክተሩ እንደሚያደርገው"
  ❌ "ሆስፒታል ወደምትሄድ አስችላለሁ"

✔ Instead use natural phrases:
  ✔ "እሺ ተረድቻለሁ"
  ✔ "ይህ ምናልባት ከድካም ሊሆን ይችላል"
  ✔ "ምን ያህል ጊዜ እየቆየ ነው?"

🚑 MEDICAL RULES:
- Do NOT jump to hospital recommendation immediately
- Only suggest hospital IF symptoms are serious
- Otherwise explain simply first

🧠 RESPONSE STYLE:
- 1 short understanding sentence
- 1 simple explanation
- OPTIONAL: 1 short question (only if needed)

❌ NEVER repeat user's message
❌ NEVER sound like translation engine
❌ NEVER use formal academic Amharic
"""
    }
]

   
    for msg in history:
        messages.append({
            "role": "user" if msg["role"] == "user" else "assistant",
            "content": msg["content"]
        })
   
    context = retrieve_context(message)

    messages.append({
    "role": "user",
    "content": f"""
Context (if relevant):
{context}

User said:
{message}
"""
})

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            temperature=0.3
        )

        answer = response.choices[0].message.content.strip()

        
        if not answer:
            answer = "ይቅርታ፣ መልስ ማግኘት አልቻልኩም። እባክዎ ደግመው ይሞክሩ።"

    except Exception as e:
        print("LLM ERROR:", e)
        answer = "ይቅርታ፣ ችግር ተፈጥሯል። እባክዎ ደግመው ይሞክሩ።"

    # Save bot response
    save_chat(user_id, session_id, "model", answer)

    return answer