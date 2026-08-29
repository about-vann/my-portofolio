import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PageIntroProps {
  accent?: string;
  onFinish?: () => void;
}

export const PageIntro: React.FC<PageIntroProps> = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);

  const closeIntro = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    setVisible(false);
    if (onFinish) onFinish();
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const timer = window.setTimeout(() => {
      closeIntro();
    }, 1800);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="masfik-streetwear-intro"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black cursor-pointer select-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          onClick={closeIntro}
          title="Klik untuk langsung masuk"
          role="status"
          aria-label="MasFik Intro Logo"
        >
          {/* Centered Circular Streetwear Badge Emblem */}
          <motion.div
            className="relative flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg
              viewBox="0 0 340 340"
              className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 select-none overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 1. Outer Fine Guide Orbit (Dashed) */}
              <circle
                cx="170"
                cy="170"
                r="136"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />

              {/* 2. Inner Track Ring */}
              <circle
                cx="170"
                cy="170"
                r="118"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="1.5"
              />

              {/* 3. Primary Top Circular Swash Arc (Clean Geometric Symmetrical Arc) */}
              <motion.path
                d="M 68 114 A 118 118 0 0 1 272 114"
                stroke="#FFFFFF"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* 4. Secondary Bottom Smile Arc (Subtle Accent Arc) */}
              <motion.path
                d="M 252 232 A 118 118 0 0 1 88 232"
                stroke="#52525b"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* 5. Minimalist Outer Corner Accents */}
              <motion.circle
                cx="170"
                cy="34"
                r="2.5"
                fill="#ffffff"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              />
              <motion.circle
                cx="170"
                cy="306"
                r="2.5"
                fill="#52525b"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              />

              {/* 6. Main Streetwear Brand Typography: "MasFik" */}
              <g className="select-none">
                {/* Background Shadow Text for Depth */}
                <text
                  x="168"
                  y="186"
                  textAnchor="middle"
                  fontFamily="'Permanent Marker', 'Sedgwick Ave Display', cursive, sans-serif"
                  fontWeight="900"
                  fontSize="62"
                  fill="#000000"
                  letterSpacing="2"
                  transform="rotate(-4 170 180)"
                  opacity="0.5"
                  dx="3"
                  dy="4"
                >
                  MASFIK
                </text>

                {/* Main Foreground Text */}
                <motion.text
                  x="168"
                  y="186"
                  textAnchor="middle"
                  fontFamily="'Permanent Marker', 'Sedgwick Ave Display', cursive, sans-serif"
                  fontWeight="900"
                  fontSize="62"
                  fill="#FFFFFF"
                  letterSpacing="2"
                  transform="rotate(-4 170 180)"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.45 }}
                >
                  MASFI
                  {/* Trailing 'K' in Streetwear Grey */}
                  <tspan
                    fill="#71717a"
                    stroke="#52525b"
                    strokeWidth="1.5"
                    dx="1"
                  >
                    K
                  </tspan>
                </motion.text>
              </g>

              {/* Decorative Subtle Star Badge */}
              <motion.text
                x="264"
                y="95"
                fill="#ffffff"
                fontSize="18"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={{ delay: 0.35, duration: 0.3 }}
              >
                ✦
              </motion.text>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
