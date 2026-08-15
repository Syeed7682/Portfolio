import React, { useState } from 'react';
import { 
  Code, 
  Layers, 
  BarChart3, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  Cpu, 
  Database,
  Flame,
  Eye,
  Network,
  Zap,
  Atom,
  Server
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();
  const sectionConfig = data.sections.find(s => s.id === 'skills');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (sectionConfig && !sectionConfig.isVisible) return null;

  const categories = data.skillCategories;

  const allSkills = categories.flatMap(c => 
    c.skills.map(s => ({ ...s, categoryName: c.categoryName }))
  );

  const filteredSkills = allSkills.filter(skill => {
    const matchesCategory = activeCategory === 'all' || skill.categoryName === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 uppercase tracking-wider">
            <Cpu className="w-3 h-3 text-purple-400" />
            <span>{sectionConfig?.badgeTitle || 'Technical Arsenal'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            {sectionConfig?.heading || 'Skills & Technologies'}
          </h2>
          {sectionConfig?.subtitle && (
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              {sectionConfig.subtitle}
            </p>
          )}
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              All Skills ({allSkills.length})
            </button>
            {categories.map(c => (
              <button
                key={c._id}
                onClick={() => setActiveCategory(c.categoryName)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === c.categoryName
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {c.categoryName}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Python, PyTorch, React..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 shadow-sm"
            />
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                      <Code className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors">
                        {skill.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {skill.categoryName}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20">
                    {skill.level}
                  </span>
                </div>
              </div>

              {/* Proficiency Progress Bar */}
              <div className="mt-3 space-y-1.5">
                <div className="flex justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <span>Proficiency</span>
                  <span className="text-slate-800 dark:text-slate-200 font-semibold">{skill.proficiency}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 transition-all duration-1000 ease-out"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-sm">No skills found matching &quot;{searchQuery}&quot;.</p>
          </div>
        )}
      </div>
    </section>
  );
};
