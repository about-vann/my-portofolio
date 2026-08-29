import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  Check,
  Github,
  MapPin,
  MessageCircle,
  Pause,
  Play,
} from 'lucide-react';
import { ThemeAccent, Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  accent: ThemeAccent;
  lang: Language;
  onDownloadCv: () => void;
}

export const HeroSection: React.FC<HeroProps> = ({ lang }) => {
  const [playing, setPlaying] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const heroBio = PERSONAL_INFO.bio.philosophy[lang];

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  const toggleAudio = () => {
    if (!('speechSynthesis' in window)) return;

    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(heroBio);
    utterance.lang = lang === 'id' ? 'id-ID' : 'en-US';
    utterance.rate = 0.94;
    utterance.pitch = 1;
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);

    speechRef.current = utterance;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setPlaying(true);
  };

  const openWhatsApp = () => {
    window.open(PERSONAL_INFO.whatsapp, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="hero" className="hero-section relative z-10 px-4 sm:px-6 pt-24 pb-14 sm:pt-32 sm:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="hero-profile-card mx-auto w-full max-w-3xl overflow-hidden"
      >
        <div className="hero-cover" style={{ backgroundImage: `url(${PERSONAL_INFO.heroCover})` }}>
          <div className="hero-cover-overlay" />
        </div>

        <div className="hero-profile-body">
          <div className="hero-profile-actions" aria-label="Profile actions">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="hero-icon-button"
              aria-label="GitHub"
              title="GitHub"
            >
              <Github className="h-[18px] w-[18px]" />
            </a>
            <button
              type="button"
              onClick={openWhatsApp}
              className="hero-contact-button"
            >
              <MessageCircle className="h-[18px] w-[18px]" />
              <span>{lang === 'id' ? 'Kontak' : 'Contact'}</span>
            </button>
          </div>

          <div className="hero-avatar-wrap">
            <img
              src={PERSONAL_INFO.avatar}
              alt={PERSONAL_INFO.name}
              className="hero-avatar"
            />
            <span className="hero-verified-avatar" aria-hidden="true">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
          </div>

          <div className="hero-profile-content">
            <div className="hero-name-row">
              <h1>{PERSONAL_INFO.name}</h1>
              <span className="hero-verified" aria-label="Verified">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
            </div>

            <p className="hero-handle">
              {PERSONAL_INFO.githubHandle} <span>·</span> {PERSONAL_INFO.title[lang]}
            </p>

            <div className="hero-meta-row">
              <span className="hero-meta-item">
                <MapPin className="h-4 w-4" />
                {PERSONAL_INFO.location}
              </span>
              <span className="hero-meta-dot">·</span>
              <button
                type="button"
                onClick={toggleAudio}
                className={`hero-audio-button ${playing ? 'is-playing' : ''}`}
                aria-pressed={playing}
              >
                {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                <span>{playing ? (lang === 'id' ? 'Berhenti' : 'Stop') : 'Audio Note'}</span>
                <span className="hero-audio-bars" aria-hidden="true">
                  <i /><i /><i /><i />
                </span>
              </button>
            </div>

            <p className="hero-description">{heroBio}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
