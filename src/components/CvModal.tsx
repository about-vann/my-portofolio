import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, BriefcaseBusiness, GraduationCap, Mail, MapPin, Github, Loader2 } from 'lucide-react';
import { ThemeAccent, Language } from '../types';
import { PERSONAL_INFO, SKILLS, EXPERIENCES } from '../data/portfolioData';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface CvModalProps { isOpen: boolean; onClose: () => void; accent: ThemeAccent; lang: Language; }

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, lang }) => {
  const cvRef = useRef<HTMLElement>(null);
  const [exporting, setExporting] = useState(false);
  if (!isOpen) return null;
  const id = lang === 'id';
  const t = id
    ? { skills:'Keahlian', experience:'Pengalaman', education:'Pendidikan', print:'Unduh PDF', close:'Tutup', educationName:'System Learning & Web System Developer', educationPlace:'Universitas Surabaya, Jawa Timur, Indonesia', period:'2023 - Sekarang' }
    : { skills:'Skills', experience:'Experience', education:'Education', print:'Download PDF', close:'Close', educationName:'System Learning & Web System Developer', educationPlace:'Universitas Surabaya, East Java, Indonesia', period:'2023 - Present' };

  const exportPdf = async () => {
    if (!cvRef.current || exporting) return;
    setExporting(true);
    try {
      const element = cvRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 794,
      });
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 12;
      const usableWidth = pageWidth - margin * 2;
      const usableHeight = pageHeight - margin * 2;
      const ratio = usableWidth / canvas.width;
      const pageCanvasHeight = Math.floor(usableHeight / ratio);
      let sourceY = 0;
      let page = 0;
      while (sourceY < canvas.height) {
        const sliceHeight = Math.min(pageCanvasHeight, canvas.height - sourceY);
        const slice = document.createElement('canvas');
        slice.width = canvas.width;
        slice.height = sliceHeight;
        const ctx = slice.getContext('2d');
        if (!ctx) throw new Error('Canvas context unavailable');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, slice.width, slice.height);
        ctx.drawImage(canvas, 0, sourceY, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);
        if (page > 0) pdf.addPage();
        pdf.addImage(slice.toDataURL('image/jpeg', 0.95), 'JPEG', margin, margin, usableWidth, sliceHeight * ratio, undefined, 'FAST');
        sourceY += sliceHeight;
        page += 1;
      }
      const safeName = PERSONAL_INFO.name.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'CV';
      pdf.save(`CV-${safeName}.pdf`);
    } catch (error) {
      console.error('Failed to export CV PDF:', error);
    } finally {
      setExporting(false);
    }
  };

  const SectionTitle = ({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) => (
    <div className="cv-section-title"><Icon className="cv-section-title-icon" /><h3>{children}</h3></div>
  );

  return <AnimatePresence>
    <div className="cv-overlay fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto" onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: .2 }} onClick={e => e.stopPropagation()} className="cv-paper relative w-full max-w-3xl max-h-[94vh] overflow-y-auto shadow-2xl">
        <header className="cv-header sticky top-0 z-30 flex items-center justify-between px-5 sm:px-8 py-3 border-b">
          <span className="cv-header-label">CV / {PERSONAL_INFO.name}</span>
          <div className="flex items-center gap-2">
            <button onClick={exportPdf} disabled={exporting} className="cv-button flex items-center gap-2 px-3 py-1.5 rounded-md border text-[10px] font-medium disabled:opacity-60" aria-label={t.print}>
              {exporting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Printer className="w-3 h-3" />} {exporting ? 'PDF...' : t.print}
            </button>
            <button onClick={onClose} className="cv-button p-1.5 rounded-md border" aria-label={t.close}><X className="w-4 h-4" /></button>
          </div>
        </header>

        <main ref={cvRef} className="cv-content cv-pdf-document">
          <section className="cv-profile"><div className="cv-profile-top"><img src={PERSONAL_INFO.avatar} alt={PERSONAL_INFO.name} className="cv-avatar" /><div className="cv-profile-info"><h1>{PERSONAL_INFO.name}</h1><p className="cv-role">{PERSONAL_INFO.title[lang]}</p></div></div><p className="cv-bio">{PERSONAL_INFO.bio.philosophy[lang]}</p></section>
          <section className="cv-contact-grid"><div><Mail /><span>{PERSONAL_INFO.email}</span></div><div><MapPin /><span>{PERSONAL_INFO.location}</span></div><a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer"><Github /><span>{PERSONAL_INFO.githubHandle}</span></a></section>
          <section className="cv-section"><SectionTitle icon={BriefcaseBusiness}>{t.experience}</SectionTitle><div className="cv-experience-list">{EXPERIENCES.map(exp => <article key={exp.id} className="cv-experience-item"><div className="cv-experience-head"><div><h4>{exp.role[lang]}</h4><p>{exp.company}</p></div><span>{exp.period}</span></div><p className="cv-description">{exp.description[lang]}</p><p className="cv-tech">{exp.techStack.join(' · ')}</p></article>)}</div></section>
          <section className="cv-section"><SectionTitle icon={BriefcaseBusiness}>{t.skills}</SectionTitle><div className="cv-skills-list">{SKILLS.map((s, i) => <span key={`${s.name}-${i}`}>{s.name}</span>)}</div></section>
          <section className="cv-section cv-education-section"><SectionTitle icon={GraduationCap}>{t.education}</SectionTitle><div className="cv-education"><div><h4>{t.educationName}</h4><p>{t.educationPlace}</p></div><span>{t.period}</span></div></section>
        </main>
      </motion.div>
    </div>
  </AnimatePresence>;
};
