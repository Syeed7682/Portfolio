import React, { useState } from 'react';
import { 
  Trophy, 
  Maximize2, 
  Play
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const EventsSection: React.FC = () => {
  const { data, openMediaModal } = usePortfolio();
  const sectionConfig = data.sections.find(s => s.id === 'events');
  const [filter, setFilter] = useState<'all' | 'events' | 'certificates' | 'awards'>('all');

  if (sectionConfig && !sectionConfig.isVisible) return null;

  const events = data.events;

  const filteredEvents = events.filter(e => {
    if (filter === 'all') return true;
    return e.category === filter;
  });

  return (
    <section id="events" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 uppercase tracking-wider">
            <Trophy className="w-3 h-3 text-purple-600 dark:text-purple-400" />
            <span>{sectionConfig?.badgeTitle || 'Milestones'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {sectionConfig?.heading || 'Events & Achievements'}
          </h2>
          {sectionConfig?.subtitle && (
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-400 font-light leading-relaxed">
              {sectionConfig.subtitle}
            </p>
          )}
        </div>

        {/* Grid Cards */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl bg-white/40 dark:bg-slate-900/40 border border-slate-200/60 dark:border-white/5 backdrop-blur-xl">
            <Trophy className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-3 opacity-50" />
            <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">No items found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">There are no {filter !== 'all' ? filter : 'milestones'} to display currently.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((item) => {
              const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(item.image);

              return (
                <div
                  key={item._id}
                  className="group cursor-pointer rounded-3xl overflow-hidden bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/15 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Media Container */}
                  <div
                    className="relative h-60 w-full overflow-hidden bg-slate-950"
                    onClick={() => openMediaModal({
                      title: item.title,
                      description: item.description,
                      image: item.image,
                      date: item.date,
                      category: item.category,
                      organization: item.organization,
                    })}
                  >
                    {isVideo ? (
                      <video
                        src={item.image}
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    )}

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Category Pill */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-purple-300 border border-purple-500/30">
                        {item.category === 'events' ? 'Event' : item.category === 'awards' ? 'Award' : 'Certificate'}
                      </span>
                    </div>

                    {isVideo && (
                      <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-purple-600/80 text-white flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 fill-white" />
                      </div>
                    )}

                    {/* Bottom title text overlay */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
                      <h3 className="text-base font-bold text-white leading-snug group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between text-[11px] text-slate-300 font-light">
                        <span>{item.organization || item.date}</span>
                        <span className="flex items-center gap-1 text-purple-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Details</span>
                          <Maximize2 className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="p-5 bg-white/40 dark:bg-slate-900/40 border-t border-slate-200/50 dark:border-white/5 space-y-3">
                    <p className="text-xs text-slate-700 dark:text-slate-400 line-clamp-2 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
