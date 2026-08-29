import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Code2, BriefcaseBusiness, GraduationCap, FileText, Phone, Mail, MapPin, Github, ExternalLink, UserRound } from 'lucide-react';
import { ThemeAccent, Language } from '../types';
import { PERSONAL_INFO, SKILLS, EXPERIENCES } from '../data/portfolioData';

interface CvModalProps { isOpen: boolean; onClose: () => void; accent: ThemeAccent; lang: Language; }

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;
  const id = lang === 'id';
  const t = id ? {
    document:'Dokumen', profile:'Profil', contact:'Kontak', skills:'Keahlian', experience:'Pengalaman', education:'Pendidikan', technology:'Teknologi', print:'Cetak / PDF', close:'Tutup', location:'Lokasi', available:'Terbuka untuk kolaborasi', educationName:'System Learning & Web System Developer', educationPlace:'Universitas Surabaya, Jawa Timur, Indonesia', period:'2023 - Sekarang'
  } : {
    document:'Document', profile:'Profile', contact:'Contact', skills:'Skills', experience:'Experience', education:'Education', technology:'Technology', print:'Print / PDF', close:'Close', location:'Location', available:'Open to collaboration', educationName:'System Learning & Web System Developer', educationPlace:'Universitas Surabaya, East Java, Indonesia', period:'2023 - Present'
  };

  return <AnimatePresence>
    <div className="cv-overlay fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto" onClick={onClose}>
      <motion.div initial={{opacity:0,y:18,scale:.985}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:18,scale:.985}} transition={{duration:.24,ease:[.16,1,.3,1]}} onClick={e=>e.stopPropagation()} className="cv-paper relative w-full max-w-4xl max-h-[92vh] rounded-[24px] shadow-2xl overflow-y-auto">
        <header className="cv-header sticky top-0 z-30 flex items-center justify-between px-5 sm:px-7 py-4 border-b backdrop-blur-xl">
          <div className="flex items-center gap-3"><div className="cv-header-icon"><FileText className="w-4 h-4"/></div><div><p className="text-[10px] uppercase tracking-[.16em] cv-muted">{t.document}</p><h2 className="text-sm font-bold">Curriculum Vitae</h2></div></div>
          <div className="flex items-center gap-2"><button onClick={()=>window.print()} className="cv-button flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium cursor-pointer"><Printer className="w-3.5 h-3.5"/><span className="hidden sm:inline">{t.print}</span></button><button onClick={onClose} className="cv-button p-2 rounded-xl border cursor-pointer" aria-label={t.close}><X className="w-4 h-4"/></button></div>
        </header>

        <main className="p-5 sm:p-8 lg:p-9 space-y-8">
          <section className="cv-hero-card rounded-2xl border p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
              <div className="flex items-start gap-4 min-w-0"><div className="cv-avatar w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border shrink-0"><img src={PERSONAL_INFO.avatar} alt={PERSONAL_INFO.name} className="w-full h-full object-cover"/></div><div className="min-w-0"><div className="flex items-center gap-2 flex-wrap"><h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">{PERSONAL_INFO.name}</h1><span className="cv-status-dot"/></div><p className="text-sm font-semibold mt-1">{PERSONAL_INFO.title[lang]}</p><p className="cv-muted text-xs mt-2 leading-relaxed max-w-xl">{PERSONAL_INFO.bio.philosophy[lang]}</p></div></div>
              <div className="cv-availability shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium">● {t.available}</div>
            </div>
          </section>

          <section className="space-y-3"><h3 className="cv-heading"><UserRound/>{t.profile}</h3><div className="cv-intro rounded-2xl border p-4 sm:p-5"><p className="text-sm leading-7">{PERSONAL_INFO.bio.background[lang]}</p></div></section>

          <section className="space-y-3"><h3 className="cv-heading"><Mail/>{t.contact}</h3><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5"><div className="cv-contact-item rounded-xl border p-3"><Mail className="w-3.5 h-3.5 mb-2"/><span className="block text-[10px] uppercase tracking-wider cv-muted">Email</span><span className="block text-xs mt-0.5 truncate">{PERSONAL_INFO.email}</span></div><div className="cv-contact-item rounded-xl border p-3"><Phone className="w-3.5 h-3.5 mb-2"/><span className="block text-[10px] uppercase tracking-wider cv-muted">Phone</span><span className="block text-xs mt-0.5">{PERSONAL_INFO.formattedPhone}</span></div><div className="cv-contact-item rounded-xl border p-3"><MapPin className="w-3.5 h-3.5 mb-2"/><span className="block text-[10px] uppercase tracking-wider cv-muted">{t.location}</span><span className="block text-xs mt-0.5">{PERSONAL_INFO.location}</span></div><a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="cv-contact-item rounded-xl border p-3 hover:bg-white/[.06] transition-colors"><Github className="w-3.5 h-3.5 mb-2"/><span className="block text-[10px] uppercase tracking-wider cv-muted">GitHub</span><span className="flex items-center gap-1 text-xs mt-0.5">{PERSONAL_INFO.githubHandle}<ExternalLink className="w-3 h-3"/></span></a></div></section>

          <section className="space-y-3"><h3 className="cv-heading"><Code2/>{t.skills}</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">{SKILLS.map((s,i)=><div key={`${s.name}-${i}`} className="cv-subcard rounded-2xl border p-3.5"><div className="flex items-center justify-between gap-3"><span className="text-xs sm:text-sm font-semibold">{s.name}</span><span className="cv-level text-[10px] font-mono px-2 py-1 rounded-full">{s.level}%</span></div><div className="cv-progress mt-2"><span style={{width:`${Math.min(100,s.level)}%`}}/></div><p className="cv-muted text-[11px] leading-relaxed mt-2">{s.description[lang]}</p></div>)}</div></section>

          <section className="space-y-3"><h3 className="cv-heading"><BriefcaseBusiness/>{t.experience}</h3><div className="space-y-2.5">{EXPERIENCES.map(exp=><article key={exp.id} className="cv-subcard rounded-2xl border p-4 sm:p-5"><div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2"><div><h4 className="text-sm font-bold">{exp.role[lang]}</h4><p className="cv-muted text-xs mt-0.5">{exp.company}</p></div><span className="cv-date shrink-0 rounded-full px-2.5 py-1 text-[10px] font-mono">{exp.period}</span></div><p className="text-xs leading-6 mt-3">{exp.description[lang]}</p><div className="flex flex-wrap items-center gap-1.5 mt-3"><span className="cv-muted text-[10px] uppercase tracking-wider mr-1">{t.technology}</span>{exp.techStack.map(x=><span key={x} className="cv-tag rounded-full px-2 py-1 text-[10px] font-medium">{x}</span>)}</div></article>)}</div></section>

          <section className="space-y-3"><h3 className="cv-heading"><GraduationCap/>{t.education}</h3><article className="cv-subcard rounded-2xl border p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"><div><h4 className="text-sm font-bold">{t.educationName}</h4><p className="cv-muted text-xs mt-1">{t.educationPlace}</p></div><span className="cv-date shrink-0 rounded-full px-2.5 py-1 text-[10px] font-mono">{t.period}</span></article></section>

          <footer className="cv-footer pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"><span className="cv-muted text-[10px] font-mono">{PERSONAL_INFO.githubHandle} · Curriculum Vitae</span><span className="cv-muted text-[10px]">{PERSONAL_INFO.location}</span></footer>
        </main>
      </motion.div>
    </div>
  </AnimatePresence>;
};
