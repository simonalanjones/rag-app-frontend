import React from "react";
import MessageBubble from "./MessageBubble";

export default function MessageList({ messages }) {
  return (
    <>
      {messages.map((msg, i) => (
        <MessageBubble key={i} role={msg.role} content={msg.content} />
      ))}
    </>
  );
}
