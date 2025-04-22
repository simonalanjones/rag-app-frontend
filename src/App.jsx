import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function App() {
  //const [messages, setMessages] = useState([]);

  const [messages, setMessages] = useState([
    {
      role: "ai",
      content:
        "Welcome to Ask Villapedia. Ask me anything about your knowledge base, like _what's in the welcome pack?_ or _What restaurants are there in Kissimmee?_",
    },
  ]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

  // Auto‑scroll on new message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const askQuestion = async () => {
    if (!question.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);
    setQuestion("");

    try {
      const res = await fetch(`${API_BASE}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const { answer } = await res.json();
      setMessages((prev) => [...prev, { role: "ai", content: answer }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "❌ Error contacting API" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Centered container */}
      <div className="flex-1 flex justify-center items-center overflow-scroll">
        <div className="flex flex-col w-full max-w-2xl h-full shadow-lg bg-white">
          {/* Chat Window */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xl  rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900 border"
                  }`}
                >
                  {msg.role === "ai" ? (
                    <div className="prose prose-md max-w-xl px-4 py-2 rounded-lg bg-gray-100 text-gray-900">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div className="max-w-xl px-4 py-2 rounded-lg bg-blue-600 text-white">
                      {msg.content}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="max-w-xl px-4 py-2 rounded-lg bg-gray-100 text-gray-500 italic border">
                  Thinking…
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>

          {/* Input Box */}
          <div className="p-4 border-t bg-white">
            <textarea
              rows={2}
              className="w-full p-2 border rounded resize-none focus:outline-none focus:ring"
              placeholder="Type your question…"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              onClick={askQuestion}
              disabled={loading || !question.trim()}
              className="mt-2 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Asking…" : "Ask"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
