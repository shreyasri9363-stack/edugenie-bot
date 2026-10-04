import {
  GEMINI_API_BASE,
  GEMINI_MODEL,
  SYSTEM_INSTRUCTION,
} from '../config';

export const ERROR_MESSAGES = {
  NO_KEY:
    'Gemini API key is missing. Check your .env file.',
  NETWORK:
    'Network error. Please check your internet connection.',
  RATE_LIMIT:
    'Too many requests. Please wait a moment and try again.',
  API:
    'Gemini API request failed. Please check the API key and model.',
  EMPTY:
    'Gemini returned an empty response.',
};

export class ChatError extends Error {
  constructor(code) {
    super(ERROR_MESSAGES[code] || ERROR_MESSAGES.API);
    this.code = code;
  }
}

export async function sendToGemini(messages) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
    throw new ChatError('NO_KEY');
  }

  const url =
    `${GEMINI_API_BASE}/${GEMINI_MODEL}:generateContent`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: SYSTEM_INSTRUCTION,
            },
          ],
        },

        contents: messages.map((message) => ({
          role: message.role,
          parts: [
            {
              text: message.text,
            },
          ],
        })),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('GEMINI ERROR:', data);
      throw new ChatError(
        res.status === 429 ? 'RATE_LIMIT' : 'API'
      );
    }

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || '')
        .join('')
        .trim();

    if (!text) {
      console.error('EMPTY GEMINI RESPONSE:', data);
      throw new ChatError('EMPTY');
    }

    return text;
  } catch (error) {
    if (error instanceof ChatError) {
      throw error;
    }

    console.error('GEMINI NETWORK ERROR:', error);
    throw new ChatError('NETWORK');
  }
}