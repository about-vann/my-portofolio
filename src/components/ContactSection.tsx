import React from 'react';
import { motion } from 'motion/react';
import { 
  Share2, 
  Github, 
  Send, 
  Instagram, 
  Mail, 
  ChevronRight 
} from 'lucide-react';
import { ThemeAccent, Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactProps {
  accent: ThemeAccent;
  lang: Language;
}

export const ContactSection: React.FC<ContactProps> = ({ lang }) => {
  const channels = [
    {
      id: 'github',
      name: 'GitHub',
      handle: PERSONAL_INFO.githubHandle || '@ignmasvikk',
      url: PERSONAL_INFO.github,
      icon: Github,
    },
    {
      id: 'telegram',
      name: 'Telegram',
      handle: PERSONAL_INFO.telegramHandle || '@masvanz',
      url: PERSONAL_INFO.telegram,
      icon: Send,
    },
    {
      id: 'instagram',
      name: 'Instagram',
      handle: PERSONAL_INFO.instagramHandle || '@piikkkri_',
      url: PERSONAL_INFO.instagram,
      icon: Instagram,
    },
    {
      id: 'email',
      name: 'Email',
      handle: PERSONAL_INFO.email || 'vanndx26@gmail.com',
      url: `mailto:${PERSONAL_INFO.email}`,
      icon: Mail,
    },
  ];

  return (
    <section id="contact" className="w-full">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full rounded-2xl bg-[#15161c] border border-white/[0.07] p-5 sm:p-6 shadow-xl space-y-4"
      >
        {/* Header matching the video */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Share2 className="w-4 h-4 text-zinc-400" />
            <div>
              <h2 className="text-sm font-semibold text-white tracking-wide">
                Connects
              </h2>
              <p className="text-[11px] text-zinc-500 font-normal">
                Direct channels
              </p>
            </div>
          </div>

          <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#1f2028] text-zinc-400 font-mono border border-white/5">
            {channels.length} Channels
          </span>
        </div>

        {/* Direct Channels Cards Stack */}
        <div className="space-y-2">
          {channels.map((ch) => {
            const IconComp = ch.icon;

            return (
              <a
                key={ch.id}
                href={ch.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl bg-[#191a22] hover:bg-[#1d1e28] border border-white/[0.04] hover:border-white/10 transition-all duration-200 cursor-pointer select-none"
              >
                {/* Left: Icon & Info */}
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#22242e] border border-white/5 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:bg-[#282a36] transition-colors shadow-sm">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {ch.name}
                    </h3>
                    <p className="text-[11px] text-zinc-400 font-mono">
                      {ch.handle}
                    </p>
                  </div>
                </div>

                {/* Right: Chevron Arrow */}
                <div className="w-7 h-7 rounded-full bg-[#22242e] border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-all">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
