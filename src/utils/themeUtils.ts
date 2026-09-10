import { ThemePreset } from '../types';

export interface PresetDetails {
  id: ThemePreset;
  name: string;
  accent: string;
  gradient: string;
  gradientText: string;
  buttonGradient: string;
  haloGradient: string;
  textAccent: string;
  textAccentHover: string;
  bgAccent: string;
  borderAccent: string;
  ringAccent: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  blobColors: {
    b1: string;
    b2: string;
    b3: string;
  };
}

export const PRESETS: Record<ThemePreset, PresetDetails> = {
  purple: {
    id: 'purple',
    name: 'Cyberpunk Neon',
    accent: '#a855f7',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #3b82f6 100%)',
    gradientText: 'from-purple-600 via-pink-500 to-cyan-400',
    buttonGradient: 'from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500',
    haloGradient: 'from-purple-600/50 via-pink-500/40 to-cyan-400/40 dark:from-purple-600 dark:via-pink-500 dark:to-cyan-400',
    textAccent: 'text-purple-600 dark:text-purple-400',
    textAccentHover: 'hover:text-purple-600 dark:hover:text-purple-400',
    bgAccent: 'bg-purple-600',
    borderAccent: 'border-purple-500',
    ringAccent: 'ring-purple-500',
    badgeBg: 'bg-purple-500/10',
    badgeText: 'text-purple-600 dark:text-purple-300',
    badgeBorder: 'border-purple-500/20',
    blobColors: {
      b1: 'bg-purple-500/12 dark:bg-purple-900/30',
      b2: 'bg-cyan-500/12 dark:bg-indigo-900/25',
      b3: 'bg-pink-500/10 dark:bg-pink-900/20',
    },
  },
  cyan: {
    id: 'cyan',
    name: 'Electric Cyan',
    accent: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
    gradientText: 'from-cyan-400 via-blue-500 to-indigo-500',
    buttonGradient: 'from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500',
    haloGradient: 'from-cyan-500/50 via-blue-500/40 to-indigo-500/40 dark:from-cyan-500 dark:via-blue-500 dark:to-indigo-500',
    textAccent: 'text-cyan-600 dark:text-cyan-400',
    textAccentHover: 'hover:text-cyan-600 dark:hover:text-cyan-400',
    bgAccent: 'bg-cyan-500',
    borderAccent: 'border-cyan-500',
    ringAccent: 'ring-cyan-500',
    badgeBg: 'bg-cyan-500/10',
    badgeText: 'text-cyan-600 dark:text-cyan-300',
    badgeBorder: 'border-cyan-500/20',
    blobColors: {
      b1: 'bg-cyan-500/12 dark:bg-cyan-900/30',
      b2: 'bg-blue-500/12 dark:bg-blue-900/25',
      b3: 'bg-indigo-500/10 dark:bg-indigo-900/20',
    },
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Aurora',
    accent: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #6366f1 100%)',
    gradientText: 'from-emerald-400 via-teal-500 to-cyan-500',
    buttonGradient: 'from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500',
    haloGradient: 'from-emerald-500/50 via-teal-500/40 to-cyan-500/40 dark:from-emerald-500 dark:via-teal-500 dark:to-cyan-500',
    textAccent: 'text-emerald-600 dark:text-emerald-400',
    textAccentHover: 'hover:text-emerald-600 dark:hover:text-emerald-400',
    bgAccent: 'bg-emerald-500',
    borderAccent: 'border-emerald-500',
    ringAccent: 'ring-emerald-500',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-600 dark:text-emerald-300',
    badgeBorder: 'border-emerald-500/20',
    blobColors: {
      b1: 'bg-emerald-500/12 dark:bg-emerald-900/30',
      b2: 'bg-teal-500/12 dark:bg-teal-900/25',
      b3: 'bg-cyan-500/10 dark:bg-cyan-900/20',
    },
  },
  rose: {
    id: 'rose',
    name: 'Sunset Rose',
    accent: '#f43f5e',
    gradient: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #f59e0b 100%)',
    gradientText: 'from-rose-500 via-pink-500 to-amber-400',
    buttonGradient: 'from-rose-500 via-pink-600 to-amber-500 hover:from-rose-400 hover:to-amber-400',
    haloGradient: 'from-rose-500/50 via-pink-500/40 to-amber-500/40 dark:from-rose-500 dark:via-pink-500 dark:to-amber-500',
    textAccent: 'text-rose-600 dark:text-rose-400',
    textAccentHover: 'hover:text-rose-600 dark:hover:text-rose-400',
    bgAccent: 'bg-rose-500',
    borderAccent: 'border-rose-500',
    ringAccent: 'ring-rose-500',
    badgeBg: 'bg-rose-500/10',
    badgeText: 'text-rose-600 dark:text-rose-300',
    badgeBorder: 'border-rose-500/20',
    blobColors: {
      b1: 'bg-rose-500/12 dark:bg-rose-900/30',
      b2: 'bg-pink-500/12 dark:bg-pink-900/25',
      b3: 'bg-amber-500/10 dark:bg-amber-900/20',
    },
  },
  amber: {
    id: 'amber',
    name: 'Solar Flare',
    accent: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)',
    gradientText: 'from-amber-400 via-orange-500 to-rose-500',
    buttonGradient: 'from-amber-500 via-orange-600 to-rose-600 hover:from-amber-400 hover:to-rose-500',
    haloGradient: 'from-amber-500/50 via-orange-500/40 to-rose-500/40 dark:from-amber-500 dark:via-orange-500 dark:to-rose-500',
    textAccent: 'text-amber-600 dark:text-amber-400',
    textAccentHover: 'hover:text-amber-600 dark:hover:text-amber-400',
    bgAccent: 'bg-amber-500',
    borderAccent: 'border-amber-500',
    ringAccent: 'ring-amber-500',
    badgeBg: 'bg-amber-500/10',
    badgeText: 'text-amber-600 dark:text-amber-300',
    badgeBorder: 'border-amber-500/20',
    blobColors: {
      b1: 'bg-amber-500/12 dark:bg-amber-900/30',
      b2: 'bg-orange-500/12 dark:bg-orange-900/25',
      b3: 'bg-rose-500/10 dark:bg-rose-900/20',
    },
  },
  blue: {
    id: 'blue',
    name: 'Sapphire Deep Space',
    accent: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #a855f7 100%)',
    gradientText: 'from-blue-500 via-indigo-500 to-purple-500',
    buttonGradient: 'from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500',
    haloGradient: 'from-blue-500/50 via-indigo-500/40 to-purple-500/40 dark:from-blue-500 dark:via-indigo-500 dark:to-purple-500',
    textAccent: 'text-blue-600 dark:text-blue-400',
    textAccentHover: 'hover:text-blue-600 dark:hover:text-blue-400',
    bgAccent: 'bg-blue-600',
    borderAccent: 'border-blue-500',
    ringAccent: 'ring-blue-500',
    badgeBg: 'bg-blue-500/10',
    badgeText: 'text-blue-600 dark:text-blue-300',
    badgeBorder: 'border-blue-500/20',
    blobColors: {
      b1: 'bg-blue-500/12 dark:bg-blue-900/30',
      b2: 'bg-indigo-500/12 dark:bg-indigo-900/25',
      b3: 'bg-purple-500/10 dark:bg-purple-900/20',
    },
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Slate',
    accent: '#64748b',
    gradient: 'linear-gradient(135deg, #64748b 0%, #475569 50%, #334155 100%)',
    gradientText: 'from-slate-400 via-slate-500 to-zinc-400',
    buttonGradient: 'from-slate-700 to-zinc-800 hover:from-slate-600 hover:to-zinc-700',
    haloGradient: 'from-slate-500/50 via-zinc-500/40 to-slate-400/40 dark:from-slate-600 dark:via-zinc-500 dark:to-slate-400',
    textAccent: 'text-slate-600 dark:text-slate-400',
    textAccentHover: 'hover:text-slate-600 dark:hover:text-slate-400',
    bgAccent: 'bg-slate-600',
    borderAccent: 'border-slate-500',
    ringAccent: 'ring-slate-500',
    badgeBg: 'bg-slate-500/10',
    badgeText: 'text-slate-600 dark:text-slate-300',
    badgeBorder: 'border-slate-500/20',
    blobColors: {
      b1: 'bg-slate-500/12 dark:bg-slate-900/30',
      b2: 'bg-zinc-500/12 dark:bg-zinc-900/25',
      b3: 'bg-neutral-500/10 dark:bg-neutral-900/20',
    },
  },
};

export const getThemePreset = (preset?: ThemePreset): PresetDetails => {
  if (preset && PRESETS[preset]) {
    return PRESETS[preset];
  }
  return PRESETS.purple;
};
