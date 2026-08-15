import React from 'react';
import { 
  Brain, 
  BookOpen, 
  Users, 
  Trophy, 
  GraduationCap, 
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AboutSection: React.FC = () => {
  const { data } = usePortfolio();
  const about = data.about;
  const sectionConfig = data.sections.find(s => s.id === 'about');

  if (sectionConfig && !sectionConfig.isVisible) return null;

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-5 h-5 text-purple-400" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-pink-400" />;
      case 'Users': return <Users className="w-5 h-5 text-blue-400" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-amber-400" />;
      default: return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>{sectionConfig?.badgeTitle || 'Background'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            {sectionConfig?.heading || 'About Me'}
          </h2>
          {sectionConfig?.subtitle && (
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              {sectionConfig.subtitle}
            </p>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Visual Showcase Card */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-30 blur-xl group-hover:opacity-50 transition duration-500" />
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 bg-slate-900 shadow-2xl">
              <img
                src={about.coverImageUrl}
                alt="Syeed Asif Workstation"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-6">
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-1">
                  East West University
                </span>
                <p className="text-base sm:text-lg font-bold text-white leading-snug">
                  Computer Science & Engineering (Data Science Major)
                </p>
              </div>
            </div>
          </div>

          {/* Text & Stats */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-3xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-lg space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {about.heading}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                {about.subheading}
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                {about.paragraph1}
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                {about.paragraph2}
              </p>
            </div>

            {/* Live Stats Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {about.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 backdrop-blur-md text-center hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-2.5">
                    {getStatIcon(stat.icon)}
                  </div>
                  <p className="text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
