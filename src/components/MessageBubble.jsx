import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MessageBubble({ role, content }) {
  const isUser = role === "user";
  const containerClasses = isUser ? "flex justify-end" : "flex justify-start";
  const bubbleClasses = isUser
    ? "max-w-xl px-4 py-2 rounded-lg bg-blue-600 text-white"
    : "prose prose-md max-w-xl px-4 py-2 rounded-lg bg-gray-100 text-gray-900 border";

  return (
    <div className={containerClasses}>
      <div className={bubbleClasses}>
        {isUser ? (
          content
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        )}
      </div>
    </div>
  );
}
