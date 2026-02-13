"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { formatRoleLabel, isDraftSendable } from "../../../lib/ui/chat";

type ChatMessage = {
  _id: string;
  role: string;
  content: string;
};

export default function ChatPageClient() {
  const conversationId = "demo-convo";
  const userId = "demo-user";
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const messages = useQuery(api.functions.messages.getMessages, {
    conversationId,
  });
  const sendMessage = useMutation(api.functions.messages.sendMessage);

  async function onSend() {
    if (!isDraftSendable(text, isSending)) return;
    const trimmed = text.trim();
    setText("");
    setIsSending(true);
    try {
      await sendMessage({ conversationId, userId, content: trimmed });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="shell">
      <aside className="side">
        <h1>Philosopher Agent</h1>
        <p>
          Conversational practice in Adlerian ethics.
          <br />
          This tool is not medical advice.
        </p>
        <nav>
          <a href="/app/chat">Chat</a>
          <a href="/app/settings">Settings</a>
          <a href="/login">Login</a>
        </nav>
      </aside>

      <main className="chat-main">
        <header className="chat-head">
          <h2>Adlerian Dialogue</h2>
          <p>Ask one question at a time for clearer, grounded responses.</p>
        </header>

        <section className="messages">
          {messages?.length ? null : (
            <div className="empty-note">
              Start with a challenge you are facing. The assistant will respond
              in an Adlerian voice.
            </div>
          )}
          {messages?.map((m: ChatMessage) => (
            <article
              key={m._id}
              className={`bubble ${
                m.role === "user" ? "bubble-user" : "bubble-assistant"
              }`}
            >
              <div className="bubble-label">{formatRoleLabel(m.role)}</div>
              <div>{m.content}</div>
            </article>
          ))}
        </section>

        <form
          className="composer"
          onSubmit={(event) => {
            event.preventDefault();
            void onSend();
          }}
        >
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit" disabled={!isDraftSendable(text, isSending)}>
            {isSending ? "Sending..." : "Send"}
          </button>
        </form>
      </main>
    </div>
  );
}
