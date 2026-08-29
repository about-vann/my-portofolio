import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ScrollProgressProps {
  accent?: string;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ accent = 'cyan' }) => {
  const [progress, setProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      const calculated = max > 0 ? Math.min(100, Math.max(0, (current / max) * 100)) : 0;
      setProgress(calculated);
      setShowScrollTop(current > 400);
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <>
      {/* Top Multi-layer Glowing Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-black/40">
        <div
          className="h-full transition-transform duration-100 ease-out origin-left relative"
          style={{
            transform: `scaleX(${progress / 100})`,
            background: `linear-gradient(90deg, rgba(255,255,255,0.7), ${accentColor})`,
            boxShadow: `0 0 12px ${accentColor}`,
          }}
        >
          {/* Glowing head pulse */}
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full blur-[1px]"
            style={{ background: '#ffffff', boxShadow: `0 0 8px ${accentColor}` }}
          />
        </div>
      </div>

      {/* Floating Smooth Back to Top Pill */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            aria-label="Kembali ke atas"
            title="Scroll ke atas"
            className="fixed bottom-6 right-6 z-40 p-2.5 rounded-full bg-[#111113]/90 hover:bg-zinc-800 border border-white/10 text-white shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer group"
          >
            <ChevronUp className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
