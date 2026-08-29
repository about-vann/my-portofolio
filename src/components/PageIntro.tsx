import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface PageIntroProps {
  accent: string;
  onFinish?: () => void;
}

export const PageIntro: React.FC<PageIntroProps> = ({ accent, onFinish }) => {
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(0);

  const closeIntro = () => {
    // Ensure screen position is strictly at top (Home)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    setVisible(false);
    if (onFinish) onFinish();
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // Staged graffiti spray sequence
    const t1 = window.setTimeout(() => setStep(1), 150);
    const t2 = window.setTimeout(() => setStep(2), 450);
    const t3 = window.setTimeout(() => setStep(3), 850);
    const tAutoClose = window.setTimeout(() => {
      closeIntro();
    }, 2100);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(tAutoClose);
    };
  }, []);

  const getAccentGlow = () => {
    switch (accent) {
      case 'violet':
        return {
          spray: 'rgba(167, 139, 250, 0.45)',
          neon: '#a78bfa',
          secondary: '#ec4899',
          gradient: 'from-fuchsia-500 via-purple-400 to-indigo-400',
        };
      case 'emerald':
        return {
          spray: 'rgba(52, 211, 153, 0.45)',
          neon: '#34d399',
          secondary: '#06b6d4',
          gradient: 'from-emerald-400 via-teal-300 to-cyan-400',
        };
      case 'amber':
        return {
          spray: 'rgba(251, 191, 36, 0.45)',
          neon: '#fbbf24',
          secondary: '#f97316',
          gradient: 'from-amber-400 via-orange-400 to-rose-500',
        };
      default:
        return {
          spray: 'rgba(34, 211, 238, 0.45)',
          neon: '#22d3ee',
          secondary: '#a855f7',
          gradient: 'from-cyan-400 via-sky-300 to-fuchsia-400',
        };
    }
  };

  const themeColors = getAccentGlow();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="graffiti-page-intro"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#070709] cursor-pointer select-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={closeIntro}
          title="Klik untuk langsung masuk"
          role="status"
          aria-label="MasFik Graffiti Intro"
        >
          {/* Subtle dark spray texture background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_75%)] pointer-events-none" />
          
          {/* Ambient Spray Paint Light Glow */}
          <motion.div
            className="absolute w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full pointer-events-none blur-[100px] opacity-35"
            style={{ background: themeColors.neon }}
            animate={{
              scale: [0.85, 1.15, 1],
              opacity: [0.2, 0.4, 0.3],
            }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
          />

          <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-lg w-full text-center">
            
            {/* Spray Paint Particle Splatters */}
            <div className="absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center">
              {/* Splatter dots around tag */}
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="absolute -top-10 -left-6 w-3 h-3 rounded-full bg-cyan-400 blur-[1px]"
              />
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ delay: 0.45, duration: 0.3 }}
                className="absolute -bottom-8 -right-8 w-4 h-4 rounded-full bg-fuchsia-500 blur-[1px]"
              />
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.5 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="absolute top-12 right-16 w-2 h-2 rounded-full bg-yellow-400 blur-[0.5px]"
              />
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="absolute -top-4 right-8 w-2.5 h-2.5 rounded-full bg-emerald-400 blur-[0.5px]"
              />
            </div>

            {/* Main Graffiti Tag "MasFik" */}
            <div className="relative py-4 px-6 inline-block">
              
              {/* Deep Street Shadow / Shadow Tag Layer */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, x: -10, y: 10 }}
                animate={{ opacity: 0.45, scale: 1, x: 6, y: 8 }}
                transition={{ duration: 0.45, ease: [0.175, 0.885, 0.32, 1.275] }}
                className="absolute inset-0 flex items-center justify-center text-6xl sm:text-8xl md:text-9xl font-extrabold font-['Permanent_Marker',cursive] tracking-wider text-black select-none pointer-events-none blur-[2px]"
              >
                MasFik
              </motion.div>

              {/* Glowing Spray Outline Under-layer */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.7, scale: 1.02 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center text-6xl sm:text-8xl md:text-9xl font-extrabold font-['Permanent_Marker',cursive] tracking-wider text-transparent select-none pointer-events-none blur-[6px]"
                style={{
                  WebkitTextStroke: `4px ${themeColors.neon}`,
                  textShadow: `0 0 25px ${themeColors.neon}, 0 0 50px ${themeColors.secondary}`,
                }}
              >
                MasFik
              </motion.div>

              {/* Primary Graffiti Front Text */}
              <motion.h1
                initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
                animate={{ 
                  scale: [0.6, 1.08, 1], 
                  opacity: 1, 
                  rotate: [-8, 2, -2] 
                }}
                transition={{ 
                  duration: 0.7, 
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="relative text-6xl sm:text-8xl md:text-9xl font-extrabold font-['Permanent_Marker',cursive] tracking-wider text-white select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
              >
                <span className={`bg-clip-text text-transparent bg-gradient-to-br ${themeColors.gradient} inline-block`}>
                  MasFik
                </span>

                {/* Spray Star Tag Accent */}
                <motion.span
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: [0, 1.3, 1], rotate: [0, 90, 45] }}
                  transition={{ delay: 0.55, duration: 0.4 }}
                  className="absolute -top-3 sm:-top-5 -right-4 sm:-right-6 text-2xl sm:text-4xl text-amber-300 drop-shadow-[0_0_12px_#fbbf24]"
                >
                  ✦
                </motion.span>
              </motion.h1>

              {/* Graffiti Drip Lines (Efek Cat Meleleh / Drip) */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-start gap-8 pointer-events-none">
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 26, opacity: 0.85 }}
                  transition={{ delay: 0.65, duration: 0.45 }}
                  className="w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                />
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 38, opacity: 0.9 }}
                  transition={{ delay: 0.75, duration: 0.5 }}
                  className="w-2 rounded-full bg-fuchsia-400 shadow-[0_0_10px_#e879f9]"
                />
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 20, opacity: 0.8 }}
                  transition={{ delay: 0.85, duration: 0.4 }}
                  className="w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]"
                />
              </div>

            </div>

            {/* Urban Street Swash / Tag Underline */}
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
              className="w-48 sm:w-72 h-6 mt-1 overflow-visible"
              viewBox="0 0 200 20"
              fill="none"
            >
              <motion.path
                d="M 5,12 Q 50,2 100,10 T 195,8"
                stroke={themeColors.neon}
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  filter: `drop-shadow(0 0 6px ${themeColors.neon})`,
                }}
              />
            </motion.svg>

            {/* Click to Enter Prompt */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="mt-6 flex items-center gap-1.5 text-xs text-zinc-500 font-sans tracking-wide"
            >
              <span>Ketuk layar untuk masuk</span>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
