import React, { useState, useEffect, useRef } from 'react';
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
  Bot,
  Camera,
  Upload,
  Link as LinkIcon,
  X
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ensureAbsoluteUrl, resolveImageUrl } from '../../utils/urlUtils';
import { getThemePreset } from '../../utils/themeUtils';
import { CvHoverPopup } from '../common/CvHoverPopup';

export const HeroSection: React.FC = () => {
  const { data, isColdStart, isAdmin, updateHero, showToast } = usePortfolio();
  const hero = data.hero;
  const themePreset = getThemePreset(data.theme.preset);

  // Typewriter logic
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [cvPopupPos, setCvPopupPos] = useState<{ x: number; y: number } | null>(null);
  const [showCvPopup, setShowCvPopup] = useState(false);

  // Profile pic edit (admin only)
  const [showImgMenu, setShowImgMenu] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imgUrlDraft, setImgUrlDraft] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) { showToast('Image must be under 15MB', 'error'); return; }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        updateHero({ profileImageUrl: reader.result });
        showToast('Profile photo updated!', 'success');
      }
    };
    reader.readAsDataURL(file);
    setShowImgMenu(false);
  };

  const handleProfileImageUrl = () => {
    if (!imgUrlDraft.trim()) return;
    updateHero({ profileImageUrl: imgUrlDraft.trim() });
    showToast('Profile photo updated!', 'success');
    setImgUrlDraft('');
    setShowUrlInput(false);
    setShowImgMenu(false);
  };

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
      {/* Cold-start banner: shown only when Render backend is waking up and no local cache exists */}
      {isColdStart && (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-2 py-2 px-4 bg-amber-500/90 dark:bg-amber-600/90 backdrop-blur-sm text-white text-xs font-medium shadow-lg">
          <span className="inline-block w-2 h-2 rounded-full bg-white animate-ping" />
          Server is waking up — fresh data loading shortly…
        </div>
      )}
      {/* Animated Mesh Gradients adapting to theme */}
      <div className="mesh-bg-container">
        <div className={`mesh-blob w-[50vw] h-[50vw] -top-[15%] -left-[10%] ${themePreset.blobColors.b1}`} />
        <div className={`mesh-blob w-[45vw] h-[45vw] top-[30%] -right-[15%] ${themePreset.blobColors.b2}`} style={{ animationDelay: '3s' }} />
        <div className={`mesh-blob w-[55vw] h-[55vw] -bottom-[20%] left-[20%] ${themePreset.blobColors.b3}`} style={{ animationDelay: '6s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Status Pill */}
            {hero.availableBadgeText && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-900/80 border border-slate-200/90 dark:border-white/10 backdrop-blur-md text-slate-800 dark:text-slate-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20" />
                <span>{hero.availableBadgeText}</span>
              </div>
            )}

            {/* Main Greeting and Name */}
            <div className="space-y-2">
              <p className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-200 tracking-wide">
                {hero.greetingText}
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-normal text-slate-950 dark:text-white leading-[1.15]">
                <span
                  className={`bg-gradient-to-r ${themePreset.gradientText} bg-clip-text text-transparent inline-block pb-1`}
                  style={data.theme.accentGradient ? { backgroundImage: data.theme.accentGradient } : undefined}
                >
                  {hero.name}
                </span>
              </h1>
            </div>

            {/* Typewriter Dynamic Title (no leftover cursor) */}
            <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                <span>{currentText}</span>
              </h2>
            </div>

            {/* Bio Paragraph - High contrast dark slate on light theme */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {hero.bio}
            </p>

            {/* CTA Buttons - Balanced and unified */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href={hero.primaryCtaLink || '#contact'}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Get In Touch</span>
              </a>

              {/* Resume / CV with Dynamic Theme Accent */}
              <a
                href={data.cv.fileUrl || '#'}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={handleCvMouseEnter}
                onMouseMove={handleCvMouseMove}
                onMouseLeave={handleCvMouseLeave}
                className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r ${themePreset.buttonGradient} text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2`}
                style={data.theme.accentGradient ? { backgroundImage: data.theme.accentGradient } : undefined}
              >
                <FileDown className="w-4 h-4" />
                <span>Hire Me (CV)</span>
              </a>

              <a
                href={hero.secondaryCtaLink || '#portfolio'}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/90 hover:bg-slate-100 dark:bg-slate-900/90 dark:hover:bg-slate-800 text-slate-800 dark:text-white border border-slate-300/80 dark:border-white/10 font-bold text-sm shadow-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>View My Work</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-6">
              {hero.githubUrl && (
                <a
                  href={ensureAbsoluteUrl(hero.githubUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-11 h-11 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 ${themePreset.textAccentHover} hover:border-slate-400 dark:hover:border-white/30 shadow-sm hover:shadow backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95`}
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
                  className="w-11 h-11 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-[#0a66c2] hover:border-[#0a66c2]/40 shadow-sm hover:shadow backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95"
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
                  className="w-11 h-11 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-[#1877f2] hover:border-[#1877f2]/40 shadow-sm hover:shadow backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                  aria-label="Facebook Profile"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Right Profile Photo & Glowing Halo (Theme-Aware) */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative group">
              {/* Outer Glowing Ring */}
              <div
                className={`absolute -inset-4 rounded-full bg-gradient-to-tr ${themePreset.haloGradient} opacity-60 blur-2xl group-hover:opacity-85 transition duration-700 animate-pulse`}
                style={data.theme.accentGradient ? { backgroundImage: data.theme.accentGradient } : undefined}
              />

              {/* Photo Frame */}
              <div
                className={`relative w-64 h-64 sm:w-80 sm:h-80 lg:w-92 lg:h-92 rounded-full p-2 bg-gradient-to-tr ${themePreset.gradientText} shadow-2xl`}
                style={data.theme.accentGradient ? { backgroundImage: data.theme.accentGradient } : undefined}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-4 border-white dark:border-slate-950 shadow-inner relative">
                  <img
                    src={resolveImageUrl(hero.profileImageUrl)}
                    alt={hero.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Admin Edit Overlay */}
                  {isAdmin && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => { setShowImgMenu(v => !v); setShowUrlInput(false); }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 border border-white/20"
                        title="Edit profile photo"
                      >
                        <Camera className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Image Edit Dropdown Menu */}
                {isAdmin && showImgMenu && (
                  <div className="absolute top-4 right-0 z-50 w-52 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 dark:border-white/5">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Edit Photo</span>
                      <button onClick={() => { setShowImgMenu(false); setShowUrlInput(false); }} className="text-slate-400 hover:text-slate-600">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {/* Upload from device */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <Upload className="w-4 h-4 text-purple-500" />
                      Upload from device
                    </button>
                    {/* Paste URL */}
                    <button
                      onClick={() => setShowUrlInput(v => !v)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <LinkIcon className="w-4 h-4 text-blue-500" />
                      Paste image URL
                    </button>
                    {showUrlInput && (
                      <div className="px-3 pb-3 space-y-2">
                        <input
                          type="text"
                          value={imgUrlDraft}
                          onChange={e => setImgUrlDraft(e.target.value)}
                          placeholder="https://..."
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-1 focus:ring-purple-500"
                          onKeyDown={e => e.key === 'Enter' && handleProfileImageUrl()}
                          autoFocus
                        />
                        <button
                          onClick={handleProfileImageUrl}
                          className="w-full py-1.5 rounded-lg bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleProfileImageFile} />
                  </div>
                )}
              </div>

              {/* Floating Badge Bottom Right */}
              <div className="absolute -bottom-4 right-0 sm:right-2 px-5 py-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-white/10 backdrop-blur-xl shadow-xl flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${themePreset.badgeBg} flex items-center justify-center ${themePreset.textAccent}`}>
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
