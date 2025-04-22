import React, { useState, useRef, useEffect } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Ask me anything like _what's in the welcome pack?_",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // auto‑scroll when messages change or loading toggles
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const askQuestion = async (question) => {
    if (!question.trim()) return;
    setMessages((msgs) => [...msgs, { role: "user", content: question }]);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const { answer } = await res.json();
      setMessages((msgs) => [...msgs, { role: "ai", content: answer }]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { role: "ai", content: "❌ Error contacting API" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 flex justify-center items-center overflow-scroll">
        <div className="flex flex-col w-full max-w-2xl h-full shadow-lg bg-white">
          <ChatWindow
            messages={messages}
            loading={loading}
            scrollRef={scrollRef}
          />
          <ChatInput onSend={askQuestion} disabled={loading} />
        </div>
      </div>
    </div>
  );
}
