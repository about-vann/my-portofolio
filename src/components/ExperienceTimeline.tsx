import React from 'react';
import { motion } from 'motion/react';
import { Milestone } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';
import { ThemeAccent, Language } from '../types';

interface TimelineProps {
  accent: ThemeAccent;
  lang: Language;
}

export const ExperienceTimeline: React.FC<TimelineProps> = ({ lang }) => (
  <section id="experience" className="content-section relative z-10 px-5 sm:px-6">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="section-shell"
    >
      <div className="section-kicker flex items-center gap-2">
        <Milestone className="w-3.5 h-3.5 text-zinc-400" />
        <span>04 · {lang === 'id' ? 'Perjalanan' : 'Journey'}</span>
      </div>
      <h2 className="section-title mt-5">
        {lang === 'id' ? 'Pengalaman yang membentuk saya.' : 'Experiences that shaped me.'}
      </h2>
      <div className="timeline mt-9">
        {EXPERIENCES.map((exp) => (
          <article className="timeline-item" key={exp.id}>
            <div className="timeline-dot" />
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h3 className="text-sm font-medium text-white">{exp.role[lang]}</h3>
                <p className="mt-1 text-xs text-zinc-500">{exp.company}</p>
              </div>
              <span className="text-[10px] uppercase tracking-[.12em] text-zinc-600">
                {exp.period}
              </span>
            </div>
            <p className="mt-4 text-xs leading-6 text-zinc-500">{exp.description[lang]}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {exp.techStack.map((t) => (
                <span className="skill-pill" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </motion.div>
  </section>
);

