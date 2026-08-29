import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Code, Briefcase, GraduationCap, FileText, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { ThemeAccent, Language } from '../types';
import { PERSONAL_INFO, SKILLS, EXPERIENCES } from '../data/portfolioData';

interface CvModalProps { isOpen: boolean; onClose: () => void; accent: ThemeAccent; lang: Language; }

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, accent, lang }) => {
  if (!isOpen) return null;
  const id = lang === 'id';
  const accentText = accent === 'violet' ? 'text-purple-600' : accent === 'emerald' ? 'text-emerald-600' : accent === 'amber' ? 'text-amber-600' : 'text-cyan-600';
  const accentBg = accent === 'violet' ? 'bg-purple-600' : accent === 'emerald' ? 'bg-emerald-600' : accent === 'amber' ? 'bg-amber-600' : 'bg-cyan-600';

  return <AnimatePresence><div id="cv-modal-overlay" className="cv-overlay fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto" onClick={onClose}>
    <motion.div id="cv-modal-container" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }} transition={{ duration: .25 }} onClick={e => e.stopPropagation()} className="cv-paper relative w-full max-w-3xl max-h-[92vh] rounded-[24px] shadow-2xl overflow-y-auto">
      <div className="cv-header sticky top-0 z-20 flex items-center justify-between px-5 sm:px-7 py-4 border-b backdrop-blur-xl">
        <div className="flex items-center gap-3"><div className={`w-9 h-9 rounded-xl ${accentBg} text-white flex items-center justify-center shadow-sm`}><FileText className="w-4 h-4" /></div><div><p className="text-[10px] font-semibold uppercase tracking-[.18em] cv-muted">{id ? 'Dokumen' : 'Document'}</p><h2 className="text-sm font-bold tracking-tight">Curriculum Vitae</h2></div></div>
        <div className="flex items-center gap-2"><button onClick={() => window.print()} className="cv-button hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium cursor-pointer"><Printer className="w-3.5 h-3.5" /><span>{id ? 'Cetak / PDF' : 'Print / PDF'}</span></button><button onClick={onClose} className="cv-button p-2 rounded-xl border cursor-pointer" aria-label={id ? 'Tutup CV' : 'Close CV'}><X className="w-4 h-4" /></button></div>
      </div>
      <div className="p-5 sm:p-8 space-y-7">
        <section className="cv-intro rounded-2xl border p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border shrink-0 shadow-sm"><img src={PERSONAL_INFO.avatar} alt={PERSONAL_INFO.name} className="w-full h-full object-cover" /></div>
            <div className="min-w-0 flex-1"><div className="flex items-center gap-2"><h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">{PERSONAL_INFO.name}</h1><span className={`w-2 h-2 rounded-full ${accentBg}`} /></div><p className={`text-xs font-medium mt-1 ${accentText}`}>{PERSONAL_INFO.title[lang]}</p><p className="cv-muted text-xs mt-2 max-w-xl leading-relaxed">{PERSONAL_INFO.bio.philosophy[lang]}</p></div>
          </div>
          <div className="cv-contact-grid mt-5 pt-4 border-t grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="cv-contact-item flex items-center gap-2 rounded-xl px-3 py-2.5"><Mail className="w-3.5 h-3.5 shrink-0" /><span className="truncate">{PERSONAL_INFO.email}</span></div>
            <div className="cv-contact-item flex items-center gap-2 rounded-xl px-3 py-2.5"><MapPin className="w-3.5 h-3.5 shrink-0" /><span>{PERSONAL_INFO.location}</span></div>
            <div className="cv-contact-item flex items-center gap-2 rounded-xl px-3 py-2.5"><Phone className="w-3.5 h-3.5 shrink-0" /><span>{PERSONAL_INFO.formattedPhone}</span></div>
          </div>
        </section>

        <section className="space-y-3"><h3 className="cv-heading"><Code className={accentText} />{id ? 'Keahlian' : 'Skills'}</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">{SKILLS.map((s,i)=><div key={i} className="cv-subcard p-3.5 rounded-2xl border"><div className="flex items-center justify-between gap-3"><span className="text-xs font-bold">{s.name}</span><span className={`text-[11px] font-semibold ${accentText}`}>{s.level}%</span></div><p className="cv-muted text-[11px] mt-1.5 leading-relaxed">{s.description[lang]}</p></div>)}</div></section>

        <section className="space-y-3"><h3 className="cv-heading"><Briefcase className={accentText} />{id ? 'Pengalaman' : 'Experience'}</h3><div className="space-y-3">{EXPERIENCES.map(exp=><div key={exp.id} className="cv-subcard p-4 rounded-2xl border"><div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5"><div><div className="font-bold text-sm">{exp.role[lang]}</div><div className="cv-muted text-xs mt-0.5">{exp.company}</div></div><span className="cv-date text-[11px] font-medium rounded-full px-2.5 py-1 shrink-0">{exp.period}</span></div><p className="text-xs leading-relaxed mt-3">{exp.description[lang]}</p><div className="cv-muted text-[11px] mt-2.5"><span className="font-medium">{id ? 'Teknologi' : 'Stack'}:</span> {exp.techStack.join(' · ')}</div></div>)}</div></section>

        <section className="space-y-3"><h3 className="cv-heading"><GraduationCap className={accentText} />{id ? 'Pendidikan' : 'Education'}</h3><div className="cv-subcard p-4 rounded-2xl border flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs"><div><div className="font-bold">System Learning & Web System Developer</div><div className="cv-muted mt-0.5">Universitas Surabaya, Jawa Timur, Indonesia</div></div><span className="cv-date text-[11px] font-medium rounded-full px-2.5 py-1">2023 - Sekarang</span></div></section>

        <div className="cv-footer flex items-center justify-between pt-1"><span className="cv-muted text-[10px] uppercase tracking-wider">{id ? 'Portofolio pribadi' : 'Personal portfolio'}</span><button onClick={() => window.print()} className={`sm:hidden flex items-center gap-1.5 text-xs font-semibold ${accentText}`}>{id ? 'Cetak / PDF' : 'Print / PDF'} <ArrowUpRight className="w-3.5 h-3.5" /></button></div>
      </div>
    </motion.div>
  </div></AnimatePresence>;
};
