import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function ChatUI({
  sessionId,
  history = [],
  setHistory = () => {}
}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!sessionId) return;

      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/history/${sessionId}`
        );

        setHistory(
          res.data.map((msg) => ({
            role: msg.role === "model" ? "bot" : "user",
            text: msg.content,
            time: ""
          }))
        );
      } catch (error) {
        console.error("History load error:", error);
      }
    };

    fetchHistory();
  }, [sessionId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // 🧠 COPY MESSAGE
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  // ✏️ EDIT MESSAGE
  const handleEdit = (index) => {
    setMessage(history[index].text);
    setEditIndex(index);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const rawUser = localStorage.getItem("user");
    if (!rawUser) return;

    const userData = JSON.parse(rawUser);
    const userId = userData.id || userData.user?.id;

    const userMsg = {
      role: "user",
      text: message,
      time: new Date().toLocaleTimeString()
    };

    let updatedHistory = [...history];

    // ✏️ EDIT MODE
    if (editIndex !== null) {
      updatedHistory[editIndex] = userMsg;
      setEditIndex(null);
    } else {
      updatedHistory.push(userMsg);
    }

    setHistory(updatedHistory);
    setMessage("");
    setLoading(true);

    try {
      const payload = {
        message,
        user_id: String(userId),
        session_id: String(sessionId)
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        payload
      );

      const botMsg = {
        role: "bot",
        text: response.data.response,
        time: new Date().toLocaleTimeString()
      };

      setHistory([...updatedHistory, botMsg]);
    } catch (error) {
      console.error("Chat error:", error);

      const botMsg = {
        role: "bot",
        text: "ይቅርታ፣ ችግር ተፈጥሯል። እባክዎ ደግመው ይሞክሩ።",
        time: new Date().toLocaleTimeString()
      };

      setHistory([...updatedHistory, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="bg-blue-600 text-white p-4 font-bold">
        🩺 የጤና ረዳት
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {history.map((msg, index) => (
  <div
    key={index}
    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} group`}
  >
    <div className="relative max-w-xs md:max-w-md">

      {/* MESSAGE */}
      <div
        className={`p-3 rounded-2xl text-sm break-words ${
          msg.role === "user"
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-100 text-gray-800 rounded-bl-none"
        }`}
      >
        {msg.text}
      </div>

      {/* ACTIONS (ChatGPT style floating bar) */}
      <div
        className="absolute -bottom-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ pointerEvents: "auto" }}
      >

        {/* COPY */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(msg.text);
          }}
          className="text-xs px-2 py-1 rounded bg-white shadow hover:bg-gray-100"
          title="Copy"
        >
          📋
        </button>

        {/* EDIT (ONLY USER MESSAGE) */}
        {msg.role === "user" && (
          <button
            onClick={() => {
              setMessage(msg.text);
              setEditIndex(index);
            }}
            className="text-xs px-2 py-1 rounded bg-white shadow hover:bg-gray-100"
            title="Edit"
          >
            ✏️
          </button>
        )}
      </div>
    </div>
  </div>
))}
        <div ref={chatEndRef} />
      </div>

      {/* INPUT AREA */}
      <div className="p-4 border-t flex gap-2">
        <input
          className="flex-1 border p-2 rounded-full px-4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-6 rounded-full"
        >
          {editIndex !== null ? "Update" : "ላክ"}
        </button>
      </div>
    </div>
  );
}