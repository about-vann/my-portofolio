import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUp, Bot, Loader2, User } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Language, ColorMode } from '../types';

interface Message { role: 'user' | 'assistant'; text: string; }
interface AIChatProps { isOpen: boolean; onClose: () => void; lang: Language; colorMode?: ColorMode; }

const quickPrompts = {
  id: ['Siapa Fikri?', 'Apa saja project-nya?', 'Tech stack yang digunakan?'],
  en: ['Who is Fikri?', 'What projects has he built?', 'What tech stack does he use?'],
};

export function AIChat({ isOpen, onClose, lang, colorMode = 'dark' }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const light = colorMode === 'light';

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  const sendMessage = async (text = input) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const nextMessages = [...messages, { role: 'user' as const, text: trimmed }];
    setMessages(nextMessages); setInput(''); setLoading(true);
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: nextMessages, lang }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Request failed');
      setMessages((current) => [...current, { role: 'assistant', text: data.text }]);
    } catch (error) {
      console.error(error);
      setMessages((current) => [...current, { role: 'assistant', text: lang === 'id' ? 'Maaf, AI sedang tidak tersedia. Coba lagi nanti.' : 'Sorry, the AI is unavailable right now. Try again later.' }]);
    } finally { setLoading(false); }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); void sendMessage(); }
  };

  const theme = light ? {
    background: '#f5f6f8', text: '#18181b', muted: '#71717a', border: '#e4e4e7',
    input: '#ffffff', userBubble: '#18181b', userText: '#ffffff', assistantBubble: '#ffffff', assistantText: '#3f3f46',
    button: '#18181b', buttonText: '#ffffff', prompt: '#ffffff', promptText: '#52525b', iconBg: '#ffffff', iconText: '#3f3f46'
  } : {
    background: '#0b0c10', text: '#f4f4f5', muted: '#71717a', border: 'rgba(255,255,255,.1)',
    input: 'rgba(255,255,255,.035)', userBubble: '#ffffff', userText: '#18181b', assistantBubble: 'rgba(255,255,255,.035)', assistantText: '#d4d4d8',
    button: '#ffffff', buttonText: '#18181b', prompt: 'rgba(255,255,255,.03)', promptText: '#a1a1aa', iconBg: '#f4f4f5', iconText: '#3f3f46'
  };

  return (
    <AnimatePresence>
      {isOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ backgroundColor: theme.background, color: theme.text }} className="fixed inset-0 z-[100]">
        <motion.div initial={{ scale: 0.985, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="flex h-dvh flex-col">
          <header style={{ borderColor: theme.border, backgroundColor: theme.background }} className="relative flex shrink-0 items-center border-b px-4 py-4 sm:px-8">
            <button onClick={onClose} aria-label={lang === 'id' ? 'Kembali ke portfolio' : 'Back to portfolio'} style={{ color: theme.muted }} className="absolute left-2 rounded-xl p-2 transition hover:opacity-70 sm:left-5"><ArrowLeft size={19} /></button>
            <div style={{ color: theme.text }} className="mx-auto whitespace-nowrap text-center text-sm font-semibold">Ignmasvik Chat AI</div>
          </header>

          <main className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col px-4 py-8 sm:px-8 sm:py-12">
              {messages.length === 0 ? <div className="flex flex-1 flex-col items-center justify-center text-center">
                <div style={{ backgroundColor: theme.iconBg, color: theme.iconText, borderColor: theme.border }} className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border"><Bot size={28} strokeWidth={2.2} /></div>
                <h1 style={{ color: theme.text }} className="text-3xl font-semibold tracking-tight sm:text-4xl">{lang === 'id' ? 'Mau tahu tentang Fikri?' : 'Want to know about Fikri?'}</h1>
                <p style={{ color: theme.muted }} className="mt-3 max-w-xl text-sm leading-6 sm:text-base">{lang === 'id' ? 'Tanya singkat tentang Fikri dan portfolio ini.' : 'Ask something about Fikri and this portfolio.'}</p>
                <div className="mt-8 flex max-w-2xl flex-wrap justify-center gap-2">{quickPrompts[lang].map((prompt) => <button key={prompt} onClick={() => void sendMessage(prompt)} style={{ backgroundColor: theme.prompt, borderColor: theme.border, color: theme.promptText }} className="rounded-full border px-4 py-2 text-xs transition hover:opacity-75">{prompt}</button>)}</div>
              </div> : <div className="space-y-6 pb-8">
                {messages.map((message, index) => <motion.div key={`${message.role}-${index}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.role === 'assistant' && <div style={{ backgroundColor: theme.iconBg, color: theme.iconText, borderColor: theme.border }} className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border"><Bot size={15} strokeWidth={2.2} /></div>}
                  <div style={{ backgroundColor: message.role === 'user' ? theme.userBubble : theme.assistantBubble, color: message.role === 'user' ? theme.userText : theme.assistantText, borderColor: theme.border }} className="max-w-[85%] whitespace-pre-wrap rounded-2xl border px-4 py-3 text-sm leading-6">{message.text}</div>
                  {message.role === 'user' && <div style={{ backgroundColor: theme.input, color: theme.muted, borderColor: theme.border }} className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border"><User size={15} /></div>}
                </motion.div>)}
                {loading && <div style={{ color: theme.muted }} className="flex items-center gap-2 text-sm"><div style={{ backgroundColor: theme.iconBg, color: theme.iconText, borderColor: theme.border }} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border"><Bot size={15} strokeWidth={2.2} /></div><span className="flex items-center gap-2"><Loader2 size={15} className="animate-spin" />{lang === 'id' ? 'Sedang berpikir…' : 'Thinking…'}</span></div>}
                <div ref={endRef} />
              </div>}
            </div>
          </main>

          <footer style={{ backgroundColor: theme.background, borderColor: theme.border }} className="shrink-0 border-t px-4 py-4 sm:px-8">
            <form onSubmit={(event) => { event.preventDefault(); void sendMessage(); }} style={{ backgroundColor: theme.input, borderColor: theme.border }} className="mx-auto flex max-w-4xl items-end gap-2 rounded-2xl border p-2">
              <textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} rows={1} placeholder={lang === 'id' ? 'Tanya tentang Fikri…' : 'Ask about Fikri…'} style={{ color: theme.text }} className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-3 py-2 text-sm outline-none placeholder:text-zinc-500" />
              <button type="submit" disabled={!input.trim() || loading} aria-label="Send" style={{ backgroundColor: theme.button, color: theme.buttonText, borderColor: theme.border }} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-30"><ArrowUp size={17} /></button>
            </form>
            <p style={{ color: theme.muted }} className="mt-2 text-center text-[10px]">{lang === 'id' ? 'Jawaban AI dibuat berdasarkan informasi portfolio.' : 'AI answers are based on portfolio information.'}</p>
          </footer>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  );
}
