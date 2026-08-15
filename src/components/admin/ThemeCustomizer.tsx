import React from 'react';
import { 
  Palette, 
  Sparkles, 
  Moon, 
  Sun, 
  Sliders, 
  Check, 
  Layers 
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ThemePreset } from '../../types';

export const ThemeCustomizer: React.FC = () => {
  const { data, updateTheme, showToast } = usePortfolio();
  const theme = data.theme;

  const presets: { id: ThemePreset; name: string; gradient: string; accent: string; previewClass: string }[] = [
    {
      id: 'purple',
      name: 'Cyberpunk Neon',
      gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #3b82f6 100%)',
      accent: '#a855f7',
      previewClass: 'from-purple-600 via-pink-600 to-blue-600',
    },
    {
      id: 'cyan',
      name: 'Electric Cyan',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
      accent: '#06b6d4',
      previewClass: 'from-cyan-500 via-blue-600 to-purple-600',
    },
    {
      id: 'emerald',
      name: 'Emerald Aurora',
      gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #6366f1 100%)',
      accent: '#10b981',
      previewClass: 'from-emerald-500 via-teal-500 to-indigo-600',
    },
    {
      id: 'rose',
      name: 'Sunset Rose',
      gradient: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #f59e0b 100%)',
      accent: '#f43f5e',
      previewClass: 'from-rose-500 via-pink-500 to-amber-500',
    },
    {
      id: 'amber',
      name: 'Solar Flare',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)',
      accent: '#f59e0b',
      previewClass: 'from-amber-500 via-red-500 to-pink-500',
    },
    {
      id: 'blue',
      name: 'Sapphire Deep Space',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #a855f7 100%)',
      accent: '#3b82f6',
      previewClass: 'from-blue-600 via-indigo-600 to-purple-600',
    },
  ];

  const handleSelectPreset = (p: typeof presets[0]) => {
    updateTheme({
      preset: p.id,
      accentColor: p.accent,
      accentGradient: p.gradient,
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/20 mb-2">
            <Palette className="w-3.5 h-3.5" />
            <span>Theme & Visual Styling</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Color Palettes, Mode & Glassmorphism Blur
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Customize primary lighting, gradient accents, and component corner radii.
          </p>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-purple-400">
          Accent Color Palettes
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {presets.map((preset) => {
            const isSelected = theme.preset === preset.id;

            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`p-4 rounded-2xl border text-left transition-all relative group flex flex-col justify-between ${
                  isSelected
                    ? 'border-purple-500 bg-purple-950/40 shadow-xl shadow-purple-500/20 ring-1 ring-purple-500'
                    : 'bg-slate-950/60 border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-white">{preset.name}</span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div className={`h-8 rounded-xl bg-gradient-to-r ${preset.previewClass} shadow-md`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dark / Light Mode & Glass Settings */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Mode Toggle */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-pink-400">
            Lighting Theme Mode
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => updateTheme({ mode: 'dark' })}
              className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                theme.mode === 'dark'
                  ? 'border-purple-500 bg-purple-950/50 text-white'
                  : 'bg-slate-950/40 border-white/10 text-slate-400'
              }`}
            >
              <Moon className="w-6 h-6 text-purple-400" />
              <span className="text-xs font-bold">Dark Mode (Default)</span>
            </button>

            <button
              onClick={() => updateTheme({ mode: 'light' })}
              className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                theme.mode === 'light'
                  ? 'border-purple-500 bg-purple-950/50 text-white'
                  : 'bg-slate-950/40 border-white/10 text-slate-400'
              }`}
            >
              <Sun className="w-6 h-6 text-yellow-400" />
              <span className="text-xs font-bold">Light Mode</span>
            </button>
          </div>
        </div>

        {/* Border Radius */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-blue-400">
            Corner Rounding (Radius)
          </h3>

          <div className="grid grid-cols-3 gap-2">
            {(['rounded-xl', 'rounded-2xl', 'rounded-3xl'] as const).map((r) => (
              <button
                key={r}
                onClick={() => updateTheme({ borderRadius: r })}
                className={`py-3 px-2 rounded-xl border text-xs font-semibold text-center transition-all ${
                  theme.borderRadius === r
                    ? 'border-purple-500 bg-purple-600/30 text-white'
                    : 'bg-slate-950/40 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {r.replace('rounded-', '').toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
