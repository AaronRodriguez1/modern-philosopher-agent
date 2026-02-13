"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function ChatPageClient() {
  const conversationId = "demo-convo";
  const userId = "demo-user";
  const [text, setText] = useState("");

  const messages = useQuery(api.functions.messages.getMessages, {
    conversationId,
  });
  const sendMessage = useMutation(api.functions.messages.sendMessage);

  async function onSend() {
    const trimmed = text.trim();
    if (!trimmed) return;
    setText("");
    await sendMessage({ conversationId, userId, content: trimmed });
  }

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Philosopher Agent</h1>
      <p>Demo chat page wired to Convex.</p>

      <div style={{ border: "1px solid #ddd", padding: 12, minHeight: 160 }}>
        {messages?.map((m) => (
          <div key={m._id} style={{ marginBottom: 8 }}>
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask a question..."
          style={{ width: "70%", marginRight: 8 }}
        />
        <button onClick={onSend}>Send</button>
      </div>
    </main>
  );
}
