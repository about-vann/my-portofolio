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

  return (
    <section id="hero" className="w-full">
      <audio ref={audioRef} src={musicUrl} preload="metadata" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full rounded-2xl bg-[#15161c] border border-white/[0.07] overflow-hidden shadow-xl"
      >
        {/* Cover Photo */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-zinc-900">
          <img
            src={PERSONAL_INFO.heroCover}
            alt="Hero Cover"
            className="w-full h-full object-cover opacity-90 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#15161c]/80 via-transparent to-black/20" />
        </div>

        {/* Profile Card Body */}
        <div className="px-5 pb-5 pt-0">
          {/* Avatar & Action Row */}
          <div className="flex items-end justify-between -mt-12 sm:-mt-14 mb-3.5">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#15161c] bg-[#1d1f27] overflow-hidden shadow-2xl">
                <img
                  src={PERSONAL_INFO.avatar}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Actions: GitHub & Dokumen CV */}
            <div className="flex items-center gap-2 pb-1">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1f2028] hover:bg-[#282a35] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
                title="GitHub"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onDownloadCv}
                className="h-9 px-3.5 rounded-xl bg-[#1f2028] hover:bg-[#282a35] border border-white/10 flex items-center gap-2 text-xs font-medium text-zinc-200 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>{lang === 'id' ? 'Dokumen CV' : 'CV Document'}</span>
              </button>
            </div>
          </div>

          {/* Name & Title */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {PERSONAL_INFO.name}
              </h1>
              {/* Blue Verified Badge */}
              <div 
                className="w-4 h-4 rounded-full bg-[#0084ff] flex items-center justify-center text-white shadow-sm"
                title="Verified Developer"
              >
                <Check className="w-2.5 h-2.5 stroke-[3.5]" />
              </div>
            </div>

            <p className="text-xs text-zinc-400 font-mono tracking-tight flex items-center gap-1.5">
              <span>{PERSONAL_INFO.githubHandle}</span>
              <span className="text-zinc-600">•</span>
              <span>{PERSONAL_INFO.title[lang]}</span>
            </p>

            {/* Location & Audio Note */}
            <div className="flex items-center gap-3 pt-1 text-xs text-zinc-400">
              <div className="flex items-center gap-1 text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                <span>{PERSONAL_INFO.location}</span>
              </div>

              <span className="text-zinc-600">•</span>

              <button
                type="button"
                onClick={toggleAudio}
                className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] px-2.5 py-0.5 rounded-full border border-white/[0.08] transition-all cursor-pointer select-none"
              >
                {playing ? (
                  <Pause className="w-3 h-3 text-cyan-400" />
                ) : (
                  <Play className="w-3 h-3 fill-current text-cyan-400" />
                )}
                <span>Audio Note</span>
                {playing && (
                  <div className="flex items-end gap-0.5 h-3 ml-0.5">
                    <span className="w-0.5 bg-cyan-400 rounded-full eq-bar-1" />
                    <span className="w-0.5 bg-cyan-400 rounded-full eq-bar-2" />
                    <span className="w-0.5 bg-cyan-400 rounded-full eq-bar-3" />
                  </div>
                )}
              </button>
            </div>

            {/* Bio Description */}
            <p className="pt-2 text-xs sm:text-[13px] leading-relaxed text-zinc-300 font-normal">
              {heroBio}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
