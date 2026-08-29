import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  X,
  Eye,
  Share2,
  Check
} from 'lucide-react';
import { Article, ThemeAccent, Language, ColorMode } from '../types';
import { ARTICLES } from '../data/portfolioData';

interface ArticlesSectionProps {
  accent: ThemeAccent;
  lang: Language;
  colorMode: ColorMode;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  lang,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const activeArticle = ARTICLES[currentIndex] || ARTICLES[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : ARTICLES.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < ARTICLES.length - 1 ? prev + 1 : 0));
  };

  const handleShare = (art: Article) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}#article-${art.slug}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section id="articles" className="w-full">
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
            <FileText className="w-4 h-4 text-zinc-400" />
            <h2 className="text-sm font-semibold text-white tracking-wide">
              {lang === 'id' ? 'Latest Articles' : 'Latest Articles'}
            </h2>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Previous article"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1">
              {ARTICLES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex 
                      ? 'bg-white w-3' 
                      : 'bg-zinc-600 hover:bg-zinc-400'
                  }`}
                  aria-label={`Go to article ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Next article"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Active Article Card */}
        {activeArticle && (
          <div 
            onClick={() => setSelectedArticle(activeArticle)}
            className="group rounded-xl bg-[#191a22] hover:bg-[#1d1e28] border border-white/[0.05] hover:border-white/10 p-4 transition-all duration-200 cursor-pointer shadow-md"
          >
            {/* Top Row: Icon + Title/Reads + Read Button */}
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-3">
                {/* Red/Orange Document Icon Box */}
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0 shadow-sm">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors">
                    {activeArticle.title}
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-mono">
                    {activeArticle.reads}
                  </p>
                </div>
              </div>

              {/* Read Action Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedArticle(activeArticle);
                }}
                className="inline-flex items-center gap-1 text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] px-3 py-1.5 rounded-lg border border-white/[0.08] transition-all cursor-pointer select-none active:scale-95"
              >
                <span>Read</span>
                <ArrowRight className="w-3 h-3 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Excerpt Snippet */}
            <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 font-normal pt-1">
              {activeArticle.excerpt}
            </p>
          </div>
        )}
      </motion.div>

      {/* Full Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl max-h-[85vh] rounded-2xl bg-[#16171e] border border-white/10 shadow-2xl flex flex-col overflow-hidden text-zinc-100"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#13141a]">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <Eye className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{selectedArticle.reads}</span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare(selectedArticle)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    title="Bagikan Artikel"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-sm leading-relaxed text-zinc-300 font-sans">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {selectedArticle.title}
                </h1>

                <div className="text-xs text-zinc-400 bg-white/5 p-3 rounded-xl border border-white/5">
                  {selectedArticle.excerpt}
                </div>

                <div className="prose prose-invert max-w-none text-zinc-300 text-xs sm:text-sm space-y-3 font-normal whitespace-pre-line leading-relaxed">
                  {selectedArticle.content}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-5 py-3 border-t border-white/10 bg-[#13141a] flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-1.5 rounded-xl bg-white text-zinc-950 text-xs font-semibold hover:bg-zinc-200 transition-colors cursor-pointer"
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
