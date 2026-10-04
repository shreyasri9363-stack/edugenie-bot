# E-D-U-G-E-N-I-E

A lightweight AI chatbot prototype powered by the Google Gemini API (free tier).

## Features
- Real AI answers from Gemini (no canned responses)
- Typing indicator, auto-scroll, session chat history
- New Chat and Clear buttons
- Enter to send, Shift + Enter for a new line, empty-message validation
- Markdown in AI replies (headings, bold, lists, code blocks)
- Light/dark theme toggle, responsive layout (mobile to desktop)
- Friendly errors: missing key, network, rate limit, API error, empty response

## Technology
React 18, Vite, JavaScript, CSS, react-markdown, Google Gemini API.

## Install
```bash
npm install
```

## Get a Gemini API key (free)
1. Go to https://aistudio.google.com/apikey and sign in with a Google account.
2. Click **Create API key** and copy it.

## Configure .env
```bash
cp .env.example .env
```
Open `.env` and set:
```
VITE_GEMINI_API_KEY=your_real_key_here
```
`.env` is already listed in `.gitignore`. Never commit it.

## Run locally
```bash
npm run dev
```
Open the URL Vite prints (usually http://localhost:5173). Restart the server after editing `.env`.

## Change the AI model
Edit `GEMINI_MODEL` in `src/config.js` (default: `gemini-2.5-flash`). The system instruction and welcome text live there too.

## Deploy (Vercel or Netlify)
1. Push the project to GitHub (without `.env`).
2. Import the repo in Vercel or Netlify.
3. Build command: `npm run build`, output directory: `dist`.
4. Add the environment variable `VITE_GEMINI_API_KEY` in the host's settings, then deploy.

## Free-tier and security notes
- The Gemini free tier has rate limits and daily quotas that Google can change. Check https://ai.google.dev/pricing for current limits. If you hit them, the app shows a "too many requests" message.
- Free-tier prompts may be used by Google to improve its products. Don't send private data.
- **Important:** this is a frontend-only app, so any `VITE_` variable is bundled into the browser code. The key stays out of your source and GitHub, but anyone who visits a *deployed* copy can find it in their browser's network tab. For a public deployment, restrict the key in Google AI Studio or Google Cloud Console (for example, by HTTP referrer) or move the API call to a small serverless function that holds the key.
