import React, { useState } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [question, setQuestion] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (question.trim()) {
        onSend(question);
        setQuestion("");
      }
    }
  };

  const handleClick = () => {
    if (question.trim()) {
      onSend(question);
      setQuestion("");
    }
  };

  return (
    <div className="p-4 border-t bg-white">
      <textarea
        rows={2}
        className="w-full p-2 border rounded resize-none focus:outline-none focus:ring"
        placeholder="Type your question…"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <button
        onClick={handleClick}
        disabled={disabled || !question.trim()}
        className="mt-2 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {disabled ? "Asking…" : "Ask"}
      </button>
    </div>
  );
}
