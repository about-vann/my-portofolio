import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronRight, 
  Clock, 
  Eye, 
  X, 
  ArrowUp, 
  Sparkles,
  Share2,
  Check
} from 'lucide-react';
import { Article, ThemeAccent, Language, ColorMode } from '../types';
import { ARTICLES, PERSONAL_INFO } from '../data/portfolioData';

interface ArticlesSectionProps {
  accent: ThemeAccent;
  lang: Language;
  colorMode: ColorMode;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  accent,
  lang,
  colorMode,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareArticle = (art: Article) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}#article-${art.slug}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section 
      id="articles" 
      className="content-section pb-12 sm:pb-16 px-4 sm:px-6 max-w-3xl mx-auto relative z-10 font-sans"
    >
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-3.5"
      >
        {/* Section Kicker */}
        <div className="section-kicker flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
          <span>06 · {lang === 'id' ? 'Artikel & Catatan' : 'Articles & Writing'}</span>
        </div>

        {/* Header Matching Connects Style */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#141417] border border-white/10 flex items-center justify-center text-zinc-200 shadow-sm">
              <BookOpen className="w-4 h-4 text-zinc-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {lang === 'id' ? 'Artikel & Catatan' : 'Latest Articles'}
              </h3>
              <p className="text-xs text-zinc-400">
                {lang === 'id' ? 'Dokumentasi teknis & panduan deployment' : 'Technical write-ups & dev guides'}
              </p>
            </div>
          </div>

          <div className="px-3 py-1 rounded-lg bg-[#141417] border border-white/5 text-[11px] font-medium text-zinc-400 shadow-sm font-mono">
            {ARTICLES.length} Articles
          </div>
        </div>

        {/* Articles List Cards */}
        <div className="space-y-2.5">
          {ARTICLES.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#111113] hover:bg-[#161619] border border-white/5 hover:border-white/15 transition-all duration-200 cursor-pointer shadow-md gap-3 select-none"
            >
              {/* Left Side info */}
              <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#18181b] border border-white/5 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {art.title}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-light mt-0.5 line-clamp-1">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              {/* Right Side metadata & action */}
              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t border-white/5 sm:border-0">
                <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-zinc-500" />
                    {art.reads}
                  </span>
                  <span>•</span>
                  <span>{art.date}</span>
                </div>

                <div className="w-8 h-8 rounded-full bg-[#18181b] group-hover:bg-[#222226] border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white transition-all shadow-sm">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-6 flex items-center justify-between text-xs text-zinc-500 px-1 border-t border-white/5 mt-4">
          <div className="flex items-center gap-2">
            <span>© 2026 {PERSONAL_INFO.name}</span>
            <span>•</span>
            <span className="text-zinc-600 font-mono">{PERSONAL_INFO.location}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111113] hover:bg-[#18181b] border border-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Kembali ke atas"
          >
            <span className="text-[11px] font-medium">Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#111113] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-8"
            >
              {/* Header actions */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{selectedArticle.reads} • {selectedArticle.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShareArticle(selectedArticle)}
                    className="p-2 rounded-xl bg-[#18181b] hover:bg-zinc-800 border border-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title="Bagikan link artikel"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="p-2 rounded-xl bg-[#18181b] hover:bg-zinc-800 border border-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-4 mb-3">
                {selectedArticle.title}
              </h2>

              {/* Excerpt */}
              <p className="text-xs text-zinc-400 font-mono mb-6 pb-4 border-b border-white/5">
                {selectedArticle.excerpt}
              </p>

              {/* Body Content */}
              <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed space-y-4 max-h-[60vh] overflow-y-auto pr-2 font-light">
                <div className="whitespace-pre-line font-sans">
                  {selectedArticle.content}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500 font-mono">
                  Penulis: {PERSONAL_INFO.name}
                </span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
