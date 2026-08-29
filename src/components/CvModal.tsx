import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Code, Briefcase, GraduationCap, FileText, Phone, Mail, MapPin } from 'lucide-react';
import { ThemeAccent, Language } from '../types';
import { PERSONAL_INFO, SKILLS, EXPERIENCES } from '../data/portfolioData';

interface CvModalProps { isOpen: boolean; onClose: () => void; accent: ThemeAccent; lang: Language; }

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, accent, lang }) => {
  if (!isOpen) return null;
  const id = lang === 'id';
  const accentText = accent === 'violet' ? 'text-purple-600' : accent === 'emerald' ? 'text-emerald-600' : accent === 'amber' ? 'text-amber-600' : 'text-cyan-600';
  const accentBg = accent === 'violet' ? 'bg-purple-600' : accent === 'emerald' ? 'bg-emerald-600' : accent === 'amber' ? 'bg-amber-600' : 'bg-cyan-600';

  return <AnimatePresence><div id="cv-modal-overlay" className="cv-overlay fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto" onClick={onClose}>
    <motion.div id="cv-modal-container" initial={{ opacity: 0, scale: .95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .95, y: 15 }} transition={{ duration: .25 }} onClick={e => e.stopPropagation()} className="cv-paper relative w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto flex flex-col">
      <div className="cv-header sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b backdrop-blur-md">
        <div className="flex items-center gap-2"><FileText className={`w-4 h-4 ${accentText}`} /><h2 className="text-sm font-bold tracking-wide uppercase">Curriculum Vitae (CV)</h2></div>
        <div className="flex items-center gap-2"><button onClick={() => window.print()} className="cv-button flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer"><Printer className="w-3.5 h-3.5" /><span>{id ? 'Cetak / PDF' : 'Print / PDF'}</span></button><button onClick={onClose} className="cv-button p-1.5 rounded-lg border cursor-pointer"><X className="w-4 h-4" /></button></div>
      </div>
      <div className="p-6 sm:p-8 space-y-7">
        <div className="cv-section-border pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4"><div className="w-16 h-16 rounded-2xl overflow-hidden border shrink-0"><img src={PERSONAL_INFO.avatar} alt={PERSONAL_INFO.name} className="w-full h-full object-cover" /></div><div><h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">{PERSONAL_INFO.name}</h1><p className={`text-xs font-mono mt-0.5 ${accentText}`}>{PERSONAL_INFO.title[lang]} • {PERSONAL_INFO.location}</p><p className="cv-muted text-xs mt-1 max-w-md leading-relaxed">{PERSONAL_INFO.bio.philosophy[lang]}</p></div></div>
          <div className="cv-muted text-xs font-mono space-y-1 sm:text-right w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0"><div className="flex items-center sm:justify-end gap-1.5"><Mail className="w-3.5 h-3.5" />{PERSONAL_INFO.email}</div><div className="flex items-center sm:justify-end gap-1.5"><MapPin className="w-3.5 h-3.5" />{PERSONAL_INFO.location}</div><div className="flex items-center sm:justify-end gap-1.5"><Phone className="w-3.5 h-3.5" />{PERSONAL_INFO.formattedPhone}</div></div>
        </div>
        <div className="space-y-3"><h3 className="cv-muted text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-2"><Code className={`w-4 h-4 ${accentText}`} />{id ? 'Keahlian & Kemampuan Teknis' : 'Technical Skills'}</h3><div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">{SKILLS.map((s,i)=><div key={i} className="cv-subcard p-2.5 rounded-xl border space-y-1"><div className="flex justify-between text-xs font-bold"><span>{s.name}</span><span className={accentText}>{s.level}%</span></div><p className="cv-muted text-[11px] line-clamp-1">{s.description[lang]}</p></div>)}</div></div>
        <div className="space-y-3"><h3 className="cv-muted text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-2"><Briefcase className={`w-4 h-4 ${accentText}`} />{id ? 'Riwayat Pengalaman & Pengembangan' : 'Experience & Development'}</h3><div className="space-y-2.5">{EXPERIENCES.map(exp=><div key={exp.id} className="cv-subcard p-3.5 rounded-xl border space-y-1.5"><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1"><div className="font-bold text-xs sm:text-sm">{exp.role[lang]} • <span className="cv-muted font-normal">{exp.company}</span></div><span className="cv-muted text-xs font-mono">{exp.period}</span></div><p className="text-xs leading-relaxed">{exp.description[lang]}</p><div className="cv-muted text-[11px] font-mono">{id ? 'Teknologi' : 'Stack'}: {exp.techStack.join(', ')}</div></div>)}</div></div>
        <div className="space-y-3"><h3 className="cv-muted text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-2"><GraduationCap className={`w-4 h-4 ${accentText}`} />{id ? 'Pendidikan & Profil' : 'Education & Profile'}</h3><div className="cv-subcard p-3.5 rounded-xl border flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs"><div><div className="font-bold">System Learning & Web System Developer</div><div className="cv-muted">Universitas Surabaya, Jawa Timur, Indonesia</div></div><span className="cv-muted font-mono">2023 - Sekarang</span></div></div>
      </div>
    </motion.div>
  </div></AnimatePresence>;
};
