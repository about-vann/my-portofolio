import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Layers, 
  Briefcase, 
  User, 
  Send, 
  Menu, 
  X, 
  Code2,
  Globe,
  Sun,
  Moon,
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
  accent,
  setAccent,
  lang,
  setLang,
  colorMode,
  setColorMode,
  onDownloadCv,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home', icon: User },
    { id: 'about', label: lang === 'id' ? 'Tentang' : 'About', icon: User },
    { id: 'skills', label: lang === 'id' ? 'Keahlian' : 'Skills', icon: Layers },
    { id: 'projects', label: lang === 'id' ? 'Proyek' : 'Projects', icon: Code2 },
    { id: 'experience', label: lang === 'id' ? 'Pengalaman' : 'Experience', icon: Briefcase },
    { id: 'contact', label: lang === 'id' ? 'Kontak' : 'Contact', icon: Send },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header 
      id="main-navbar-header"
      className="fixed top-0 left-0 right-0 z-50 py-3 px-4 sm:px-6 transition-all duration-300"
    >
      <div className="max-w-3xl mx-auto flex items-center justify-between p-2 sm:p-2.5 rounded-2xl bg-[#111113]/90 backdrop-blur-xl border border-white/10 shadow-lg">
        {/* Brand */}
        <button
          id="navbar-brand-button"
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2.5 px-2 py-1 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div className="w-6 h-6 rounded-lg bg-[#18181b] border border-white/10 flex items-center justify-center overflow-hidden">
            <img src={PERSONAL_INFO.avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <span className="text-xs font-bold text-white tracking-tight">
            {PERSONAL_INFO.name}
          </span>
        </button>

        {/* Desktop Mini Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.slice(1, 6).map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-2.5 py-1 text-xs rounded-xl transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-white/10 text-white font-medium' 
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5">
          {/* Language Switch */}
          <button
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#18181b] hover:bg-zinc-800 border border-white/5 text-zinc-300 text-xs font-mono transition-colors cursor-pointer"
            title="Switch language"
          >
            <Globe className="w-3 h-3 text-zinc-400" />
            <span className="uppercase">{lang}</span>
          </button>

          {/* Theme Dark / Light Switch */}
          <button
            onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}
            className="flex items-center justify-center p-2 rounded-xl bg-[#18181b] hover:bg-zinc-800 border border-white/5 text-zinc-200 hover:text-white text-xs transition-colors cursor-pointer"
            title={colorMode === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
          >
            {colorMode === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
            )}
          </button>

          {/* Connect Button */}
          <button
            onClick={() => scrollToSection('contact')}
            className="flex items-center gap-1 px-3 py-1 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-all cursor-pointer active:scale-95"
          >
            <Send className="w-3 h-3" />
            <span className="hidden sm:inline">{lang === 'id' ? 'Kontak' : 'Contact'}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-xl bg-[#18181b] border border-white/5 text-zinc-300 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-3xl mx-auto mt-2 p-3 rounded-2xl bg-[#111113] border border-white/10 shadow-2xl md:hidden"
          >
            <div className="grid grid-cols-2 gap-1.5">
              {navLinks.map((item) => {
                const IconComp = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-2 p-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                      isActive ? 'bg-white/10 text-white font-medium' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
