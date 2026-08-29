import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Printer, 
  Code, 
  Briefcase, 
  GraduationCap, 
  FileText,
  Phone,
  Mail,
  MapPin,
  User,
  Award
} from 'lucide-react';
import { ThemeAccent, Language } from '../types';
import { PERSONAL_INFO, SKILLS, EXPERIENCES } from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  accent: ThemeAccent;
  lang: Language;
}

export const CvModal: React.FC<CvModalProps> = ({
  isOpen,
  onClose,
  accent,
  lang,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

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

  return (
    <AnimatePresence>
      <div
        id="cv-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id="cv-modal-container"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[90vh] bg-[#0a0a0c] border border-white/10 rounded-2xl shadow-2xl overflow-y-auto text-zinc-100 flex flex-col"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0e0e11]/95 border-b border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <FileText className={`w-4 h-4 ${getAccentTextClass()}`} />
              <h2 className="text-sm font-bold text-white tracking-wide uppercase">
                {lang === 'id' ? 'Curriculum Vitae Pribadi' : 'Personal Curriculum Vitae'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-zinc-200 transition-colors cursor-pointer"
                title="Cetak / Simpan PDF"
              >
                <Printer className="w-3.5 h-3.5 text-zinc-300" />
                <span>{lang === 'id' ? 'Cetak / PDF' : 'Print / PDF'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CV Content Body */}
          <div className="p-6 sm:p-8 space-y-7">
            {/* Identity & Header Profile */}
            <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shadow-lg shrink-0">
                  <img
                    src={PERSONAL_INFO.avatar}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {PERSONAL_INFO.name}
                  </h1>
                  <p className={`text-xs font-mono mt-0.5 ${getAccentTextClass()}`}>
                    {PERSONAL_INFO.title[lang]} • {PERSONAL_INFO.location}
                  </p>
                  <p className="text-xs text-zinc-400 mt-1 max-w-md leading-relaxed">
                    {PERSONAL_INFO.bio.philosophy[lang]}
                  </p>
                </div>
              </div>

              <div className="text-xs font-mono text-zinc-400 space-y-1 sm:text-right w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{PERSONAL_INFO.email}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{PERSONAL_INFO.formattedPhone}</span>
                </div>
              </div>
            </div>

            {/* Technical Skills & Proficiency */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-2">
                <Code className={`w-4 h-4 ${getAccentTextClass()}`} />
                <span>{lang === 'id' ? 'Keahlian & Kemampuan Teknis' : 'Technical Skills'}</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SKILLS.map((s, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1">
                    <div className="flex justify-between text-xs font-bold text-zinc-200">
                      <span>{s.name}</span>
                      <span className={getAccentTextClass()}>{s.level}%</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 line-clamp-1">{s.description[lang]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experiences & Track Record */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-2">
                <Briefcase className={`w-4 h-4 ${getAccentTextClass()}`} />
                <span>{lang === 'id' ? 'Riwayat Pengalaman & Pengembangan' : 'Experience & Development'}</span>
              </h3>
              <div className="space-y-2.5">
                {EXPERIENCES.map((exp) => (
                  <div key={exp.id} className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="font-bold text-white text-xs sm:text-sm">
                        {exp.role[lang]} • <span className="text-zinc-400 font-normal">{exp.company}</span>
                      </div>
                      <span className="text-xs font-mono text-zinc-400">{exp.period}</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">{exp.description[lang]}</p>
                    <div className="text-[11px] font-mono text-zinc-500">
                      Stack: {exp.techStack.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Bio */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-2">
                <GraduationCap className={`w-4 h-4 ${getAccentTextClass()}`} />
                <span>{lang === 'id' ? 'Pendidikan & Profil' : 'Education & Profile'}</span>
              </h3>
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs">
                <div>
                  <div className="font-bold text-white">Full-Stack & Web System Developer</div>
                  <div className="text-zinc-400">Surabaya, Jawa Timur, Indonesia</div>
                </div>
                <span className="font-mono text-zinc-500">2023 - Sekarang</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
