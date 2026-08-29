import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface PageIntroProps {
  accent: string;
}

export const PageIntro: React.FC<PageIntroProps> = ({ accent }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1150);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="page-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Welcome to the portfolio"
          role="status"
        >
          <div className="page-intro__ambient" />
          <div
            className="page-intro__glow"
            style={{ ['--intro-accent' as string]: `var(--accent-${accent})` }}
          />

          <motion.div
            className="page-intro__content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="page-intro__mark"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={PERSONAL_INFO.avatar} alt="" />
            </motion.div>

            <motion.div
              className="page-intro__welcome"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.5 }}
            >
              A personal portfolio
            </motion.div>

            <motion.div
              className="page-intro__name"
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.5 }}
            >
              {PERSONAL_INFO.name}
            </motion.div>

            <motion.div
              className="page-intro__line"
              initial={{ opacity: 0, scaleX: 0.35 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.34, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <i />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
