import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface PageIntroProps {
  accent: string;
}

export const PageIntro: React.FC<PageIntroProps> = ({ accent }) => {
  const [visible, setVisible] = useState(true);
  const [loadPercent, setLoadPercent] = useState(15);

  useEffect(() => {
    // Progress counter animation
    const interval = window.setInterval(() => {
      setLoadPercent((prev) => {
        if (prev >= 100) {
          window.clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25 + 15);
      });
    }, 110);

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 1350);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
    };
  }, []);

  const getAccentHex = (acc: string) => {
    switch (acc) {
      case 'violet': return '#a78bfa';
      case 'emerald': return '#34d399';
      case 'amber': return '#fbbf24';
      default: return '#22d3ee';
    }
  };

  const accentColor = getAccentHex(accent);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="page-intro fixed inset-0 z-50 flex items-center justify-center bg-[#050505] cursor-pointer select-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setVisible(false)}
          title="Klik untuk lewati"
          role="status"
          aria-label="Portfolio Loading Screen"
        >
          {/* Subtle Ambient Light Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
          
          <div
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none opacity-20 blur-[120px] transition-all duration-700"
            style={{ background: accentColor }}
          />

          <motion.div
            className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm w-full"
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Avatar with Rotating Cyber Ring */}
            <div className="relative mb-5">
              <motion.div
                className="absolute -inset-2 rounded-3xl opacity-50 blur-sm"
                style={{ background: `linear-gradient(135deg, ${accentColor}, transparent, ${accentColor})` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
              <div className="relative w-20 h-20 rounded-2xl p-[2px] bg-gradient-to-br from-white/30 to-white/5 shadow-2xl overflow-hidden">
                <img
                  src={PERSONAL_INFO.avatar}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#050505] border border-white/20 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full animate-ping" style={{ background: accentColor }} />
                <span className="absolute w-2 h-2 rounded-full" style={{ background: accentColor }} />
              </span>
            </div>

            {/* System Status Tag */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono tracking-widest uppercase text-zinc-400 mb-2.5"
            >
              <Terminal className="w-3 h-3 text-zinc-500" />
              <span>IGNMASVIKK // SYSTEM {Math.min(100, loadPercent)}%</span>
            </motion.div>

            {/* Name with subtle shine */}
            <motion.h1
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.45 }}
              className="text-2xl font-extrabold text-white tracking-tight"
            >
              {PERSONAL_INFO.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.45 }}
              className="text-xs font-mono text-zinc-400 mt-1"
            >
              Full-Stack Developer • Surabaya
            </motion.p>

            {/* Cyber Progress Indicator */}
            <div className="w-44 h-1 bg-white/10 rounded-full mt-5 overflow-hidden p-0 relative">
              <motion.div
                className="h-full rounded-full transition-all duration-150"
                style={{
                  width: `${Math.min(100, loadPercent)}%`,
                  background: `linear-gradient(90deg, #ffffff, ${accentColor})`,
                  boxShadow: `0 0 10px ${accentColor}`,
                }}
              />
            </div>

            <p className="text-[10px] text-zinc-600 font-mono mt-3">
              Klik layar untuk melewati
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
