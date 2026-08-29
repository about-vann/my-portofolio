import React from 'react';
import { motion } from 'motion/react';
import { Code2, Server, Database, Terminal, Cpu } from 'lucide-react';
import { ThemeAccent, Language } from '../types';

interface SkillsProps {
  accent: ThemeAccent;
  lang: Language;
}

export const SkillsSection: React.FC<SkillsProps> = ({ lang }) => {
  const groups = [
    ['Frontend', ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vite'], Code2],
    ['Backend', ['Node.js', 'Express.js', 'REST API', 'FastAPI', 'Socket.io'], Server],
    ['Data', ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase'], Database],
    ['Tools', ['Linux', 'Git / GitHub', 'Docker', 'PM2', 'Postman'], Terminal],
  ] as const;

  return (
    <section id="skills" className="content-section relative z-10 px-5 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="section-shell"
      >
        <div className="section-kicker flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-zinc-400" />
          <span>02 · {lang === 'id' ? 'Keahlian' : 'Skills'}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mt-5">
          <h2 className="section-title">
            {lang === 'id' ? 'Tools yang sering saya pakai.' : 'Tools I often work with.'}
          </h2>
          <p className="text-xs text-zinc-500">
            {lang === 'id'
              ? 'Tidak semuanya harus dipamerkan.'
              : 'Not everything needs to be on display.'}
          </p>
        </div>
        <div className="skills-grid mt-8">
          {groups.map(([name, skills, Icon]) => (
            <div className="soft-card p-5" key={name}>
              <div className="flex items-center gap-3">
                <div className="icon-box">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-medium text-white">{name}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

