from supabase_client import supabase
import bcrypt


# ------------------------
# Register User
# ------------------------
def register_user(email, password):

    # Hash password
    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    # Insert into Supabase
    response = supabase.table("users").insert({
        "email": email,
        "password": hashed_password
    }).execute()

    return response


# ------------------------
# Login User
# ------------------------
def login_user(email, password):

    # Get user
    response = supabase.table("users") \
        .select("*") \
        .eq("email", email) \
        .execute()

    if not response.data:
        return None

    user = response.data[0]

    # Check password
    if bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"].encode("utf-8")
    ):
        return user

    return None