import React from 'react';
import { motion } from 'motion/react';
import { ThemeAccent } from '../types';

interface SectionDividerProps {
  accent?: ThemeAccent;
  id?: string;
}

const ACCENT_GLOW: Record<ThemeAccent, string> = {
  cyan: 'rgba(34, 211, 238, 0.4)',
  violet: 'rgba(167, 139, 250, 0.4)',
  emerald: 'rgba(52, 211, 153, 0.4)',
  amber: 'rgba(251, 191, 36, 0.4)',
};

export const SectionDivider: React.FC<SectionDividerProps> = ({ accent = 'cyan', id }) => {
  const glowColor = ACCENT_GLOW[accent] || ACCENT_GLOW.cyan;

  return (
    <div
      id={id}
      className="relative w-full max-w-5xl mx-auto px-6 py-1 flex items-center justify-center overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Primary horizontal line with edge fade-out gradient */}
      <motion.div
        className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent dark:via-zinc-700/50 light:via-zinc-300/80"
        initial={{ opacity: 0, scaleX: 0.7 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Soft center glow spot */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[2px] blur-[1px] opacity-60 transition-colors duration-500"
          style={{
            background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 70%)`,
          }}
        />

        {/* Minimal center micro-indicator pip */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/70 dark:bg-white/50 light:bg-zinc-800/40 shadow-sm" />
      </motion.div>
    </div>
  );
};
