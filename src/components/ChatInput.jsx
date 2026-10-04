import { useEffect, useRef, useState } from 'react';

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('');
  const [hint, setHint] = useState('');
  const ref = useRef(null);

  // Auto-grow the textarea up to a max height
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  }, [value]);

  // Return focus after a reply arrives
  useEffect(() => {
    if (!disabled) ref.current?.focus();
  }, [disabled]);

  function submit() {
    if (disabled) return;
    const text = value.trim();
    if (!text) {
      setHint('Type a message first.');
      return;
    }
    setHint('');
    setValue('');
    onSend(text);
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className="input-wrap">
      <div className="input-card">
        <textarea
          ref={ref}
          rows={1}
          value={value}
          placeholder="Ask E-D-U-G-E-N-I-E anything…"
          onChange={(e) => {
            setValue(e.target.value);
            if (hint) setHint('');
          }}
          onKeyDown={onKeyDown}
          aria-label="Message"
        />
        <button className="send" onClick={submit} disabled={disabled} aria-label="Send message">
          ➤
        </button>
      </div>
      <p className="input-note">{hint || 'Enter to send · Shift + Enter for a new line'}</p>
    </div>
  );
}
