import { useState, useEffect } from "react";
import axios from "axios";
import ChatUI from "./ChatUI";

export default function ChatLayout() {
  const [sessions, setSessions] = useState({});
  const [activeSession, setActiveSession] = useState(null);

  // 1. Initial Setup
  useEffect(() => {
  const fetchSessions = async () => {
    const rawUser = localStorage.getItem("user");
    if (!rawUser) return;

    const user = JSON.parse(rawUser);
    const userId = user.id || user.user?.id;

    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/sessions/${userId}`
      );

      const sessionsData = res.data;

      setSessions(sessionsData);

      // Auto select first session
      const firstSessionId = Object.keys(sessionsData)[0];
      if (firstSessionId) {
        setActiveSession(firstSessionId);
      }
    } catch (error) {
      console.error("Failed to load sessions:", error);
    }
  };

  fetchSessions();
}, []);
  // 2. Function to update messages
  const updateHistory = (sessionId, newMessages) => {
    setSessions(prev => ({
      ...prev,
      [sessionId]: newMessages
    }));
  };

  const newChat = () => {
    const id = Date.now().toString();
    setSessions(prev => ({ ...prev, [id]: [] }));
    setActiveSession(id);
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-1/4 bg-gray-900 text-white p-3 flex flex-col">
        <button onClick={newChat} className="bg-blue-600 py-2 rounded mb-4 font-bold">
          + New Chat
        </button>
        <div className="flex-1 overflow-y-auto">
        {Object.entries(sessions).map(([id, messages]) => (
          <div
            key={id}
            onClick={() => setActiveSession(id)}
            className={`p-3 rounded cursor-pointer mb-2 ${
              activeSession === id
                ? "bg-gray-700 border-l-4 border-blue-500"
                : "bg-gray-800"
            }`}
          >
            {messages[0]?.text?.slice(0, 30) || "New Chat"}
          </div>
        ))}
      </div>
      </div>

     <div className="w-3/4">
        {activeSession && sessions[activeSession] ? (
          <ChatUI
            key={activeSession}
            sessionId={activeSession}
            history={sessions[activeSession]}
            setHistory={(newList) =>
              updateHistory(activeSession, newList)
            }
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            አባክዎ ውይይት ይምረጡ...
          </div>
        )}
      </div>
    </div>
  );
}