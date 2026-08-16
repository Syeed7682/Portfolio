import React from 'react';
import { ArrowUp, Github, Linkedin, Facebook, Mail, Sparkles, Heart } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { data } = usePortfolio();
  const hero = data.hero;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200/60 dark:border-white/5">
          <div className="text-center sm:text-left space-y-1">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
              {hero.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Full-Stack Developer & Data Science Researcher &bull; East West University
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            {hero.githubUrl && (
              <a
                href={hero.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center hover:text-slate-950 dark:hover:text-white hover:border-purple-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {hero.linkedinUrl && (
              <a
                href={hero.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center hover:text-[#0a66c2] hover:border-[#0a66c2] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {hero.facebookUrl && (
              <a
                href={hero.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center hover:text-[#1877f2] hover:border-[#1877f2] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}
            <a
              href={`mailto:${hero.email}`}
              className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center hover:text-purple-400 hover:border-purple-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 text-white flex items-center justify-center hover:scale-105 transition-transform ml-2"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright & quick Admin switch */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} Kha. Mo. Syeed Asif. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://portfolio-2-afjx.onrender.com/admin"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-purple-400 transition-colors"
            >
              Admin Dashboard
            </a>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              Built with precision <Sparkles className="w-3 h-3 text-purple-400" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
