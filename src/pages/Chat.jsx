import { useEffect, useRef, useState } from 'react';
import ChatHeader from '../components/ChatHeader.jsx';
import ChatMessage from '../components/ChatMessage.jsx';
import ChatInput from '../components/ChatInput.jsx';
import TypingIndicator from '../components/TypingIndicator.jsx';
import { sendToGemini } from '../services/gemini.js';
import { WELCOME_MESSAGE } from '../config.js';

let nextId = 1;

export default function Chat({ theme, onToggleTheme }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const sessionRef = useRef(0); // lets us ignore replies that arrive after New Chat

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, loading]);

  async function handleSend(text) {
    const userMsg = { id: nextId++, role: 'user', text };
    const history = [...messages.filter((m) => !m.error), userMsg];
    const session = sessionRef.current;

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const reply = await sendToGemini(history);
      if (session !== sessionRef.current) return;
      setMessages((prev) => [...prev, { id: nextId++, role: 'model', text: reply }]);
    } catch (err) {
      if (session !== sessionRef.current) return;
      setMessages((prev) => [
        ...prev,
        { id: nextId++, role: 'model', text: err.message, error: true },
      ]);
    } finally {
      if (session === sessionRef.current) setLoading(false);
    }
  }

  function reset() {
    sessionRef.current += 1;
    setMessages([]);
    setLoading(false);
  }

  return (
    <div className="app">
      <ChatHeader
        theme={theme}
        onToggleTheme={onToggleTheme}
        onNewChat={reset}
        onClear={reset}
        canClear={messages.length > 0}
      />
      <main className="chat-scroll">
        <div className="chat-column" role="log" aria-live="polite">
          <ChatMessage message={{ role: 'model', text: WELCOME_MESSAGE }} />
          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} />
          ))}
          {loading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </main>
      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
