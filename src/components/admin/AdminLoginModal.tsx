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
import { usePortfolio, API_BASE } from '../../context/PortfolioContext';
import { GoogleLogin } from '@react-oauth/google';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const { loginAdmin } = usePortfolio();
  const [authError, setAuthError] = useState('');

  if (!isOpen) return null;

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

          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center space-y-4 p-4 border border-white/10 rounded-xl bg-slate-950/70">
              <p className="text-xs text-slate-300 text-center">
                Sign in with the authorized Google account to manage the portfolio.
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
                      // Store token in sessionStorage for persistence
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
                  setAuthError('Google Login Failed');
                }}
                useOneTap
                theme="filled_black"
                shape="pill"
              />
            </div>
          </div>

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
