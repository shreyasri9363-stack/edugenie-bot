import { useEffect, useState } from 'react';
import Chat from './pages/Chat.jsx';

function initialTheme() {
  const saved = localStorage.getItem('edugenie-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function App() {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('edugenie-theme', theme);
  }, [theme]);

  return <Chat theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />;
}
