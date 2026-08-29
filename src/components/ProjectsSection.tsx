import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, FolderGit2 } from 'lucide-react';
import { Project, ThemeAccent, Language } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectsProps {
  accent: ThemeAccent;
  lang: Language;
}

export const ProjectsSection: React.FC<ProjectsProps> = ({ accent, lang }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="content-section relative z-10 px-5 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="section-shell section-shell-wide"
      >
        <div className="section-kicker flex items-center gap-2">
          <FolderGit2 className="w-3.5 h-3.5 text-zinc-400" />
          <span>03 · {lang === 'id' ? 'Karya' : 'Selected work'}</span>
        </div>
        <div className="mt-5 max-w-2xl">
          <h2 className="section-title">
            {lang === 'id' ? 'Beberapa hal yang pernah saya buat.' : 'A few things I have built.'}
          </h2>
          <p className="section-copy mt-4">
            {lang === 'id'
              ? 'Klik project untuk melihat cerita, stack, dan detailnya.'
              : 'Open a project to see the story, stack, and details behind it.'}
          </p>
        </div>
        <div className="projects-grid mt-9">
          {PROJECTS.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`project-card ${index === 0 ? 'project-card-featured' : ''}`}
            >
              <div className="project-image-wrap">
                <img src={project.image} alt="" className="project-image" />
              </div>
              <div className="p-5 text-left">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] uppercase tracking-[.16em] text-zinc-500">
                    {project.categoryLabel[lang]}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-zinc-600" />
                </div>
                <h3 className="mt-2 text-base font-medium text-white">{project.title}</h3>
                <p className="mt-2 text-xs leading-5 text-zinc-500 line-clamp-2">
                  {project.summary[lang]}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span className="skill-pill" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        accent={accent}
        lang={lang}
      />
    </section>
  );
};

