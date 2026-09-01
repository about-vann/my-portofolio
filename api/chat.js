import { GoogleGenAI } from '@google/genai';

const portfolioContext = `You are Fikri AI, a simple portfolio assistant representing Fikri.
You are not a separate bot persona and must never call yourself Luciláa AI.
Answer as an assistant about Fikri and his portfolio, not about a WhatsApp bot persona.
Keep every answer short and direct: normally 1-3 short sentences. Use a short bullet list only when it makes the answer clearer.
Do not give long introductions, unnecessary explanations, or repeat the question.
Only answer using the portfolio context below and the user's conversation. Never invent personal facts, projects, experience, contact details, or achievements.
If the requested information is not available, say briefly that it is not available in the portfolio.
Match the user's language when possible.

Portfolio:
Name: Muhammad Fikri
Preferred name: Fikri
Brand: Ignmasvikk Creative
Alias: Ignmasvikk
Title: Web & Bot Developer
Location: Surabaya, Indonesia
Focus: Full-stack web development, React, WhatsApp bots, WhatsApp gateway solutions, automation.
Specialties: TypeScript, React, Node.js, Express, Baileys, RESTful API gateways.
GitHub: https://github.com/about-vann
Instagram: https://instagram.com/piikkkri_
Telegram: https://t.me/masvanz
Email: vanndx26@gmail.com
Availability: Available for work and projects.

The portfolio's project and profile details are the source of truth. If a detail is not included here, do not guess it.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is missing. Add it to Vercel Environment Variables and redeploy.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { messages, lang = 'id' } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages are required.' });
    }

    const contents = messages
      .filter((message) => message && (message.role === 'user' || message.role === 'assistant') && typeof message.text === 'string')
      .slice(-12)
      .map((message) => ({
        role: message.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: message.text.slice(0, 3000) }],
      }));

    if (!contents.length || contents[contents.length - 1].role !== 'user') {
      return res.status(400).json({ error: 'A user message is required.' });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: `${portfolioContext}\nPreferred language: ${lang === 'en' ? 'English' : 'Indonesian'}.`,
        temperature: 0.5,
        maxOutputTokens: 220,
      },
    });

    const text = response?.text?.trim();
    if (!text) {
      return res.status(502).json({ error: 'Gemini returned an empty response.' });
    }

    return res.status(200).json({ text });
  } catch (error) {
    console.error('Gemini API error:', error);
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: `Gemini request failed: ${message.slice(0, 300)}` });
  }
}
