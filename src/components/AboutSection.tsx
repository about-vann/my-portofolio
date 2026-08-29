import React from 'react';
import { motion } from 'motion/react';
import { Code2, Server, Layers3, User } from 'lucide-react';
import { ThemeAccent, Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AboutProps {
  accent: ThemeAccent;
  lang: Language;
}

export const AboutSection: React.FC<AboutProps> = ({ lang }) => {
  const highlights = [
    {
      icon: Code2,
      title: 'Interface',
      text:
        lang === 'id'
          ? 'Membuat antarmuka yang terasa ringan, rapi, dan enak dipakai.'
          : 'Building interfaces that feel light, polished, and easy to use.',
    },
    {
      icon: Server,
      title: 'Systems',
      text:
        lang === 'id'
          ? 'Mengembangkan backend, API, automation, dan layanan yang praktis.'
          : 'Developing practical backends, APIs, automation, and services.',
    },
    {
      icon: Layers3,
      title: 'Craft',
      text:
        lang === 'id'
          ? 'Suka merapikan detail kecil yang membuat sebuah produk terasa matang.'
          : 'Enjoying the small details that make a product feel finished.',
    },
  ];

  return (
    <section id="about" className="content-section relative z-10 px-5 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="section-shell"
      >
        <div className="section-kicker flex items-center gap-2">
          <User className="w-3.5 h-3.5 text-zinc-400" />
          <span>01 · {lang === 'id' ? 'Tentang' : 'About'}</span>
        </div>
        <div className="about-grid mt-5">
          <div>
            <h2 className="section-title">
              {lang === 'id' ? 'Sedikit tentang saya.' : 'A little about me.'}
            </h2>
            <p className="section-lead mt-5">{PERSONAL_INFO.bio.philosophy[lang]}</p>
            <p className="section-copy mt-4">{PERSONAL_INFO.bio.background[lang]}</p>
          </div>
          <div className="space-y-3">
            {highlights.map(({ icon: Icon, title, text }) => (
              <div key={title} className="soft-card flex gap-4 p-4">
                <div className="icon-box">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">{title}</h3>
                  <p className="mt-1 text-xs leading-5 text-zinc-500">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

