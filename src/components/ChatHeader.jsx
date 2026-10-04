import { APP_NAME } from '../config.js';

export default function ChatHeader({ theme, onToggleTheme, onNewChat, onClear, canClear }) {
  return (
    <header className="header">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">✦</span>
        <div className="brand-text">
          <h1>{APP_NAME}</h1>
          <p>AI Assistant</p>
        </div>
      </div>
      <div className="header-actions">
        <button className="btn ghost" onClick={onClear} disabled={!canClear} title="Clear conversation">
          Clear
        </button>
        <button className="btn primary" onClick={onNewChat}>
          New Chat
        </button>
        <button
          className="btn icon"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          title="Toggle theme"
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>
    </header>
  );
}
