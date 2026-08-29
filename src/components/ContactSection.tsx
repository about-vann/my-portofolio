import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Share2, 
  Github, 
  Send, 
  Instagram, 
  Mail, 
  MessageCircle,
  ChevronRight, 
  Check, 
  Copy,
  MessageSquare
} from 'lucide-react';
import { ThemeAccent, Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactProps {
  accent: ThemeAccent;
  lang: Language;
}

export const ContactSection: React.FC<ContactProps> = ({ accent, lang }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showDirectForm, setShowDirectForm] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const channels = [
    {
      id: 'github',
      name: 'GitHub',
      handle: '@about-vann',
      url: 'https://github.com/about-vann',
      icon: Github,
      copyValue: 'https://github.com/about-vann',
      badge: 'Code & Repos',
    },
    {
      id: 'telegram',
      name: 'Telegram',
      handle: '@masvanz',
      url: 'https://t.me/masvanz',
      icon: Send,
      copyValue: 'https://t.me/masvanz',
      badge: 'Fast Chat',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@piikkkri_',
      url: 'https://instagram.com/piikkkri_',
      icon: Instagram,
      copyValue: 'https://instagram.com/piikkkri_',
      badge: 'Social & Life',
    },
    {
      id: 'email',
      name: 'Email',
      handle: PERSONAL_INFO.email,
      url: `mailto:${PERSONAL_INFO.email}`,
      icon: Mail,
      copyValue: PERSONAL_INFO.email,
      badge: 'Official Inquiry',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      handle: PERSONAL_INFO.formattedPhone,
      url: PERSONAL_INFO.whatsapp,
      icon: MessageCircle,
      copyValue: PERSONAL_INFO.phone,
      badge: 'Instant Call/WA',
    },
  ];

  const handleCopy = (e: React.MouseEvent, id: string, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSent(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setFormSent(false);
      setShowDirectForm(false);
    }, 2500);
  };

  return (
    <section 
      id="contact" 
      className="content-section px-4 sm:px-6 max-w-3xl mx-auto relative z-10 font-sans"
    >
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-3.5"
      >
        {/* Section Kicker */}
        <div className="section-kicker flex items-center gap-2">
          <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
          <span>05 · {lang === 'id' ? 'Kontak & Terhubung' : 'Contact & Connect'}</span>
        </div>

        {/* Header Matching Connects Style */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#141417] border border-white/10 flex items-center justify-center text-zinc-200 shadow-sm">
              <Share2 className="w-4 h-4 text-zinc-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Connects
              </h3>
              <p className="text-xs text-zinc-400">
                {lang === 'id' ? 'Saluran langsung pengembang' : 'Direct channels'}
              </p>
            </div>
          </div>

          <div className="px-3 py-1 rounded-lg bg-[#141417] border border-white/5 text-[11px] font-medium text-zinc-400 shadow-sm">
            {channels.length} Channels
          </div>
        </div>

        {/* Direct Channels Cards Stack */}
        <div className="space-y-2.5">
          {channels.map((ch) => {
            const IconComp = ch.icon;
            const isCopied = copiedId === ch.id;

            return (
              <div
                key={ch.id}
                onClick={() => window.open(ch.url, '_blank')}
                className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#111113] hover:bg-[#161619] border border-white/5 hover:border-white/15 transition-all duration-200 cursor-pointer shadow-md select-none"
              >
                {/* Left: Icon & Info */}
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#18181b] border border-white/5 flex items-center justify-center text-white group-hover:scale-105 group-hover:border-white/20 transition-all shadow-inner">
                    <IconComp className="w-5 h-5 text-zinc-200 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white group-hover:text-white transition-colors">
                        {ch.name}
                      </span>
                      {ch.badge && (
                        <span className="hidden sm:inline-block text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-500 font-mono">
                          {ch.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors font-mono">
                      {ch.handle}
                    </span>
                  </div>
                </div>

                {/* Right: Copy & Chevron Button */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleCopy(e, ch.id, ch.copyValue)}
                    title={lang === 'id' ? 'Salin link' : 'Copy link'}
                    className="p-2 rounded-lg bg-[#18181b] hover:bg-zinc-800 border border-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <div className="w-8 h-8 rounded-full bg-[#18181b] group-hover:bg-[#222226] border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white transition-all shadow-sm">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Message Toggle */}
        <div className="pt-2 flex items-center justify-between text-xs text-zinc-500 px-1">
          <span>{PERSONAL_INFO.name} • {PERSONAL_INFO.location}</span>
          <button
            onClick={() => setShowDirectForm(!showDirectForm)}
            className="text-zinc-400 hover:text-white underline cursor-pointer text-xs flex items-center gap-1"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{showDirectForm ? (lang === 'id' ? 'Tutup Formulir' : 'Close Form') : (lang === 'id' ? 'Kirim Pesan Langsung' : 'Send Direct Message')}</span>
          </button>
        </div>

        {/* Expandable Web Dispatch Form */}
        <AnimatePresence>
          {showDirectForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden pt-1"
            >
              <div className="p-4 sm:p-5 rounded-2xl bg-[#111113] border border-white/10 space-y-3.5 shadow-md">
                {formSent ? (
                  <div className="p-4 text-center rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 text-xs font-mono space-y-1">
                    <div className="font-bold flex items-center justify-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Pesan Terkirim!</span>
                    </div>
                    <p className="text-zinc-400 text-[11px]">Terima kasih, saya akan merespon email Anda sesegera mungkin.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-3">
                    <div className="text-xs font-bold text-white">Formulir Pesan Cepat</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nama Anda"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#18181b] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30"
                      />
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email Anda"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#18181b] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30"
                      />
                    </div>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tulis pesan atau kebutuhan proyek..."
                      className="w-full px-3.5 py-2 rounded-xl bg-[#18181b] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors cursor-pointer"
                    >
                      Kirim Pesan
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
