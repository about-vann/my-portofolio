import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  Cpu, 
  Calendar,
  Sparkles,
  Zap
} from 'lucide-react';
import { Project, ThemeAccent, Language } from '../types';

interface ModalProps {
  project: Project | null;
  onClose: () => void;
  accent: ThemeAccent;
  lang: Language;
}

export const ProjectDetailModal: React.FC<ModalProps> = ({
  project,
  onClose,
  accent,
  lang,
}) => {
  if (!project) return null;

  const getAccentTextClass = () => {
    switch (accent) {
      case 'violet': return 'text-purple-400';
      case 'emerald': return 'text-emerald-400';
      case 'amber': return 'text-amber-400';
      default: return 'text-cyan-400';
    }
  };

  const getAccentBgClass = () => {
    switch (accent) {
      case 'violet': return 'bg-purple-500';
      case 'emerald': return 'bg-emerald-500';
      case 'amber': return 'bg-amber-500';
      default: return 'bg-cyan-500';
    }
  };

  const getAccentBorderClass = () => {
    switch (accent) {
      case 'violet': return 'border-purple-500/30';
      case 'emerald': return 'border-emerald-500/30';
      case 'amber': return 'border-amber-500/30';
      default: return 'border-cyan-500/30';
    }
  };

  return (
    <AnimatePresence>
      <div 
        id="project-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id="project-modal-card"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[90vh] bg-[#080808] border border-white/10 rounded-sm shadow-2xl overflow-y-auto"
        >
          {/* Header Media Banner */}
          <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-black">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
            
            {/* Close Button */}
            <button
              id="close-modal-btn"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-sm bg-black/80 hover:bg-black border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Project Modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Badges on Banner */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-[9px] font-mono font-semibold uppercase tracking-wider rounded-sm bg-black/90 border border-white/10 text-white">
                  {project.categoryLabel[lang]}
                </span>
                <span className="flex items-center gap-1 px-2.5 py-1 text-[9px] font-mono rounded-sm bg-black/80 border border-white/10 text-zinc-400">
                  <Calendar className="w-3 h-3" />
                  <span>{project.year}</span>
                </span>
              </div>

              {project.metrics && (
                <div className="flex gap-2">
                  {project.metrics.map((m, i) => (
                    <div key={i} className="px-2.5 py-1 rounded-sm bg-black/90 border border-white/10 text-[9px] font-mono">
                      <span className="text-zinc-500 uppercase">{m.label[lang]}: </span>
                      <span className="font-bold text-white">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Modal Body Content */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Title and Short Summary */}
            <div className="space-y-2">
              <h3 className="text-2xl font-light text-white font-['Poppins']">
                {project.title}
              </h3>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light">
                {project.description[lang]}
              </p>
            </div>

            {/* Architecture Deep Dive */}
            {project.architecture && (
              <div className="p-5 rounded-sm bg-[#050505] border border-white/5 space-y-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-zinc-300" />
                  <h4 className="text-xs font-semibold text-white font-mono uppercase tracking-[0.2em]">
                    {lang === 'id' ? 'Spesifikasi & Arsitektur Sistem' : 'System Architecture & Specs'}
                  </h4>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-mono text-zinc-400 block mb-1 uppercase tracking-wider text-[10px]">
                      {lang === 'id' ? 'Gambaran Arsitektur:' : 'Architecture Overview:'}
                    </span>
                    <p className="text-zinc-300 leading-relaxed font-light">
                      {project.architecture.overview[lang]}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-3 rounded-sm bg-[#080808] border border-white/5 space-y-1">
                      <div className="flex items-center gap-1.5 text-zinc-300 font-mono text-[10px] uppercase tracking-wider">
                        <AlertCircle className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{lang === 'id' ? 'Tantangan Teknis' : 'Technical Challenge'}</span>
                      </div>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        {project.architecture.challenges[lang]}
                      </p>
                    </div>

                    <div className="p-3 rounded-sm bg-[#080808] border border-white/5 space-y-1">
                      <div className="flex items-center gap-1.5 text-white font-mono text-[10px] uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-300" />
                        <span>{lang === 'id' ? 'Solusi Terapan' : 'Engineered Solution'}</span>
                      </div>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        {project.architecture.solutions[lang]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tech Stack Pills */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                {lang === 'id' ? 'Teknologi & Modul Terpasang' : 'Stack & Dependencies'}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-sm bg-[#050505] border border-white/5 text-[10px] font-mono text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Action Links */}
            <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    id="modal-live-preview-link"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-sm text-[10px] uppercase tracking-[0.2em] font-bold bg-white text-black hover:bg-zinc-200 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{lang === 'id' ? 'Buka Live Demo' : 'Launch Demo'}</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    id="modal-github-link"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-sm text-[10px] uppercase tracking-[0.2em] font-mono bg-[#050505] hover:bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>{lang === 'id' ? 'Kode Sumber' : 'Source Code'}</span>
                  </a>
                )}
              </div>

              <button
                id="modal-close-footer-btn"
                onClick={onClose}
                className="px-4 py-2.5 rounded-sm text-[10px] uppercase tracking-[0.2em] font-mono bg-transparent hover:bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                {lang === 'id' ? 'Tutup' : 'Close'}
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
