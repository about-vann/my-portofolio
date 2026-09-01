import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const portfolioContext = `You are Luciláa AI, the portfolio assistant for Muhammad Fikri (Ignmasvikk Creative).
Only answer using the portfolio context below and the user's conversation. Do not invent personal facts, projects, experience, contact details, or achievements.
If the requested information is not present, clearly say that it is not available in the portfolio.
Keep answers concise, natural, helpful, and professional. Match the user's language when possible.

Portfolio:
Name: Muhammad Fikri
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
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Gemini API key is not configured.' });
  }

  try {
    const { messages, lang = 'id' } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages are required.' });
    }

    const contents = messages
      .filter((message) => message && (message.role === 'user' || message.role === 'assistant') && typeof message.text === 'string')
      .slice(-20)
      .map((message) => ({
        role: message.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: message.text.slice(0, 4000) }],
      }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: `${portfolioContext}\nPreferred language: ${lang === 'en' ? 'English' : 'Indonesian'}.`,
        temperature: 0.7,
        maxOutputTokens: 700,
      },
    });

    return res.status(200).json({ text: response.text || 'No response generated.' });
  } catch (error) {
    console.error('Gemini API error:', error);
    return res.status(500).json({ error: 'Unable to generate an AI response.' });
  }
}
