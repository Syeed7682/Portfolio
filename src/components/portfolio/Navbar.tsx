import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Settings, 
  FileDown, 
  Sparkles,
  LayoutDashboard
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { CvHoverPopup } from '../common/CvHoverPopup';

export const Navbar: React.FC = () => {
  const { data, updateTheme, setActiveView, isAdmin } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [cvPopupPos, setCvPopupPos] = useState<{ x: number; y: number } | null>(null);
  const [showCvPopup, setShowCvPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setIsScrolled(scrollTop > 40);

      // Detect active section
      const visibleSections = data.sections.filter(s => s.isVisible);
      for (const section of visibleSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.sections]);

  const visibleNavLinks = data.sections
    .filter(s => s.isVisible)
    .sort((a, b) => a.order - b.order);

  const toggleThemeMode = () => {
    updateTheme({ mode: data.theme.mode === 'dark' ? 'light' : 'dark' });
  };

  const handleCvMouseEnter = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setCvPopupPos({ x: rect.left, y: rect.bottom + 10 });
    setShowCvPopup(true);
  };

  const handleCvMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;
    setCvPopupPos({ x: e.clientX, y: e.clientY });
  };

  const handleCvMouseLeave = () => {
    setShowCvPopup(false);
  };

  return (
    <>
      {/* Scroll Progress Line */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-950/80 dark:bg-slate-950/85 bg-white/80 backdrop-blur-xl border-b border-slate-200/20 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-purple-950/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 group font-semibold text-xl tracking-tight text-slate-900 dark:text-white"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <span className="font-bold text-sm">SA</span>
            </div>
            <div className="flex flex-col">
              <span className="leading-none text-base font-bold font-sans">
                Syeed<span className="text-purple-500">.</span>
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono">
                Portfolio
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {visibleNavLinks.map(sec => {
              const isActive = activeSection === sec.id;
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className={`text-[13px] font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {sec.label}
                </a>
              );
            })}
          </div>

          {/* Actions (CV, Theme, Admin Button) */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Hire Me / CV Button with Frosted Glass Hover Popup */}
            {data.cv.previewEnabled && (
              <a
                href={data.cv.fileUrl || '#contact'}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={handleCvMouseEnter}
                onMouseMove={handleCvMouseMove}
                onMouseLeave={handleCvMouseLeave}
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 shadow-md hover:scale-[1.02] active:scale-95 transition-all"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Hire Me</span>
              </a>
            )}

            {/* Admin Panel Toggle */}
            <button
              onClick={() => setActiveView('admin')}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Open Admin Dashboard & Customizer"
            >
              <LayoutDashboard className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleThemeMode}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="Toggle Theme"
              title="Toggle Light / Dark mode"
            >
              {data.theme.mode === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleThemeMode}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300"
            >
              {data.theme.mode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden px-4 pt-3 pb-6 bg-slate-950/95 dark:bg-slate-950/95 bg-white/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 space-y-2 animate-in slide-in-from-top-4">
            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {visibleNavLinks.map(sec => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    activeSection === sec.id
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  {sec.label}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveView('admin');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4 text-purple-400" />
                Admin Dashboard & Live Customizer
              </button>

              {data.cv.previewEnabled && (
                <a
                  href={data.cv.fileUrl || '#contact'}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-xs flex items-center justify-center gap-2 text-center"
                >
                  <FileDown className="w-4 h-4" />
                  Download CV / Resume
                </a>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Floating CV Hover Popup */}
      <CvHoverPopup position={cvPopupPos} isVisible={showCvPopup} />
    </>
  );
};
