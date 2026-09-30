# Campus Portal Chatbot

Static campus site (`public/`) + a Gemini chatbot served by one serverless function (`api/chat.js`). Deploys on Vercel.

## Environment variables

| Name | Required | Notes |
|------|----------|-------|
| `GEMINI_API_KEY` | yes | Your Gemini API key. Server-side only. |
| `GEMINI_MODEL` | no | Defaults to `gemini-3.6-flash`. |

## Deploy on Vercel

1. Push this folder to a GitHub repo.
2. vercel.com -> **Add New -> Project** -> import the repo. Leave all build settings as they are (`vercel.json` handles them).
3. Under **Environment Variables**, add `GEMINI_API_KEY` (and optionally `GEMINI_MODEL`) for Production, Preview and Development.
4. Click **Deploy**. Open the URL, log in, and use the chat button.

If you change an environment variable later, **redeploy** so it takes effect.

## Local preview

```
cp .env.example .env    # then put your real key in .env
npx vercel dev
```
