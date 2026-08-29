import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Check, Github, MapPin, FileText, Pause, Play } from 'lucide-react';
import { ThemeAccent, Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import musicUrl from '../assets/audio/AUD-20260724-WA0417.mp3';

interface HeroProps { accent: ThemeAccent; lang: Language; onDownloadCv: () => void; }

export const HeroSection: React.FC<HeroProps> = ({ lang, onDownloadCv }) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const id = lang === 'id';
  const heroBio = id
    ? 'Saya suka mengubah ide menjadi pengalaman digital yang sederhana, fungsional, dan terasa personal — dari website hingga hal-hal kecil yang membuatnya lebih hidup.'
    : 'I enjoy turning ideas into digital experiences that feel simple, functional, and personal — from websites to the small details that bring them to life.';
  const title = PERSONAL_INFO.title[lang] || 'Web & Bot Developer';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const ended = () => setPlaying(false); const pause = () => setPlaying(false); const play = () => setPlaying(true);
    audio.addEventListener('ended', ended); audio.addEventListener('pause', pause); audio.addEventListener('play', play);
    return () => { audio.pause(); audio.removeEventListener('ended', ended); audio.removeEventListener('pause', pause); audio.removeEventListener('play', play); };
  }, []);

  const toggleAudio = async () => { const audio = audioRef.current; if (!audio) return; try { if (audio.paused) await audio.play(); else audio.pause(); } catch { setPlaying(false); } };

  return (
    <section id="hero" className="w-full">
      <audio ref={audioRef} src={musicUrl} preload="metadata" />
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, ease: [.16, 1, .3, 1] }} className="w-full rounded-2xl bg-[#15161c] border border-white/[0.07] overflow-hidden shadow-xl">
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-zinc-900">
          <img src={PERSONAL_INFO.heroCover} alt={id ? 'Sampul profil' : 'Hero Cover'} className="w-full h-full object-cover opacity-90 filter brightness-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#15161c]/80 via-transparent to-black/20" />
        </div>
        <div className="px-5 pb-6 pt-0">
          <div className="flex items-end justify-between -mt-12 sm:-mt-14 mb-3.5">
            <div className="relative"><div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#15161c] bg-[#1d1f27] overflow-hidden shadow-2xl"><img src={PERSONAL_INFO.avatar} alt={PERSONAL_INFO.name} className="w-full h-full object-cover" /></div></div>
            <div className="flex items-center gap-2 pb-1">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-[#1f2028] hover:bg-[#282a35] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95" title="GitHub" aria-label="GitHub"><Github className="w-4 h-4" /></a>
              <button type="button" onClick={onDownloadCv} className="h-9 px-3.5 rounded-xl bg-[#1f2028] hover:bg-[#282a35] border border-white/10 flex items-center gap-2 text-xs font-medium text-zinc-200 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"><FileText className="w-3.5 h-3.5 text-cyan-400" /><span>{id ? 'Dokumen CV' : 'CV Document'}</span></button>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2"><h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{PERSONAL_INFO.name}</h1><div className="w-4 h-4 rounded-full bg-[#0084ff] flex items-center justify-center text-white shadow-sm" title={id ? 'Terverifikasi' : 'Verified Developer'}><Check className="w-2.5 h-2.5 stroke-[3.5]" /></div></div>
            <p className="text-xs text-zinc-400 font-mono tracking-tight flex items-center gap-1.5"><span>{PERSONAL_INFO.githubHandle}</span><span className="text-zinc-600">•</span><span>{title}</span></p>
            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs text-zinc-400">
              <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-zinc-500" /><span>{PERSONAL_INFO.location}</span></div>
              <span className="text-zinc-700 hidden sm:inline">•</span>
              <button type="button" onClick={toggleAudio} className={`inline-flex items-center justify-center w-7 h-7 rounded-lg border transition-all cursor-pointer active:scale-95 ${playing ? 'bg-cyan-400/10 border-cyan-400/20' : 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08]'}`} aria-label={playing ? (id ? 'Jeda audio' : 'Pause audio') : (id ? 'Putar audio' : 'Play audio')} title={playing ? (id ? 'Jeda audio' : 'Pause audio') : (id ? 'Putar audio' : 'Play audio')}>
                {playing ? <Pause className="w-3 h-3 text-cyan-400" /> : <Play className="w-3 h-3 text-zinc-300 fill-current" />}
              </button>
            </div>
            <p className="pt-2.5 max-w-2xl text-xs sm:text-[13px] leading-[1.7] text-zinc-300 font-normal">{heroBio}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
