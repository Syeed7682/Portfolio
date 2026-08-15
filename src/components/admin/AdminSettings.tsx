import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Shield, KeyRound, Mail, Save, AlertCircle } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { adminEmail, adminPin, updateAdminCredentials } = usePortfolio();
  
  const [email, setEmail] = useState(adminEmail);
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Verify current PIN before allowing changes
    if (currentPin !== adminPin) {
      setError('Current PIN is incorrect');
      return;
    }

    if (newPin && newPin !== confirmPin) {
      setError('New PINs do not match');
      return;
    }

    const pinToSave = newPin || adminPin; // Keep old PIN if not changing
    updateAdminCredentials(email, pinToSave);
    
    // Clear sensitive fields
    setCurrentPin('');
    setNewPin('');
    setConfirmPin('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Shield className="w-6 h-6 text-purple-500" />
          Admin Credentials
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Update your login email and PIN/password for the admin panel.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-xl space-y-6">
        
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 flex items-center gap-2 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none text-slate-900 dark:text-white transition-all"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <hr className="border-slate-200 dark:border-white/10" />

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Current PIN / Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="h-5 w-5" />
              </div>
              <input
                type="password"
                required
                value={currentPin}
                onChange={(e) => setCurrentPin(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none text-slate-900 dark:text-white transition-all"
                placeholder="Enter current PIN to authorize changes"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              New PIN / Password (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="h-5 w-5" />
              </div>
              <input
                type="password"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none text-slate-900 dark:text-white transition-all"
                placeholder="Leave blank to keep current PIN"
              />
            </div>
          </div>

          {newPin && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Confirm New PIN
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  required={!!newPin}
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none text-slate-900 dark:text-white transition-all"
                  placeholder="Re-enter new PIN"
                />
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={!currentPin || (!!newPin && !confirmPin)}
            className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
