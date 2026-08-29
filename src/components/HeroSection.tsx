import React from 'react';
import { motion } from 'motion/react';
import { MapPin, CalendarDays, FileText, ArrowDown } from 'lucide-react';
import { ThemeAccent, Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
interface HeroProps { accent: ThemeAccent; lang: Language; onDownloadCv: () => void; }
export const HeroSection: React.FC<HeroProps> = ({ lang, onDownloadCv }) => (
  <section id="hero" className="hero-section relative z-10 px-5 sm:px-6 pt-28 pb-16 sm:pt-36 sm:pb-24">
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, ease: [0.16,1,.3,1] }} className="mx-auto max-w-3xl text-center">
      <div className="hero-avatar-wrap mx-auto mb-7"><img src={PERSONAL_INFO.avatar} alt={PERSONAL_INFO.name} className="hero-avatar" /><span className="hero-status" aria-label="Active" /></div>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.045em] text-white">{PERSONAL_INFO.name}</h1>
      <div className="mt-3 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-zinc-400">
        <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{PERSONAL_INFO.age}</span><span className="text-zinc-700">•</span><span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{PERSONAL_INFO.location}</span>
      </div>
      <p className="mx-auto mt-6 max-w-xl text-sm sm:text-base leading-7 text-zinc-400 font-light">{PERSONAL_INFO.tagline[lang]}</p>
      <button onClick={onDownloadCv} className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/[0.09] hover:border-white/25 active:scale-[.98] cursor-pointer"><FileText className="h-4 w-4" />View CV</button>
      <a href="#about" className="mt-12 inline-flex flex-col items-center gap-2 text-[10px] uppercase tracking-[.22em] text-zinc-600 hover:text-zinc-400 transition-colors"><span>{lang === 'id' ? 'Jelajahi' : 'Explore'}</span><ArrowDown className="h-3.5 w-3.5 animate-bounce" /></a>
    </motion.div>
  </section>
);
