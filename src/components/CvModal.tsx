import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Code2, BriefcaseBusiness, GraduationCap, FileText, Mail, MapPin, Github, ExternalLink } from 'lucide-react';
import { ThemeAccent, Language } from '../types';
import { PERSONAL_INFO, SKILLS, EXPERIENCES } from '../data/portfolioData';

interface CvModalProps { isOpen: boolean; onClose: () => void; accent: ThemeAccent; lang: Language; }

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;
  const id = lang === 'id';
  const t = id ? { profile:'Profil', contact:'Kontak', skills:'Keahlian', experience:'Pengalaman', education:'Pendidikan', print:'Cetak / PDF', close:'Tutup', location:'Lokasi', educationName:'System Learning & Web System Developer', educationPlace:'Universitas Surabaya, Jawa Timur, Indonesia', period:'2023 - Sekarang' } : { profile:'Profile', contact:'Contact', skills:'Skills', experience:'Experience', education:'Education', print:'Print / PDF', close:'Close', location:'Location', educationName:'System Learning & Web System Developer', educationPlace:'Universitas Surabaya, East Java, Indonesia', period:'2023 - Present' };

  return <AnimatePresence>
    <div className="cv-overlay fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto" onClick={onClose}>
      <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:12}} transition={{duration:.2}} onClick={e=>e.stopPropagation()} className="cv-paper relative w-full max-w-3xl max-h-[92vh] rounded-2xl shadow-2xl overflow-y-auto">
        <header className="cv-header sticky top-0 z-30 flex items-center justify-between px-5 py-3 border-b backdrop-blur-xl">
          <div className="flex items-center gap-2.5"><FileText className="w-4 h-4"/><span className="text-sm font-semibold">Curriculum Vitae</span></div>
          <div className="flex items-center gap-1.5"><button onClick={()=>window.print()} className="cv-button flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[11px] font-medium cursor-pointer"><Printer className="w-3 h-3"/><span>{t.print}</span></button><button onClick={onClose} className="cv-button p-1.5 rounded-lg border cursor-pointer" aria-label={t.close}><X className="w-4 h-4"/></button></div>
        </header>
        <main className="p-5 sm:p-7 space-y-5">
          <section className="cv-hero-card rounded-xl border p-4 sm:p-5">
            <div className="flex items-center gap-4"><div className="cv-avatar w-16 h-16 rounded-xl overflow-hidden border shrink-0"><img src={PERSONAL_INFO.avatar} alt={PERSONAL_INFO.name} className="w-full h-full object-cover"/></div><div className="min-w-0"><h1 className="text-xl font-bold tracking-tight">{PERSONAL_INFO.name}</h1><p className="text-xs font-medium mt-1">{PERSONAL_INFO.title[lang]}</p><p className="cv-muted text-[11px] mt-1.5 leading-relaxed">{PERSONAL_INFO.bio.philosophy[lang]}</p></div></div>
          </section>
          <section><h3 className="cv-heading mb-2"><Mail/>{t.contact}</h3><div className="cv-contact-line text-[11px] flex flex-wrap gap-x-4 gap-y-1"><span><Mail className="inline w-3 h-3 mr-1"/>{PERSONAL_INFO.email}</span><span><MapPin className="inline w-3 h-3 mr-1"/>{PERSONAL_INFO.location}</span><a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer"><Github className="inline w-3 h-3 mr-1"/>{PERSONAL_INFO.githubHandle}<ExternalLink className="inline w-2.5 h-2.5 ml-0.5"/></a></div></section>
          <section><h3 className="cv-heading mb-2"><Code2/>{t.skills}</h3><div className="flex flex-wrap gap-1.5">{SKILLS.map((s,i)=><span key={`${s.name}-${i}`} className="cv-tag rounded-md px-2 py-1 text-[10px] font-medium">{s.name}</span>)}</div></section>
          <section><h3 className="cv-heading mb-2"><BriefcaseBusiness/>{t.experience}</h3><div className="cv-list">{EXPERIENCES.map(exp=><article key={exp.id} className="cv-row py-3 border-b last:border-b-0"><div className="flex justify-between gap-3"><div><h4 className="text-xs font-bold">{exp.role[lang]}</h4><p className="cv-muted text-[10px] mt-0.5">{exp.company}</p></div><span className="cv-muted text-[10px] font-mono shrink-0">{exp.period}</span></div><p className="text-[11px] leading-5 mt-1.5">{exp.description[lang]}</p><p className="cv-muted text-[9px] mt-1">{exp.techStack.join(' · ')}</p></article>)}</div></section>
          <section><h3 className="cv-heading mb-2"><GraduationCap/>{t.education}</h3><div className="cv-row py-2.5"><div className="flex justify-between gap-3"><div><h4 className="text-xs font-bold">{t.educationName}</h4><p className="cv-muted text-[10px] mt-0.5">{t.educationPlace}</p></div><span className="cv-muted text-[10px] font-mono shrink-0">{t.period}</span></div></div></section>
        </main>
      </motion.div>
    </div>
  </AnimatePresence>;
};
