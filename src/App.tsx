import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/portfolio/Navbar';
import { HeroSection } from './components/portfolio/HeroSection';
import { AboutSection } from './components/portfolio/AboutSection';
import { SkillsSection } from './components/portfolio/SkillsSection';
import { ProjectsSection } from './components/portfolio/ProjectsSection';
import { PublicationsSection } from './components/portfolio/PublicationsSection';
import { EventsSection } from './components/portfolio/EventsSection';
import { ExperienceSection } from './components/portfolio/ExperienceSection';
import { ContactSection } from './components/portfolio/ContactSection';
import { Footer } from './components/portfolio/Footer';
import { MediaLightbox } from './components/common/MediaLightbox';
import { CheckCircle, AlertCircle, Info, Loader2 } from 'lucide-react';

const LoadingScreen: React.FC = () => (
  <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 text-white">
    <div className="relative">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl shadow-purple-500/30">
        <span className="text-2xl font-black">S</span>
      </div>
      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
        <Loader2 className="w-3 h-3 animate-spin" />
      </div>
    </div>
    <div className="text-center space-y-1">
      <p className="text-sm font-bold text-white/90">Kha. Mo. Syeed Asif</p>
      <p className="text-xs text-slate-400">Loading portfolio data...</p>
    </div>
    <div className="flex gap-1.5 mt-2">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  </div>
);

const MainPortfolioView: React.FC = () => {
  const { data, toast, isLoadingData } = usePortfolio();

  if (isLoadingData) return <LoadingScreen />;

  // Re-order and render sections dynamically
  const sortedSections = [...data.sections]
    .filter(s => s.isVisible)
    .sort((a, b) => a.order - b.order);

  const renderSectionComponent = (id: string) => {
    switch (id) {
      case 'home':         return <HeroSection key="home" />;
      case 'about':        return <AboutSection key="about" />;
      case 'skills':       return <SkillsSection key="skills" />;
      case 'portfolio':    return <ProjectsSection key="portfolio" />;
      case 'publications': return <PublicationsSection key="publications" />;
      case 'events':       return <EventsSection key="events" />;
      case 'experience':   return <ExperienceSection key="experience" />;
      case 'contact':      return <ContactSection key="contact" />;
      default:             return null;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 relative ${
      data.theme.mode === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Navigation */}
      <Navbar />

      {/* Dynamic Ordered Sections */}
      <main>
        {sortedSections.map(sec => renderSectionComponent(sec.id))}
      </main>

      {/* Footer */}
      <Footer />

      {/* Lightbox Modal */}
      <MediaLightbox />

      {/* Global Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[9999] animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/90 border border-purple-500/30 text-white shadow-2xl backdrop-blur-2xl">
            {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toast.type === 'error'   && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
            {toast.type === 'info'    && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
            <span className="text-xs font-semibold">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <MainPortfolioView />
    </PortfolioProvider>
  );
}
