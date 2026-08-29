import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ThemeAccent, Language, ColorMode, BackgroundMode } from './types';
import { InteractiveCanvasBackground } from './components/InteractiveCanvasBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { DinoGameSection } from './components/DinoGameSection';
import { ContactSection } from './components/ContactSection';
import { ArticlesSection } from './components/ArticlesSection';
import { CvModal } from './components/CvModal';
import { PageIntro } from './components/PageIntro';
import { ScrollProgress } from './components/ScrollProgress';

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

  const [bgMode] = useState<BackgroundMode>('off');

  const [isCvOpen, setIsCvOpen] = useState(false);

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const resetScroll = () => window.scrollTo(0, 0);
    resetScroll();
    window.requestAnimationFrame(resetScroll);
    window.addEventListener('pageshow', resetScroll);

    return () => window.removeEventListener('pageshow', resetScroll);
  }, []);

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
    <div className={`relative min-h-screen ${colorMode === 'light' ? 'bg-[#f4f4f6] text-zinc-900' : 'bg-[#050505] text-white'} font-['Poppins',sans-serif] selection:bg-white/20 selection:text-white overflow-x-hidden transition-colors duration-300`}>
      <PageIntro accent={accent} />
      <ScrollProgress accent={accent} />
      
      {/* Interactive Background Canvas */}
      <InteractiveCanvasBackground accent={accent} bgMode={bgMode} />

      {/* Floating Glass Navigation */}
      <Navbar
        accent={accent}
        setAccent={setAccent}
        lang={lang}
        setLang={setLang}
        colorMode={colorMode}
        setColorMode={setColorMode}
      />

      {/* Main Single-View Scroll Sections */}
      <main className="relative z-10">
        <HeroSection
          accent={accent}
          lang={lang}
          onDownloadCv={() => setIsCvOpen(true)}
        />

        <AboutSection
          accent={accent}
          lang={lang}
        />

        <SkillsSection
          accent={accent}
          lang={lang}
        />

        <ProjectsSection
          accent={accent}
          lang={lang}
        />

        <ExperienceTimeline
          accent={accent}
          lang={lang}
        />

        {/* Authentic Chrome T-Rex Dino Game */}
        <DinoGameSection
          accent={accent}
          lang={lang}
        />

        <ContactSection
          accent={accent}
          lang={lang}
        />

        {/* Latest Articles At The Bottom */}
        <ArticlesSection
          accent={accent}
          lang={lang}
          colorMode={colorMode}
        />
      </main>

      {/* CV Modal */}
      <CvModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        accent={accent}
        lang={lang}
      />
    </div>
  );
}
