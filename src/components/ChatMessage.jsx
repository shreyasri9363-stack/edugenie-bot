import ReactMarkdown from 'react-markdown';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="row user">
        <div className="bubble user-bubble">{message.text}</div>
      </div>
    );
  }

  return (
    <div className="row ai">
      <div className="avatar" aria-hidden="true">✦</div>
      <div className={`ai-body${message.error ? ' error' : ''}`}>
        {message.error ? <p>{message.text}</p> : <ReactMarkdown>{message.text}</ReactMarkdown>}
      </div>
    </div>
  );
}
