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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090b] cursor-pointer select-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          onClick={closeIntro}
          title="Klik untuk langsung masuk"
          role="status"
          aria-label="MasFik Intro Logo"
        >
          {/* Subtle dark vignette backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

          {/* Centered Circular Streetwear Badge Emblem (Mirip Referensi NEOXR) */}
          <motion.div
            className="relative flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg
              viewBox="0 0 340 340"
              className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 select-none overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 1. Top Curved Swash Stroke (Goresan Lengkung Atas Putih) */}
              <motion.path
                d="M 100 96 C 122 52, 210 44, 252 74 C 274 89, 282 110, 278 126"
                stroke="#FFFFFF"
                strokeWidth="11"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
              />

              {/* 2. Top-Left Floating Accent Stroke (Coretan Aksen Kiri Atas) */}
              <motion.path
                d="M 76 128 L 94 108"
                stroke="#FFFFFF"
                strokeWidth="9"
                strokeLinecap="round"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.12, duration: 0.35 }}
              />

              {/* 3. Bottom Curved Smile Arc (Lengkungan Bawah Warna Abu-Abu Gelap Streetwear) */}
              <motion.path
                d="M 120 238 C 152 264, 204 262, 236 236"
                stroke="#52525b"
                strokeWidth="9"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.85 }}
                transition={{ delay: 0.18, duration: 0.55, ease: 'easeOut' }}
              />

              {/* 4. Main Streetwear Brand Typography: "MasFik" */}
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
                  {/* Trailing 'K' in Streetwear Grey / Outline Style (seperti huruf 'R' pada contoh) */}
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
