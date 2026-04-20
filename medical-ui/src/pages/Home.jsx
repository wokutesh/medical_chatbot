import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">

      {/* NAV */}
      <div className="flex justify-between items-center p-6">
        <h1 className="text-xl font-bold text-blue-700">🩺 MedAI Assistant</h1>

        <div className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600">Login</Link>
          <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-full">
            Get Started
          </Link>
        </div>
      </div>

      {/* HERO */}
      <div className="flex flex-col items-center justify-center flex-1 text-center px-6">

        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 max-w-2xl">
          AI-Powered Medical Assistant for Symptom Checking
        </h2>

        <p className="mt-4 text-gray-600 max-w-xl">
          Get instant, safe, and AI-assisted medical guidance in Amharic using advanced RAG-based healthcare intelligence.
        </p>

        <div className="mt-6 space-x-4">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold"
          >
            Start Chatting
          </Link>

          <Link
            to="/chat"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full font-semibold"
          >
            Try Demo
          </Link>
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6 px-10 py-10 bg-white">

        <div className="p-6 rounded-xl shadow border">
          <h3 className="font-bold text-blue-600">🧠 Smart Diagnosis</h3>
          <p className="text-gray-600 mt-2">
            AI analyzes symptoms and suggests possible conditions.
          </p>
        </div>

        <div className="p-6 rounded-xl shadow border">
          <h3 className="font-bold text-blue-600">📚 RAG Medical Knowledge</h3>
          <p className="text-gray-600 mt-2">
            Uses verified medical context for accurate responses.
          </p>
        </div>

        <div className="p-6 rounded-xl shadow border">
          <h3 className="font-bold text-blue-600">🇪🇹 Amharic Support</h3>
          <p className="text-gray-600 mt-2">
            Natural conversation in Amharic language.
          </p>
        </div>

      </div>

      {/* WARNING FOOTER */}
      <div className="text-center text-xs text-gray-500 p-4">
        ⚠️ This system is for informational purposes only and not a replacement for medical professionals.
      </div>

    </div>
  );
}