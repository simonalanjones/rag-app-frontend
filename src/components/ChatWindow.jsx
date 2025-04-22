import React from "react";
import MessageList from "./MessageList";

export default function ChatWindow({ messages, loading, scrollRef }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <MessageList messages={messages} />
      {loading && (
        <div className="flex justify-start">
          <div className="max-w-xl px-4 py-2 rounded-lg bg-gray-100 text-gray-500 italic border">
            Thinking…
          </div>
        </div>
      )}
      <div ref={scrollRef} />
    </div>
  );
}
