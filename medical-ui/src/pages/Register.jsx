import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://127.0.0.1:8000/register", {
        email,
        password,
      });

      const loginRes = await axios.post("http://127.0.0.1:8000/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(loginRes.data.user));
      navigate("/chat");

    } catch (err) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-white">

      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-gray-100 overflow-hidden">
  
      <img
        src="/health.jpg"
        alt="MedAI"
        className="max-h-[75vh] w-auto object-contain drop-shadow-xl"
      />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center p-6">

        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border">

          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Create Account
          </h2>

          <p className="text-sm text-gray-500 text-center mt-1 mb-6">
            Join MedAI Assistant today
          </p>

          <form onSubmit={handleRegister} className="space-y-4">

            <input
              type="email"
              placeholder="wokuma@gmail.com"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="12345"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              disabled={loading}
              className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              {loading ? "Creating account..." : "Get Started"}
            </button>

          </form>

          <p className="text-sm text-center mt-5 text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 font-medium">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}