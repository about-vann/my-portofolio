import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUp, Bot, Loader2, Sparkles, User, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Language, ThemeAccent } from '../types';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  accent: ThemeAccent;
}

const accentClasses: Record<ThemeAccent, string> = {
  cyan: 'text-zinc-200 bg-white/5 border-white/10',
  violet: 'text-zinc-200 bg-white/5 border-white/10',
  emerald: 'text-zinc-200 bg-white/5 border-white/10',
  amber: 'text-zinc-200 bg-white/5 border-white/10',
};

const quickPrompts = {
  id: ['Siapa Fikri?', 'Apa saja project-nya?', 'Tech stack yang digunakan?'],
  en: ['Who is Fikri?', 'What projects has he built?', 'What tech stack does he use?'],
};

export function AIChat({ isOpen, onClose, lang, accent }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const accentStyle = accentClasses[accent];

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text = input) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages = [...messages, { role: 'user' as const, text: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, lang }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Request failed');

      setMessages((current) => [...current, { role: 'assistant', text: data.text }]);
    } catch (error) {
      console.error(error);
      setMessages((current) => [...current, {
        role: 'assistant',
        text: lang === 'id'
          ? 'Maaf, AI sedang tidak tersedia. Coba lagi nanti.'
          : 'Sorry, the AI is unavailable right now. Try again later.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[#0b0c10] text-zinc-100"
        >
          <motion.div
            initial={{ scale: 0.985, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex h-dvh flex-col"
          >
            <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-4 sm:px-8">
              <button onClick={onClose} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white">
                <ArrowLeft size={17} />
                <span>{lang === 'id' ? 'Kembali ke Portfolio' : 'Back to Portfolio'}</span>
              </button>

              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${accentStyle}`}>
                  <Sparkles size={17} />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold">Fikri AI</p>
                  <p className="text-[11px] text-zinc-500">Portfolio Assistant</p>
                </div>
              </div>

              <button onClick={onClose} aria-label="Close" className="rounded-xl p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white">
                <X size={19} />
              </button>
            </header>

            <main className="min-h-0 flex-1 overflow-y-auto">
              <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col px-4 py-8 sm:px-8 sm:py-12">
                {messages.length === 0 ? (
                  <div className="flex flex-1 flex-col items-center justify-center text-center">
                    <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border ${accentStyle}`}>
                      <Bot size={28} />
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{lang === 'id' ? 'Mau tahu tentang Fikri?' : 'Want to know about Fikri?'}</h1>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
                      {lang === 'id' ? 'Tanya singkat tentang Fikri dan portfolio ini.' : 'Ask something about Fikri and this portfolio.'}
                    </p>
                    <div className="mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
                      {quickPrompts[lang].map((prompt) => (
                        <button key={prompt} onClick={() => void sendMessage(prompt)} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-400 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-zinc-100">
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 pb-8">
                    {messages.map((message, index) => (
                      <motion.div key={`${message.role}-${index}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {message.role === 'assistant' && (
                          <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${accentStyle}`}><Bot size={15} /></div>
                        )}
                        <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'bg-white text-zinc-900' : 'border border-white/10 bg-white/[0.035] text-zinc-300'}`}>
                          {message.text}
                        </div>
                        {message.role === 'user' && (
                          <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-500"><User size={15} /></div>
                        )}
                      </motion.div>
                    ))}
                    {loading && (
                      <div className="flex items-center gap-3 text-sm text-zinc-500">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${accentStyle}`}><Bot size={15} /></div>
                        <span className="flex items-center gap-2"><Loader2 size={15} className="animate-spin" /> {lang === 'id' ? 'Sedang berpikir…' : 'Thinking…'}</span>
                      </div>
                    )}
                    <div ref={endRef} />
                  </div>
                )}
              </div>
            </main>

            <footer className="shrink-0 border-t border-white/10 bg-[#0b0c10]/95 px-4 py-4 backdrop-blur-xl sm:px-8">
              <form onSubmit={(event) => { event.preventDefault(); void sendMessage(); }} className="mx-auto flex max-w-4xl items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.035] p-2 focus-within:border-white/20">
                <textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} rows={1} placeholder={lang === 'id' ? 'Tanya tentang Fikri…' : 'Ask about Fikri…'} className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-3 py-2 text-sm text-zinc-200 outline-none placeholder:text-zinc-600" />
                <button type="submit" disabled={!input.trim() || loading} aria-label="Send" className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition disabled:cursor-not-allowed disabled:opacity-30 ${accentStyle}`}>
                  <ArrowUp size={17} />
                </button>
              </form>
              <p className="mt-2 text-center text-[10px] text-zinc-600">{lang === 'id' ? 'Jawaban AI dibuat berdasarkan informasi portfolio.' : 'AI answers are based on portfolio information.'}</p>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
