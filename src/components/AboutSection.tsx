import React from 'react';
import { motion } from 'motion/react';
import { User } from 'lucide-react';
import { ThemeAccent, Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AboutProps { accent: ThemeAccent; lang: Language; }

export const AboutSection: React.FC<AboutProps> = ({ lang }) => {
  const id = lang === 'id';
  const intro = id
    ? 'Selamat datang di ekosistem developer saya, sebuah infrastruktur yang saya bangun sendiri untuk menyatukan aplikasi web, bot WhatsApp, dan layanan gateway dalam satu platform.'
    : PERSONAL_INFO.bio.aboutIntro.en;
  const body = id
    ? 'Dibangun dari awal, ekosistem ini dirancang agar layanan web dan bot dapat terintegrasi dengan mulus, mendukung otomasi, komunikasi real-time, dan pengelolaan layanan yang skalabel melalui arsitektur yang ringan dan responsif.'
    : PERSONAL_INFO.bio.aboutBody.en;

  return (
    <section id="about" className="w-full">
      <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="w-full rounded-2xl bg-[#15161c] border border-white/[0.07] p-5 sm:p-6 shadow-xl space-y-3.5">
        <div className="flex items-center gap-2.5"><User className="w-4 h-4 text-zinc-400" /><h2 className="text-sm font-semibold text-white tracking-wide">{id ? 'Tentang' : 'About'}</h2></div>
        <div className="space-y-3.5 text-xs sm:text-[13px] leading-relaxed text-zinc-300 font-normal"><p>{intro}</p><p>{body}</p></div>
      </motion.div>
    </section>
  );
};
