import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  KeyRound, 
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const { loginAdmin, showToast } = usePortfolio();
  const [emailInput, setEmailInput] = useState('kmsyeedasif@gmail.com');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  if (!isOpen) return null;

  const handleGoogleMockLogin = () => {
    loginAdmin('kmsyeedasif@gmail.com');
    onClose();
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Allow authorized email or admin password
    if (emailInput.toLowerCase().trim() === 'kmsyeedasif@gmail.com' || passwordInput === 'admin' || passwordInput === 'asif2026') {
      loginAdmin(emailInput);
      onClose();
    } else {
      setAuthError('Unauthorized email or password. Use kmsyeedasif@gmail.com or Quick Access.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl transition-opacity" 
        onClick={onClose} 
      />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/90 backdrop-blur-2xl p-8 shadow-2xl text-white space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Admin Access</h2>
              <p className="text-xs text-slate-400">Portfolio & Site Customizer</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick 1-Click Access for Reviewer & Owner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-blue-900/40 border border-purple-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              Verified Authorized Account
            </span>
            <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-mono">
              kmsyeedasif@gmail.com
            </span>
          </div>

          <button
            onClick={handleGoogleMockLogin}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-md shadow-purple-500/30 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Sign In as Syeed Asif (Instant Access)</span>
          </button>
        </div>

        <div className="relative text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
          <span className="relative px-3 bg-slate-900 text-[11px] text-slate-500 uppercase tracking-wider">or sign in with credentials</span>
        </div>

        {/* Form */}
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Authorized Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="kmsyeedasif@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Access Key / PIN</label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password or leave blank for authorized email"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <span>Authenticate Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
