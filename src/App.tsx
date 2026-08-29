import React, { useState, useEffect } from 'react';
import { ThemeAccent, Language, ColorMode } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { ArticlesSection } from './components/ArticlesSection';
import { CvModal } from './components/CvModal';
import { PERSONAL_INFO } from './data/portfolioData';

export default function App() {
  const [accent, setAccent] = useState<ThemeAccent>(() => {
    const saved = localStorage.getItem('portfolio_theme_accent');
    if (saved && ['cyan', 'violet', 'emerald', 'amber'].includes(saved)) {
      return saved as ThemeAccent;
    }
    return 'cyan';
  });

  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    if (saved && ['id', 'en'].includes(saved)) {
      return saved as Language;
    }
    return 'id';
  });

  const [colorMode, setColorMode] = useState<ColorMode>(() => {
    const saved = localStorage.getItem('portfolio_color_mode');
    if (saved && ['dark', 'light'].includes(saved)) {
      return saved as ColorMode;
    }
    return 'dark';
  });

  const [isCvOpen, setIsCvOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('portfolio_theme_accent', accent);
  }, [accent]);

  useEffect(() => {
    localStorage.setItem('portfolio_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('portfolio_color_mode', colorMode);
    if (colorMode === 'light') {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.classList.add('dark');
    }
  }, [colorMode]);

  return (
    <div className={`min-h-screen ${colorMode === 'light' ? 'bg-[#f0f2f5] text-zinc-900' : 'bg-[#0e0f14] text-zinc-100'} font-['Poppins',sans-serif] selection:bg-white/20 selection:text-white transition-colors duration-300 antialiased`}>
      {/* Top Header Navbar */}
      <Navbar
        accent={accent}
        setAccent={setAccent}
        lang={lang}
        setLang={setLang}
        colorMode={colorMode}
        setColorMode={setColorMode}
        onDownloadCv={() => setIsCvOpen(true)}
      />

      {/* Main Single-Column Feed Layout matching video */}
      <main className="max-w-xl mx-auto px-4 pb-12 space-y-4">
        {/* Profile Card / Hero */}
        <HeroSection
          accent={accent}
          lang={lang}
          onDownloadCv={() => setIsCvOpen(true)}
        />

        {/* About Card */}
        <AboutSection
          accent={accent}
          lang={lang}
        />

        {/* Featured Projects Card */}
        <ProjectsSection
          accent={accent}
          lang={lang}
        />

        {/* Connects Card (Direct Channels) */}
        <ContactSection
          accent={accent}
          lang={lang}
        />

        {/* Latest Articles Card */}
        <ArticlesSection
          accent={accent}
          lang={lang}
          colorMode={colorMode}
        />

        {/* Footer */}
        <footer className="text-center pt-4 pb-8 text-xs text-zinc-500 font-mono">
          <p>© 2026 {PERSONAL_INFO.brandName || 'Ignmasvikk Creative'} • {PERSONAL_INFO.name}</p>
        </footer>
      </main>

      {/* CV Document Modal */}
      <CvModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        lang={lang}
        accent={accent}
      />
    </div>
  );
}
