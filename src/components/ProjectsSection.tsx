import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LayoutGrid, ArrowRight } from 'lucide-react';
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
    <section id="projects" className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full rounded-2xl bg-[#15161c] border border-white/[0.07] p-5 sm:p-6 shadow-xl space-y-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <LayoutGrid className="w-4 h-4 text-zinc-400" />
            <h2 className="text-sm font-semibold text-white tracking-wide">
              Featured Projects
            </h2>
          </div>

          <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#1f2028] text-zinc-400 font-mono border border-white/5">
            {PROJECTS.length} Projects
          </span>
        </div>

        {/* Projects List matching Latest Articles Card Format */}
        <div className="space-y-3">
          {PROJECTS.map((project) => {
            const isTs = project.techBadge === 'TS';
            const isJs = project.techBadge === 'JS';

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group rounded-xl bg-[#191a22] hover:bg-[#1d1e28] border border-white/[0.05] hover:border-white/10 p-4 transition-all duration-200 cursor-pointer shadow-md"
              >
                {/* Top Row: Tech Badge + Title/Type + View Button (identical to Latest Articles) */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-3">
                    {/* Left Tech Square Badge */}
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shadow-md shrink-0 ${
                        isTs
                          ? 'bg-[#007acc] text-white font-mono'
                          : isJs
                          ? 'bg-[#f7df1e] text-zinc-950 font-mono'
                          : 'bg-zinc-800 text-zinc-200 font-mono'
                      }`}
                    >
                      {project.techBadge || 'DEV'}
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        {project.typeBadge && (
                          <span className="text-[10px] text-zinc-500 font-mono font-medium tracking-wider">
                            {project.typeBadge}
                          </span>
                        )}
                        {project.categoryLabel && (
                          <>
                            <span className="text-zinc-700">•</span>
                            <span className="text-[10px] text-zinc-500 font-mono">
                              {project.categoryLabel[lang]}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* View Action Button (styled exactly like Latest Articles Read button) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] px-3 py-1.5 rounded-lg border border-white/[0.08] transition-all cursor-pointer select-none active:scale-95 shrink-0"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3 h-3 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* Excerpt/Summary - Text Only */}
                <p className="text-xs text-zinc-400 leading-relaxed font-normal pt-1">
                  {project.summary[lang]}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Project Detail Modal - Text Only */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        accent={accent}
        lang={lang}
      />
    </section>
  );
};
