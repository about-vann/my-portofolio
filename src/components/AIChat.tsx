import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUp, Loader2, User } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Language, ThemeAccent, ColorMode } from '../types';

interface Message { role: 'user' | 'assistant'; text: string; }
interface AIChatProps { isOpen: boolean; onClose: () => void; lang: Language; accent: ThemeAccent; colorMode?: ColorMode; }

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

  return (
    <AnimatePresence>
      {isOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`ai-chat-shell fixed inset-0 z-[100] ${light ? 'ai-chat-light' : 'ai-chat-dark'}`}>
        <motion.div initial={{ scale: 0.985, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="flex h-dvh flex-col">
          <header className="ai-chat-header relative flex shrink-0 items-center border-b px-4 py-4 sm:px-8">
            <button onClick={onClose} aria-label={lang === 'id' ? 'Kembali ke portfolio' : 'Back to portfolio'} className="ai-chat-back absolute left-3 sm:left-6 rounded-xl p-2 transition"><ArrowLeft size={19} /></button>
            <div className="mx-auto whitespace-nowrap text-center text-sm font-semibold">Ignmasvik Chat AI</div>
          </header>

          <main className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col px-4 py-8 sm:px-8 sm:py-12">
              {messages.length === 0 ? <div className="flex flex-1 flex-col items-center justify-center text-center">
                <h1 className="ai-chat-title text-3xl font-semibold tracking-tight sm:text-4xl">{lang === 'id' ? 'Mau tahu tentang Fikri?' : 'Want to know about Fikri?'}</h1>
                <p className="ai-chat-muted mt-3 max-w-xl text-sm leading-6 sm:text-base">{lang === 'id' ? 'Tanya singkat tentang Fikri dan portfolio ini.' : 'Ask something about Fikri and this portfolio.'}</p>
                <div className="mt-8 flex max-w-2xl flex-wrap justify-center gap-2">{quickPrompts[lang].map((prompt) => <button key={prompt} onClick={() => void sendMessage(prompt)} className="ai-chat-prompt rounded-full border px-4 py-2 text-xs transition">{prompt}</button>)}</div>
              </div> : <div className="space-y-6 pb-8">
                {messages.map((message, index) => <motion.div key={`${message.role}-${index}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'ai-chat-user-bubble' : 'ai-chat-assistant-bubble'}`}>{message.text}</div>
                  {message.role === 'user' && <div className="ai-chat-user-avatar mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border"><User size={15} /></div>}
                </motion.div>)}
                {loading && <div className="ai-chat-muted flex items-center gap-2 text-sm"><Loader2 size={15} className="animate-spin" />{lang === 'id' ? 'Sedang berpikir…' : 'Thinking…'}</div>}
                <div ref={endRef} />
              </div>}
            </div>
          </main>

          <footer className="ai-chat-footer shrink-0 border-t px-4 py-4 sm:px-8">
            <form onSubmit={(event) => { event.preventDefault(); void sendMessage(); }} className="ai-chat-input-wrap mx-auto flex max-w-4xl items-end gap-2 rounded-2xl border p-2">
              <textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} rows={1} placeholder={lang === 'id' ? 'Tanya tentang Fikri…' : 'Ask about Fikri…'} className="ai-chat-input max-h-32 min-h-10 flex-1 resize-none bg-transparent px-3 py-2 text-sm outline-none" />
              <button type="submit" disabled={!input.trim() || loading} aria-label="Send" className="ai-chat-send flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition disabled:cursor-not-allowed disabled:opacity-30"><ArrowUp size={17} /></button>
            </form>
            <p className="ai-chat-muted mt-2 text-center text-[10px]">{lang === 'id' ? 'Jawaban AI dibuat berdasarkan informasi portfolio.' : 'AI answers are based on portfolio information.'}</p>
          </footer>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  );
}
