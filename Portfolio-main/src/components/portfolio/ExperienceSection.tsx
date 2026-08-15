import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  HeartHandshake, 
  Calendar, 
  MapPin, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const ExperienceSection: React.FC = () => {
  const { data } = usePortfolio();
  const sectionConfig = data.sections.find(s => s.id === 'experience');
  const [filter, setFilter] = useState<'all' | 'Education' | 'Experience' | 'Volunteering'>('all');

  if (sectionConfig && !sectionConfig.isVisible) return null;

  const items = data.experience;

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Education':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 uppercase tracking-wider">
            <GraduationCap className="w-3 h-3" /> Education
          </span>
        );
      case 'Experience':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 uppercase tracking-wider">
            <Briefcase className="w-3 h-3" /> Experience
          </span>
        );
      case 'Volunteering':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 uppercase tracking-wider">
            <HeartHandshake className="w-3 h-3" /> Leadership & Volunteer
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 uppercase tracking-wider">
            <Briefcase className="w-3 h-3 text-purple-400" />
            <span>{sectionConfig?.badgeTitle || 'Timeline'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            {sectionConfig?.heading || 'Education & Experience'}
          </h2>
          {sectionConfig?.subtitle && (
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              {sectionConfig.subtitle}
            </p>
          )}
        </div>

        {/* Filter Toolbar */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-md">
            {(['all', 'Education', 'Experience', 'Volunteering'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filter === cat
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Journey' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Timeline */}
        <div className="relative">
          {/* Central Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500/20 -translate-x-1/2" />

          <div className="space-y-10">
            {filteredItems.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item._id}
                  className={`relative flex items-center flex-col md:flex-row ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Glowing Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] z-20 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-pulse" />
                  </div>

                  {/* Card Content */}
                  <div className="w-full pl-12 md:pl-0 md:w-1/2 md:px-8">
                    <div className="p-6 sm:p-7 rounded-3xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300 group">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        {getTypeBadge(item.type)}
                        <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-full border border-slate-200 dark:border-white/5">
                          <Calendar className="w-3 h-3 text-purple-400" />
                          {item.period}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-950 dark:text-white group-hover:text-purple-400 transition-colors leading-snug mb-1">
                        {item.title}
                      </h3>

                      <p className="text-xs font-semibold text-purple-600 dark:text-purple-300 mb-3">
                        {item.institution}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/60 dark:border-white/5">
                          {item.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
