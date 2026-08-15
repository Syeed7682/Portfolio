import React, { useState, useEffect } from 'react';
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
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { MediaLightbox } from './components/common/MediaLightbox';
import { CheckCircle, AlertCircle, Info, Sparkles, X } from 'lucide-react';

const MainPortfolioView: React.FC = () => {
  const { data, activeView, setActiveView, isAdmin, toast } = usePortfolio();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Re-order and render sections dynamically
  const sortedSections = [...data.sections]
    .filter(s => s.isVisible)
    .sort((a, b) => a.order - b.order);

  const renderSectionComponent = (id: string) => {
    switch (id) {
      case 'home':
        return <HeroSection key="home" />;
      case 'about':
        return <AboutSection key="about" />;
      case 'skills':
        return <SkillsSection key="skills" />;
      case 'portfolio':
        return <ProjectsSection key="portfolio" />;
      case 'publications':
        return <PublicationsSection key="publications" />;
      case 'events':
        return <EventsSection key="events" />;
      case 'experience':
        return <ExperienceSection key="experience" />;
      case 'contact':
        return <ContactSection key="contact" />;
      default:
        return null;
    }
  };

  if (activeView === 'admin') {
    if (!isAdmin) {
      return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white text-center">
          <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto">
              <Sparkles className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Admin Authentication</h2>
              <p className="text-xs text-slate-400">
                Sign in with authorized Google account (<code className="text-purple-400">kmsyeedasif@gmail.com</code>) or Quick Access to configure the portfolio.
              </p>
            </div>
            <button
              onClick={() => setShowLoginModal(true)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs shadow-lg shadow-purple-500/25 hover:scale-105 transition-all"
            >
              Open Admin Sign-In Portal
            </button>
            <button
              onClick={() => setActiveView('portfolio')}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              &larr; Back to Portfolio
            </button>
          </div>
          <AdminLoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
          />
        </div>
      );
    }

    return (
      <AdminDashboard onBackToPortfolio={() => setActiveView('portfolio')} />
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 relative ${
      data.theme.mode === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Navigation */}
      <Navbar />

      {/* Dynamic Drag-and-Drop Ordered Sections */}
      <main>
        {sortedSections.map(sec => renderSectionComponent(sec.id))}
      </main>

      {/* Footer */}
      <Footer />

      {/* Lightbox Modal for HD Media View */}
      <MediaLightbox />

      {/* Global Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/90 border border-purple-500/30 text-white shadow-2xl backdrop-blur-2xl">
            {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
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
