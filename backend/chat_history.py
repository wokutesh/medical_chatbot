from supabase_client import supabase

def save_chat(user_id, session_id, role, content):
    """
    Saves a single message. 
    role: 'user' or 'model'
    content: the text message
    """
    return supabase.table("chats").insert({
        "user_id": user_id,
        "session_id": session_id,
        "role": role,
        "content": content
    }).execute()


def get_chat_history(session_id):
    response = supabase.table("chats") \
        .select("role, content") \
        .eq("session_id", session_id) \
        .order("created_at", desc=False) \
        .execute()

    return response.data

from supabase_client import supabase

def delete_chat_session(session_id):
    try:
        response = supabase.table("chats") \
            .delete() \
            .eq("session_id", session_id) \
            .execute()

        return response

    except Exception as e:
        print("DELETE ERROR:", e)
        return None