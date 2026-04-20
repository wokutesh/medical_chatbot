import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/chat");

    } catch (err) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-white">

      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-1 relative">
      <img
        src="/health.jpg"
        alt="MedAI"
        className="w-full h-full object-cover"
      />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center p-6">

        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border">

          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Welcome Back
          </h2>

          <p className="text-sm text-gray-500 text-center mt-1 mb-6">
            Sign in to continue your medical assistant
          </p>

          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="email"
              placeholder="wokuma@gmail.com"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="12345"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {loading ? "Signing in..." : "Login"}
            </button>

          </form>

          <p className="text-sm text-center mt-5 text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 font-medium">
              Create account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}