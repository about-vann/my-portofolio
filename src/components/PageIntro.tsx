import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PageIntroProps {
  onComplete?: () => void;
}

export const PageIntro: React.FC<PageIntroProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const word = 'MasPik';

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
      window.setTimeout(() => onComplete?.(), 450);
    }, 2350);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="page-intro fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0c0f] text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          aria-label="MasPik intro"
        >
          <div className="relative flex flex-col items-center justify-center">
            <div className="absolute h-28 w-28 rounded-full border border-white/[0.06]" />
            <div className="absolute h-20 w-20 rounded-full border border-white/[0.04]" />
            <div className="relative overflow-hidden px-1 py-2">
              <motion.div
                className="flex items-center"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.085, delayChildren: 0.15 } } }}
              >
                {word.split('').map((letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    className="font-['Poppins',sans-serif] text-4xl sm:text-5xl font-semibold tracking-[-0.055em]"
                    variants={{
                      hidden: { opacity: 0, y: 18, filter: 'blur(5px)' },
                      show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } },
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>
            </div>
            <motion.div
              className="mt-2 h-px bg-white/50"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 72, opacity: 1 }}
              transition={{ delay: 0.72, duration: 0.45, ease: 'easeOut' }}
            />
            <motion.span
              className="mt-3 text-[9px] font-mono uppercase tracking-[0.35em] text-zinc-500"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.35 }}
            >
              Creative Studio
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
