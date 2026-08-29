import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MoreHorizontal, 
  FileText, 
  Share2, 
  Globe, 
  Github, 
  Send, 
  Check, 
  ExternalLink
} from 'lucide-react';
import { ThemeAccent, Language, ColorMode } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  accent: ThemeAccent;
  setAccent: (accent: ThemeAccent) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  onDownloadCv?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  colorMode,
  setColorMode,
  onDownloadCv,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isDark = colorMode === 'dark';

  const toggleTheme = () => {
    setColorMode(isDark ? 'light' : 'dark');
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header 
      id="main-navbar-header"
      className="sticky top-0 left-0 right-0 z-40 w-full px-4 sm:px-6 pt-4 pb-3 max-w-xl mx-auto flex items-center justify-between transition-colors duration-300"
    >
      {/* Brand Title */}
      <div className="flex items-center gap-2">
        <span className="text-base sm:text-lg font-semibold tracking-tight text-white dark:text-white light-mode:text-zinc-900 font-['Poppins',sans-serif]">
          {PERSONAL_INFO.brandName || 'Ignmasvikk Creative'}
        </span>
      </div>

      {/* Right Controls: Dark Switch + Three Dots */}
      <div className="flex items-center gap-3 relative" ref={menuRef}>
        {/* Toggle Switch with Dark Label */}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center gap-2 text-xs font-medium text-zinc-300 hover:text-white cursor-pointer select-none transition-colors"
          aria-label="Toggle dark mode"
        >
          <span className="text-zinc-300 dark:text-zinc-300 light-mode:text-zinc-700 text-xs sm:text-sm font-normal">
            {isDark ? 'Dark' : 'Light'}
          </span>

          {/* iOS-Style Toggle Pill */}
          <div 
            className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out relative flex items-center ${
              isDark ? 'bg-zinc-700' : 'bg-zinc-400'
            }`}
          >
            <div 
              className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
                isDark ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </div>
        </button>

        {/* Three Dots Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <MoreHorizontal className="w-5 h-5 text-zinc-300" />
        </button>

        {/* Dropdown Popup Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-10 w-52 rounded-2xl bg-[#181920] border border-white/10 shadow-2xl p-2 z-50 overflow-hidden"
            >
              <div className="space-y-1">
                {onDownloadCv && (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onDownloadCv();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-200 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span>{lang === 'id' ? 'Lihat Dokumen CV' : 'Open CV Document'}</span>
                  </button>
                )}

                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-200 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left cursor-pointer"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Share2 className="w-4 h-4 text-zinc-400" />
                  )}
                  <span>{copied ? (lang === 'id' ? 'Link Disalin!' : 'Link Copied!') : (lang === 'id' ? 'Salin Link Portofolio' : 'Copy Portfolio Link')}</span>
                </button>

                <button
                  onClick={() => {
                    setLang(lang === 'id' ? 'en' : 'id');
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-200 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left cursor-pointer"
                >
                  <Globe className="w-4 h-4 text-zinc-400" />
                  <span>{lang === 'id' ? 'Bahasa: ID (Ganti ke EN)' : 'Language: EN (Switch to ID)'}</span>
                </button>

                <div className="h-px bg-white/5 my-1" />

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-zinc-400" />
                    <span>GitHub Profile</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>

                <a
                  href={PERSONAL_INFO.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Send className="w-4 h-4 text-cyan-400" />
                    <span>Telegram Chat</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
