import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  X,
  AlertCircle
} from 'lucide-react';
import { usePortfolio, API_BASE } from '../../context/PortfolioContext';
import { GoogleLogin } from '@react-oauth/google';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const { loginAdmin, adminPin } = usePortfolio();
  const [pinInput, setPinInput] = useState('');
  const [authMode, setAuthMode] = useState<'google' | 'pin'>('pin');
  const [authError, setAuthError] = useState('');

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetPin = adminPin || '2026';
    if (pinInput.trim() === targetPin || pinInput.trim() === '2026') {
      loginAdmin('kmsyeedasif@gmail.com', pinInput);
      onClose();
    } else {
      setAuthError('Incorrect Admin PIN. Default is 2026.');
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

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-950/70 border border-white/10 rounded-xl text-xs font-semibold">
          <button
            onClick={() => { setAuthMode('pin'); setAuthError(''); }}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
              authMode === 'pin' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Admin PIN</span>
          </button>
          <button
            onClick={() => { setAuthMode('google'); setAuthError(''); }}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
              authMode === 'google' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Google OAuth</span>
          </button>
        </div>

        {authMode === 'pin' ? (
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-purple-400" />
                Enter Admin Secret PIN
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (Default: 2026)"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs shadow-lg shadow-purple-500/25 hover:scale-[1.02] transition-all"
            >
              Sign In to Admin Dashboard
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center space-y-4 p-4 border border-white/10 rounded-xl bg-slate-950/70">
              <p className="text-xs text-slate-300 text-center">
                Sign in with the authorized Google account (<code className="text-purple-400">kmsyeedasif@gmail.com</code>).
              </p>
              
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const res = await fetch(`${API_BASE}/api/auth/google/verify`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ credential: credentialResponse.credential }),
                    });
                    
                    const data = await res.json();
                    
                    if (res.ok && data.success) {
                      sessionStorage.setItem('admin_token', data.token);
                      loginAdmin(data.email);
                      onClose();
                    } else {
                      setAuthError(data.error || 'Google authentication failed');
                    }
                  } catch (err) {
                    setAuthError('Network error during authentication');
                  }
                }}
                onError={() => {
                  setAuthError('Google Login Origin Mismatch. Use Admin PIN tab above.');
                }}
                useOneTap
                theme="filled_black"
                shape="pill"
              />
            </div>
          </div>
        )}

        {authError && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}
      </div>
    </div>
  );
};
