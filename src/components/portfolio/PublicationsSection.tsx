import React, { useState } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  Calendar, 
  Users, 
  BookmarkCheck,
  FileCode2
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const PublicationsSection: React.FC = () => {
  const { data, showToast } = usePortfolio();
  const sectionConfig = data.sections.find(s => s.id === 'publications');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (sectionConfig && !sectionConfig.isVisible) return null;

  const publications = data.publications;

  const handleCopyBibtex = (pub: typeof publications[0]) => {
    const bibtex = `@article{asif${pub.year},\n  title={${pub.title}},\n  author={${pub.authors}},\n  journal={${pub.conference}},\n  year={${pub.year}}\n}`;
    navigator.clipboard.writeText(bibtex);
    setCopiedId(pub._id);
    showToast('BibTeX citation copied to clipboard!', 'info');
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="publications" className="py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 uppercase tracking-wider">
            <BookOpen className="w-3 h-3 text-purple-400" />
            <span>{sectionConfig?.badgeTitle || 'Academic Research'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            {sectionConfig?.heading || 'Research Publications'}
          </h2>
          {sectionConfig?.subtitle && (
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              {sectionConfig.subtitle}
            </p>
          )}
        </div>

        {/* Papers Deck */}
        <div className="space-y-6">
          {publications.map((pub) => (
            <div
              key={pub._id}
              className="flex flex-col md:flex-row gap-6 p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Background ambient icon */}
              <div className="absolute -right-6 -bottom-6 text-slate-200/30 dark:text-white/5 text-8xl pointer-events-none group-hover:scale-110 transition-transform duration-500">
                <BookOpen className="w-32 h-32" />
              </div>

              {pub.image && (
                <div className="w-full md:w-1/3 shrink-0 relative z-10 overflow-hidden rounded-2xl border border-slate-200/50 dark:border-white/5 shadow-inner bg-slate-100/50 dark:bg-slate-800/50 flex items-center justify-center">
                  <img src={pub.image} alt={pub.title} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}

              <div className="flex-1 relative z-10 space-y-4">
                {/* Meta Badges */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20">
                    {pub.conference}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <Calendar className="w-3 h-3" />
                    Published {pub.year}
                  </span>
                  {pub.doi && (
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      DOI: {pub.doi}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white group-hover:text-purple-400 transition-colors leading-snug">
                  {pub.title}
                </h3>

                {/* Abstract Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                  {pub.description}
                </p>

                {/* Authors */}
                <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 pt-1">
                  <Users className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="font-semibold">{pub.authors}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  {pub.link && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold hover:bg-purple-600 dark:hover:bg-purple-400 dark:hover:text-slate-950 transition-all shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Read Publication Paper</span>
                    </a>
                  )}

                  <button
                    onClick={() => handleCopyBibtex(pub)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 text-xs font-semibold transition-all"
                  >
                    {copiedId === pub._id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">BibTeX Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Citation</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
