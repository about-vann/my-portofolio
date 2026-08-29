import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, BriefcaseBusiness, GraduationCap, Mail, MapPin, Github } from 'lucide-react';
import { ThemeAccent, Language } from '../types';
import { PERSONAL_INFO, SKILLS, EXPERIENCES } from '../data/portfolioData';

interface CvModalProps { isOpen: boolean; onClose: () => void; accent: ThemeAccent; lang: Language; }

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;
  const id = lang === 'id';
  const t = id
    ? { contact:'Kontak', skills:'Keahlian', experience:'Pengalaman', education:'Pendidikan', print:'Cetak / PDF', close:'Tutup', educationName:'System Learning & Web System Developer', educationPlace:'Universitas Surabaya, Jawa Timur, Indonesia', period:'2023 - Sekarang' }
    : { contact:'Contact', skills:'Skills', experience:'Experience', education:'Education', print:'Print / PDF', close:'Close', educationName:'System Learning & Web System Developer', educationPlace:'Universitas Surabaya, East Java, Indonesia', period:'2023 - Present' };

  const SectionTitle = ({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) => (
    <div className="cv-section-title">
      <Icon className="cv-section-title-icon" />
      <h3>{children}</h3>
    </div>
  );

  return <AnimatePresence>
    <div className="cv-overlay fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
        transition={{ duration: .2 }} onClick={e => e.stopPropagation()}
        className="cv-paper relative w-full max-w-3xl max-h-[94vh] overflow-y-auto shadow-2xl"
      >
        <header className="cv-header sticky top-0 z-30 flex items-center justify-between px-5 sm:px-8 py-3 border-b">
          <span className="cv-header-label">CV / {PERSONAL_INFO.name}</span>
          <div className="flex items-center gap-2">
            <button onClick={() => window.print()} className="cv-button flex items-center gap-2 px-3 py-1.5 rounded-md border text-[10px] font-medium" aria-label={t.print}>
              <Printer className="w-3 h-3" /> {t.print}
            </button>
            <button onClick={onClose} className="cv-button p-1.5 rounded-md border" aria-label={t.close}><X className="w-4 h-4" /></button>
          </div>
        </header>

        <main className="cv-content">
          <section className="cv-profile">
            <div className="cv-profile-top">
              <img src={PERSONAL_INFO.avatar} alt={PERSONAL_INFO.name} className="cv-avatar" />
              <div className="cv-profile-info">
                <h1>{PERSONAL_INFO.name}</h1>
                <p className="cv-role">{PERSONAL_INFO.title[lang]}</p>
              </div>
            </div>
            <p className="cv-bio">{PERSONAL_INFO.bio.philosophy[lang]}</p>
          </section>

          <section className="cv-contact-grid">
            <div><Mail /><span>{PERSONAL_INFO.email}</span></div>
            <div><MapPin /><span>{PERSONAL_INFO.location}</span></div>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer"><Github /><span>{PERSONAL_INFO.githubHandle}</span></a>
          </section>

          <section className="cv-section">
            <SectionTitle icon={BriefcaseBusiness}>{t.experience}</SectionTitle>
            <div className="cv-experience-list">
              {EXPERIENCES.map(exp => <article key={exp.id} className="cv-experience-item">
                <div className="cv-experience-head">
                  <div><h4>{exp.role[lang]}</h4><p>{exp.company}</p></div>
                  <span>{exp.period}</span>
                </div>
                <p className="cv-description">{exp.description[lang]}</p>
                <p className="cv-tech">{exp.techStack.join(' · ')}</p>
              </article>)}
            </div>
          </section>

          <section className="cv-section">
            <SectionTitle icon={BriefcaseBusiness}>{t.skills}</SectionTitle>
            <div className="cv-skills-list">{SKILLS.map((s, i) => <span key={`${s.name}-${i}`}>{s.name}</span>)}</div>
          </section>

          <section className="cv-section cv-education-section">
            <SectionTitle icon={GraduationCap}>{t.education}</SectionTitle>
            <div className="cv-education">
              <div><h4>{t.educationName}</h4><p>{t.educationPlace}</p></div>
              <span>{t.period}</span>
            </div>
          </section>
        </main>
      </motion.div>
    </div>
  </AnimatePresence>;
};
