import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Download, 
  Printer, 
  ExternalLink, 
  Check, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Layers, 
  Mail, 
  Phone, 
  Globe 
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
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id="cv-modal-container"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#0d121c] border border-slate-800 rounded-2xl shadow-2xl overflow-y-auto text-slate-100"
        >
          {/* Top Control Bar */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#090d16]/95 border-b border-slate-800 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm font-['Poppins'] text-white">
                Curriculum Vitae // {PERSONAL_INFO.name}
              </span>
              <span className="text-xs font-mono text-slate-400">PDF Ready</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 transition-colors"
                title="Cetak CV"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cetak</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable CV Content */}
          <div className="p-6 sm:p-10 space-y-8 print:p-0 print:text-black">
            
            {/* CV Header */}
            <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <h1 className="text-3xl font-extrabold font-['Poppins'] text-white">
                  {PERSONAL_INFO.name}
                </h1>
                <p className={`text-sm font-mono mt-1 ${getAccentTextClass()}`}>
                  {PERSONAL_INFO.title[lang]}
                </p>
                <p className="text-xs text-slate-400 mt-2 max-w-xl">
                  {PERSONAL_INFO.bio.philosophy[lang]}
                </p>
              </div>

              <div className="text-xs font-mono text-slate-400 space-y-1 sm:text-right">
                <div>Email: {PERSONAL_INFO.email}</div>
                <div>Lokasi: {PERSONAL_INFO.location}</div>
                <div>Status: {PERSONAL_INFO.availability.label[lang]}</div>
              </div>
            </div>

            {/* Core Competencies */}
            <div className="space-y-3">
              <h3 className="text-sm font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
                <Code className={`w-4 h-4 ${getAccentTextClass()}`} />
                <span>Keahlian & Kemampuan Teknis Inti</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SKILLS.slice(0, 9).map((s, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-200">
                      <span>{s.name}</span>
                      <span className={getAccentTextClass()}>{s.level}%</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{s.description[lang]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience History */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
                <Briefcase className={`w-4 h-4 ${getAccentTextClass()}`} />
                <span>Pengalaman Profesional</span>
              </h3>
              <div className="space-y-4">
                {EXPERIENCES.map((exp) => (
                  <div key={exp.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="font-bold text-white text-sm">{exp.role[lang]} • <span className="text-slate-400 font-normal">{exp.company}</span></div>
                      <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                    </div>
                    <p className="text-xs text-slate-300">{exp.description[lang]}</p>
                    <div className="text-[11px] font-mono text-slate-500">
                      Stack: {exp.techStack.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certs */}
            <div className="space-y-3">
              <h3 className="text-sm font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
                <GraduationCap className={`w-4 h-4 ${getAccentTextClass()}`} />
                <span>Pendidikan & Kredensial</span>
              </h3>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-white">Sarjana Ilmu Komputer / Teknik Informatika</div>
                  <div className="text-slate-400">Universitas Unesa Surabaya / 4.00</div>
                </div>
                <span className="font-mono text-slate-500">2018 - 2022</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
