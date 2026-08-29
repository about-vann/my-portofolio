import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MoreHorizontal, FileText, UserRound, LayoutGrid, MessageCircle, Newspaper, Home } from 'lucide-react';
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

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang, colorMode, setColorMode, onDownloadCv }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isDark = colorMode === 'dark';
  const id = lang === 'id';

  const toggleTheme = () => setColorMode(isDark ? 'light' : 'dark');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const goTo = (target: string) => {
    setMenuOpen(false);
    requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const menuItems = [
    { id: 'home', label: id ? 'Beranda' : 'Home', icon: Home },
    { id: 'about', label: id ? 'Tentang' : 'About', icon: UserRound },
    { id: 'projects', label: id ? 'Proyek' : 'Projects', icon: LayoutGrid },
    { id: 'contact', label: id ? 'Kontak' : 'Contact', icon: MessageCircle },
    { id: 'articles', label: id ? 'Artikel' : 'Articles', icon: Newspaper },
  ];

  return (
    <header id="main-navbar-header" className="sticky top-0 left-0 right-0 z-40 w-full px-4 sm:px-6 pt-3 pb-3 max-w-xl mx-auto transition-colors duration-300">
      <div className="nav-glass-card flex items-center justify-between rounded-xl border px-3.5 py-2.5 shadow-sm transition-colors duration-300">
        <button type="button" onClick={() => goTo('home')} className="flex items-center gap-2 min-w-0 cursor-pointer" aria-label={id ? 'Kembali ke beranda' : 'Back to home'}>
          <span className="text-sm sm:text-base font-semibold tracking-tight text-white light-text font-['Poppins',sans-serif] truncate">
            {PERSONAL_INFO.brandName || 'Ignmasvikk Creative'}
          </span>
        </button>

        <div className="flex items-center gap-2.5 relative" ref={menuRef}>
          <button type="button" onClick={toggleTheme} className="flex items-center gap-2 text-xs font-medium text-zinc-300 light-muted hover:text-white light-hover-dark cursor-pointer select-none transition-colors" aria-label={id ? 'Ganti tema terang dan gelap' : 'Toggle light and dark theme'}>
            <span className="text-xs sm:text-sm font-normal">{isDark ? (id ? 'Gelap' : 'Dark') : (id ? 'Terang' : 'Light')}</span>
            <div className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out relative flex items-center ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`}>
              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${isDark ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
          </button>

          <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="p-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 light-hover-bg transition-colors cursor-pointer" aria-label={id ? 'Buka navigasi website' : 'Open website navigation'}>
            <MoreHorizontal className="w-5 h-5" />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 8 }} transition={{ duration: 0.15 }} className="nav-dropdown absolute right-0 top-11 w-52 rounded-2xl border shadow-2xl p-2 z-50 overflow-hidden">
                <div className="space-y-1">
                  {menuItems.map(({ id: target, label, icon: Icon }) => (
                    <button key={target} type="button" onClick={() => goTo(target)} className="nav-item w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium rounded-xl transition-colors text-left cursor-pointer">
                      <Icon className="w-4 h-4 text-zinc-400" />
                      <span>{label}</span>
                    </button>
                  ))}
                  {onDownloadCv && (
                    <button type="button" onClick={() => { setMenuOpen(false); onDownloadCv(); }} className="nav-item w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium rounded-xl transition-colors text-left cursor-pointer">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span>{id ? 'Lihat CV' : 'View CV'}</span>
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
