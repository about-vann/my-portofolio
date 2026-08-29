import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  Github, 
  AlertCircle, 
  CheckCircle2, 
  Cpu, 
  Calendar,
  Share2,
  Check
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
  lang,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!project) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}#project-${project.id}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const isTs = project.techBadge === 'TS';
  const isJs = project.techBadge === 'JS';

  return (
    <AnimatePresence>
      <div 
        id="project-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          id="project-modal-card"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl max-h-[85vh] rounded-2xl bg-[#16171e] border border-white/10 shadow-2xl flex flex-col overflow-hidden text-zinc-100"
        >
          {/* Modal Header (Clean text-only) */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#13141a]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="px-2 py-0.5 rounded bg-white/[0.08] text-white font-medium">
                {project.typeBadge || 'PROJECT'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                <span>{project.year}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                title="Share Project"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Close Project Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body - Pure text and structured technical specs */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-sm leading-relaxed text-zinc-300 font-sans">
            {/* Title & Badge */}
            <div className="flex items-start gap-3.5">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-md shrink-0 ${
                  isTs
                    ? 'bg-[#007acc] text-white font-mono'
                    : isJs
                    ? 'bg-[#f7df1e] text-zinc-950 font-mono'
                    : 'bg-zinc-800 text-zinc-200 font-mono'
                }`}
              >
                {project.techBadge || 'DEV'}
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {project.title}
                </h2>
                <p className="text-xs text-zinc-400 font-mono">
                  {project.categoryLabel[lang]}
                </p>
              </div>
            </div>

            {/* Summary Box */}
            <div className="text-xs text-zinc-300 bg-white/[0.04] p-3.5 rounded-xl border border-white/5 leading-relaxed">
              {project.summary[lang]}
            </div>

            {/* Description */}
            <div className="space-y-1.5 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              <p>{project.description[lang]}</p>
            </div>

            {/* Key Metrics if available */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#1a1b24] border border-white/5 text-xs">
                    <span className="text-zinc-500 block text-[11px] font-mono uppercase mb-0.5">
                      {m.label[lang]}
                    </span>
                    <span className="font-bold text-white text-sm font-mono">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Architecture Details */}
            {project.architecture && (
              <div className="p-4 rounded-xl bg-[#1a1b24] border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-white font-mono uppercase tracking-wider">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{lang === 'id' ? 'Arsitektur & Spesifikasi' : 'Architecture & Specs'}</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <p className="text-zinc-300 leading-relaxed">
                    {project.architecture.overview[lang]}
                  </p>

                  <div className="grid grid-cols-1 gap-2 pt-1">
                    <div className="p-2.5 rounded-lg bg-[#14151c] border border-white/5 space-y-1">
                      <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px]">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{lang === 'id' ? 'Tantangan' : 'Challenge'}</span>
                      </div>
                      <p className="text-zinc-400 text-[11px] leading-relaxed">
                        {project.architecture.challenges[lang]}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#14151c] border border-white/5 space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{lang === 'id' ? 'Solusi' : 'Solution'}</span>
                      </div>
                      <p className="text-zinc-400 text-[11px] leading-relaxed">
                        {project.architecture.solutions[lang]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tech Stack Chips */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                {lang === 'id' ? 'Teknologi Terpasang' : 'Technologies & Modules'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/5 text-[11px] font-mono text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-5 py-3 border-t border-white/10 bg-[#13141a] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-zinc-950 text-xs font-semibold hover:bg-zinc-200 transition-colors cursor-pointer active:scale-95"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Demo</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-zinc-200 text-xs font-medium transition-colors border border-white/10 cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-zinc-300 hover:text-white text-xs font-medium transition-colors border border-white/10 cursor-pointer"
            >
              {lang === 'id' ? 'Tutup' : 'Close'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
