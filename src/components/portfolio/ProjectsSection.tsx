import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Search, 
  Sparkles, 
  Tag, 
  Layers, 
  Maximize2,
  TrendingUp
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const ProjectsSection: React.FC = () => {
  const { data, openMediaModal } = usePortfolio();
  const sectionConfig = data.sections.find(s => s.id === 'portfolio');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (sectionConfig && !sectionConfig.isVisible) return null;

  const projects = data.projects;

  // Extract unique types
  const availableTypes = ['All', ...Array.from(new Set(projects.map(p => p.type).filter(Boolean)))];

  const filteredProjects = projects.filter(proj => {
    const matchesType = selectedType === 'All' || proj.type === selectedType;
    const matchesSearch = 
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <section id="portfolio" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 uppercase tracking-wider">
            <FolderGit2 className="w-3 h-3 text-purple-400" />
            <span>{sectionConfig?.badgeTitle || 'Selected Work'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            {sectionConfig?.heading || 'Featured Projects'}
          </h2>
          {sectionConfig?.subtitle && (
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              {sectionConfig.subtitle}
            </p>
          )}
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Dynamic Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-md">
            {availableTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedType === type
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, tag, AI model..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 shadow-sm"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj._id}
              className="rounded-3xl overflow-hidden bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/15 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Media Thumbnail */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                <img
                  src={proj.image}
                  alt={proj.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                  onError={(e) => {
                    // Fallback visual
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Top Badge: Type */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-950/80 backdrop-blur-md text-purple-300 border border-purple-500/30 shadow-md">
                  <Tag className="w-3 h-3 text-purple-400" />
                  <span>{proj.type}</span>
                </div>

                {/* Expand / Lightbox Button */}
                <button
                  onClick={() => openMediaModal({
                    title: proj.title,
                    description: proj.description,
                    image: proj.image,
                    category: proj.type,
                  })}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-purple-600 text-slate-300 hover:text-white border border-white/15 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  title="View Image Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>

                {/* Metrics / Key Benchmark Tag */}
                {proj.metrics && (
                  <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    <TrendingUp className="w-3 h-3" />
                    <span className="truncate">{proj.metrics}</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2.5">
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white group-hover:text-purple-400 transition-colors leading-snug">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed line-clamp-3">
                    {proj.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions Link Footer */}
                  <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors"
                          title="View GitHub Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-500 hover:text-purple-400 dark:text-slate-400 dark:hover:text-purple-300 transition-colors"
                          title="View Live Link"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <a
                      href={proj.link || proj.githubUrl || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                    >
                      <span>Explore Details</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-slate-400 bg-white/40 dark:bg-slate-900/40 rounded-3xl border border-slate-200 dark:border-white/10">
            <p className="text-sm">No projects found matching current filter.</p>
          </div>
        )}

        {/* GitHub Explore More Card */}
        <div className="mt-16 text-center">
          <a
            href={data.hero.githubUrl || 'https://github.com/Syeed7682'}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/70 dark:bg-slate-900/80 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 backdrop-blur-xl hover:border-purple-500/50 hover:shadow-xl hover:scale-105 transition-all text-sm font-bold shadow-sm"
          >
            <Github className="w-5 h-5 text-purple-500" />
            <span>Explore More Repositories on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};
