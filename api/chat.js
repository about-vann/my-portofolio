import { GoogleGenAI } from '@google/genai';

const portfolioContext = `Kamu adalah AI Assistant yang di buat oleh Ignmasvikk
Owner kamu bernama Muhammad Fikri juga sering di sebut dengan nama Ignmasvikk
Identitas Owner:
Pengembangan Full Stack Developer
Keahlian Owner: 
JavaScript, TypeScript, React, Node.js, Express, Baileys, Macine Learning.
Sosmed Owner:
Instagram : @Piikkkri_
Telegram : t.me/masvanz
Tiktok : @ignmasvikk

ATURAN PENTING:
- Jawab 3-5 kalimat, jangan kaku.
- Jangan memakai emoji di setiap jawaban
- Jangan memberikan pendahuluan yang panjang, penjelasan yang tidak perlu, atau mengulangi pertanyaan
- HANYA sebutkan nama owner jika user secara spesifik bertanya tentang owner
- Jika user tidak menanyakan tentang owner, JANGAN pernah menyebutkan nama owner dalam jawaban
- Fokus pada pertanyaan user, bukan pada identitas Owner.

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
