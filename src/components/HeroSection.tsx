import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  Check,
  Github,
  MapPin,
  FileText,
  Pause,
  Play,
} from 'lucide-react';
import { ThemeAccent, Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import musicUrl from '../assets/audio/AUD-20260724-WA0417.mp3';

interface HeroProps {
  accent: ThemeAccent;
  lang: Language;
  onDownloadCv: () => void;
}

export const HeroSection: React.FC<HeroProps> = ({ lang, onDownloadCv }) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const heroBio = PERSONAL_INFO.bio.philosophy[lang];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setPlaying(false);
    const handlePause = () => setPlaying(false);
    const handlePlay = () => setPlaying(true);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
    };
  }, []);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch {
      setPlaying(false);
    }
  };

  const openWhatsApp = () => {
    window.open(PERSONAL_INFO.whatsapp, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="hero" className="hero-section relative z-10 px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
      <audio ref={audioRef} src={musicUrl} preload="metadata" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="hero-profile-card mx-auto w-full max-w-4xl overflow-hidden"
      >
        <div
          className="hero-cover"
          style={{ backgroundImage: `url(${PERSONAL_INFO.heroCover})` }}
        >
          <div className="hero-cover-overlay" />
          <div className="hero-cover-glow" />
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
              onClick={onDownloadCv}
              className="hero-contact-button cursor-pointer flex items-center gap-2"
              title={lang === 'id' ? 'My Simple CV' : 'My Simple CV'}
            >
              <FileText className="h-[17px] w-[17px]" />
              <span>{lang === 'id' ? 'Dokumen' : 'Document'}</span>
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
              {PERSONAL_INFO.githubHandle}
              <span>·</span>
              {PERSONAL_INFO.title[lang]}
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
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? (
                  <Pause className="h-3.5 w-3.5" />
                ) : (
                  <Play className="h-3.5 w-3.5 fill-current" />
                )}

                <span>
                  {playing
                    ? lang === 'id'
                      ? 'Pause'
                      : 'Pause'
                    : lang === 'id'
                      ? 'Putar musik'
                      : 'Play music'}
                </span>

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
