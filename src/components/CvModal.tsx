import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Code2, BriefcaseBusiness, GraduationCap, FileText, Mail, MapPin, Github, ExternalLink } from 'lucide-react';
import { ThemeAccent, Language } from '../types';
import { PERSONAL_INFO, SKILLS, EXPERIENCES } from '../data/portfolioData';

interface CvModalProps { isOpen: boolean; onClose: () => void; accent: ThemeAccent; lang: Language; }

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;
  const id = lang === 'id';
  const t = id ? { contact:'Kontak', skills:'Keahlian', experience:'Pengalaman', education:'Pendidikan', print:'Cetak / PDF', close:'Tutup', educationName:'System Learning & Web System Developer', educationPlace:'Universitas Surabaya, Jawa Timur, Indonesia', period:'2023 - Sekarang' } : { contact:'Contact', skills:'Skills', experience:'Experience', education:'Education', print:'Print / PDF', close:'Close', educationName:'System Learning & Web System Developer', educationPlace:'Universitas Surabaya, East Java, Indonesia', period:'2023 - Present' };

  return <AnimatePresence><div className="cv-overlay fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto" onClick={onClose}>
    <motion.div initial={{opacity:0,scale:.98,y:10}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.98,y:10}} transition={{duration:.22}} onClick={e=>e.stopPropagation()} className="cv-paper relative w-full max-w-3xl max-h-[92vh] rounded-2xl shadow-2xl overflow-y-auto">
      <header className="cv-header sticky top-0 z-30 flex items-center justify-between px-5 sm:px-7 py-3 border-b backdrop-blur-xl"><div className="flex items-center gap-2.5"><FileText className="w-4 h-4"/><span className="text-[11px] font-semibold tracking-wide">CV / {PERSONAL_INFO.name}</span></div><div className="flex items-center gap-1.5"><button onClick={()=>window.print()} className="cv-button flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-medium cursor-pointer"><Printer className="w-3 h-3"/><span>{t.print}</span></button><button onClick={onClose} className="cv-button p-1.5 rounded-lg border cursor-pointer" aria-label={t.close}><X className="w-4 h-4"/></button></div></header>
      <main className="p-5 sm:p-8 space-y-7">
        <section className="cv-hero-card rounded-xl border p-5 sm:p-6"><div className="flex flex-col sm:flex-row sm:items-center gap-5"><div className="cv-avatar w-20 h-20 rounded-2xl overflow-hidden border shrink-0"><img src={PERSONAL_INFO.avatar} alt={PERSONAL_INFO.name} className="w-full h-full object-cover"/></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-bold tracking-tight">{PERSONAL_INFO.name}</h1><span className="cv-tag rounded-full px-2 py-0.5 text-[9px] font-semibold">{PERSONAL_INFO.title[lang]}</span></div><p className="cv-muted text-[11px] mt-2 leading-relaxed max-w-xl">{PERSONAL_INFO.bio.philosophy[lang]}</p></div></div></section>
        <section className="grid sm:grid-cols-[1.35fr_1fr] gap-6"><div><h3 className="cv-heading mb-2"><Mail/>{t.contact}</h3><div className="cv-contact-line space-y-1.5 text-[10px]"><div><Mail className="inline w-3 h-3 mr-1.5"/>{PERSONAL_INFO.email}</div><div><MapPin className="inline w-3 h-3 mr-1.5"/>{PERSONAL_INFO.location}</div><a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer"><Github className="inline w-3 h-3 mr-1.5"/>{PERSONAL_INFO.githubHandle}<ExternalLink className="inline w-2.5 h-2.5 ml-1"/></a></div></div><div><h3 className="cv-heading mb-2"><Code2/>{t.skills}</h3><div className="flex flex-wrap gap-1.5">{SKILLS.map((s,i)=><span key={`${s.name}-${i}`} className="cv-tag rounded-md px-2 py-1 text-[9px] font-medium">{s.name}</span>)}</div></div></section>
        <section><h3 className="cv-heading mb-3"><BriefcaseBusiness/>{t.experience}</h3><div className="cv-list">{EXPERIENCES.map(exp=><article key={exp.id} className="cv-row py-4 border-b last:border-b-0"><div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4"><div><h4 className="text-sm font-bold">{exp.role[lang]}</h4><p className="cv-muted text-[10px] mt-1">{exp.company}</p></div><span className="cv-muted text-[9px] font-mono shrink-0">{exp.period}</span></div><p className="text-[11px] leading-5 mt-2 max-w-2xl">{exp.description[lang]}</p><p className="cv-muted text-[9px] mt-2">{exp.techStack.join(' · ')}</p></article>)}</div></section>
        <section><h3 className="cv-heading mb-3"><GraduationCap/>{t.education}</h3><div className="cv-row py-3 border-b"><div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4"><div><h4 className="text-sm font-bold">{t.educationName}</h4><p className="cv-muted text-[10px] mt-1">{t.educationPlace}</p></div><span className="cv-muted text-[9px] font-mono shrink-0">{t.period}</span></div></div></section>
      </main>
    </motion.div>
  </div></AnimatePresence>;
};
