import React from 'react';
import { motion } from 'motion/react';
import { MapPin, CalendarDays, FileText, ArrowDown, Mic } from 'lucide-react';
import { ThemeAccent, Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps { 
  accent: ThemeAccent; 
  lang: Language; 
  onDownloadCv: () => void; 
}

export const HeroSection: React.FC<HeroProps> = ({ lang, onDownloadCv }) => (
  <section id="hero" className="hero-section relative z-10 px-5 sm:px-6 pt-28 pb-16 sm:pt-36 sm:pb-24">
    <motion.div 
      initial={{ opacity: 0, y: 18 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: .65, ease: [0.16,1,.3,1] }} 
      className="mx-auto max-w-3xl text-center"
    >
      {/* Avatar dengan status online */}
      <div className="hero-avatar-wrap mx-auto mb-7">
        <img src={PERSONAL_INFO.avatar} alt={PERSONAL_INFO.name} className="hero-avatar" />
        <span className="hero-status" aria-label="Active" />
      </div>

      {/* Nama dengan warna hijau/teal sesuai gambar */}
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-[#4ade80]">
        {PERSONAL_INFO.name}
      </h1>

      {/* Username / handle */}
      <p className="text-sm text-zinc-500 mt-1 font-mono">
        @{PERSONAL_INFO.username || 'neoxr.js'} · Web & Bot Developer
      </p>

      {/* Lokasi dengan audio note indicator */}
      <div className="mt-3 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-zinc-400">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {PERSONAL_INFO.location}
        </span>
        <span className="text-zinc-700">·</span>
        <span className="inline-flex items-center gap-1.5 bg-zinc-800/50 px-2.5 py-1 rounded-full">
          <Mic className="h-3 w-3 text-[#4ade80]" />
          <span className="text-[10px] text-zinc-400">Audio Note</span>
        </span>
      </div>

      {/* Deskripsi / Bio */}
      <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-400 font-light">
        Full-stack developer focused exclusively on personal projects, building modern 
        and scalable web applications with Nuxt, developing WhatsApp bots, and integrating 
        reliable WhatsApp gateway solutions for seamless automation and communication.
      </p>

      {/* About section - tambahan seperti di gambar */}
      <div className="mt-8 text-left max-w-xl mx-auto border-t border-zinc-800/50 pt-6">
        <h2 className="text-xs uppercase tracking-[0.15em] text-zinc-500 font-medium mb-2">
          About
        </h2>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Welcome to my developer ecosystem, a self-built infrastructure that brings web
          <span className="inline-block animate-pulse">...</span>
        </p>
      </div>

      {/* Tombol View CV - lebih subtle */}
      <button 
        onClick={onDownloadCv} 
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-sm font-medium text-white/80 transition-all hover:bg-white/[0.08] hover:border-white/20 active:scale-[.98] cursor-pointer"
      >
        <FileText className="h-4 w-4" />
        View CV
      </button>

      {/* Explore link dengan efek bounce */}
      <a 
        href="#about" 
        className="mt-10 inline-flex flex-col items-center gap-2 text-[10px] uppercase tracking-[.22em] text-zinc-600 hover:text-zinc-400 transition-colors"
      >
        <span>{lang === 'id' ? 'Jelajahi' : 'Explore'}</span>
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
      </a>
    </motion.div>
  </section>
);
