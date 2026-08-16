import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  FileDown, 
  Send, 
  Github, 
  Linkedin, 
  Facebook, 
  Mail, 
  MapPin, 
  Code2, 
  BrainCircuit,
  Bot
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ensureAbsoluteUrl, resolveImageUrl } from '../../utils/urlUtils';
import { CvHoverPopup } from '../common/CvHoverPopup';

export const HeroSection: React.FC = () => {
  const { data } = usePortfolio();
  const hero = data.hero;

  // Typewriter logic
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [cvPopupPos, setCvPopupPos] = useState<{ x: number; y: number } | null>(null);
  const [showCvPopup, setShowCvPopup] = useState(false);

  useEffect(() => {
    const titles = hero.typewriterTitles.length > 0 ? hero.typewriterTitles : ['Full-Stack Developer & Data Scientist'];
    const targetTitle = titles[currentTitleIndex % titles.length];

    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText.length < targetTitle.length) {
        timer = setTimeout(() => {
          setCurrentText(targetTitle.substring(0, currentText.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(targetTitle.substring(0, currentText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setCurrentTitleIndex(prev => prev + 1);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTitleIndex, hero.typewriterTitles]);

  const handleCvMouseEnter = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setCvPopupPos({ x: rect.left, y: rect.bottom + 15 });
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
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Animated Mesh Gradients */}
      <div className="mesh-bg-container">
        <div className="mesh-blob w-[50vw] h-[50vw] -top-[15%] -left-[10%] bg-purple-600/20 dark:bg-purple-900/30" />
        <div className="mesh-blob w-[45vw] h-[45vw] top-[30%] -right-[15%] bg-blue-600/20 dark:bg-indigo-900/25" style={{ animationDelay: '3s' }} />
        <div className="mesh-blob w-[55vw] h-[55vw] -bottom-[20%] left-[20%] bg-pink-600/15 dark:bg-pink-900/20" style={{ animationDelay: '6s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Status Pill */}
            {hero.availableBadgeText && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/70 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 backdrop-blur-md text-slate-800 dark:text-slate-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{hero.availableBadgeText}</span>
              </div>
            )}

            {/* Main Greeting and Name */}
            <div className="space-y-2">
              <p className="text-base sm:text-lg font-medium text-slate-700 dark:text-slate-400">
                {hero.greetingText}
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.1]">
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                  {hero.name}
                </span>
              </h1>
            </div>

            {/* Typewriter Dynamic Title */}
            <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-900 dark:text-slate-200">
                <span>{currentText}</span>
                <span className="w-0.5 h-6 bg-slate-900 dark:bg-slate-200 animate-pulse ml-1 inline-block" />
              </h2>
            </div>

            {/* Bio Paragraph */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              {hero.bio}
            </p>



            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href={hero.primaryCtaLink || '#contact'}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-bold text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Get In Touch</span>
              </a>

              {/* Resume / CV with Frosted Glass Hover Popup */}
              <a
                href={data.cv.fileUrl || '#'}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={handleCvMouseEnter}
                onMouseMove={handleCvMouseMove}
                onMouseLeave={handleCvMouseLeave}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <FileDown className="w-4 h-4" />
                <span>Hire Me (CV)</span>
              </a>

              <a
                href={hero.secondaryCtaLink || '#portfolio'}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 font-bold text-sm shadow-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>View My Work</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-6 text-slate-500 dark:text-slate-400">
              {hero.githubUrl && (
                <a
                  href={ensureAbsoluteUrl(hero.githubUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 flex items-center justify-center hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {hero.linkedinUrl && (
                <a
                  href={ensureAbsoluteUrl(hero.linkedinUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 flex items-center justify-center hover:text-[#0a66c2] transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {hero.facebookUrl && (
                <a
                  href={ensureAbsoluteUrl(hero.facebookUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 flex items-center justify-center hover:text-[#1877f2] transition-colors"
                  aria-label="Facebook Profile"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Right Profile Photo & Glowing Halo */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative group">
              {/* Outer Glowing Ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-blue-500 opacity-60 blur-2xl group-hover:opacity-80 transition duration-700 animate-pulse" />

              {/* Photo Frame */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-92 lg:h-92 rounded-full p-2 bg-gradient-to-tr from-purple-500 via-pink-500 to-indigo-500 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-4 border-slate-950">
                  <img
                    src={resolveImageUrl(hero.profileImageUrl)}
                    alt={hero.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      // Fallback avatar if URL fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Floating Badge Bottom Right */}
              <div className="absolute -bottom-4 right-0 sm:right-2 px-5 py-3 rounded-[1.25rem] bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-lg flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-wider">
                    PASSIONATE
                  </p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Developer & Data Scientist
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating CV Hover Popup */}
      <CvHoverPopup position={cvPopupPos} isVisible={showCvPopup} />
    </section>
  );
};
