import React, { useRef } from 'react';
import { 
  Database, 
  Download, 
  Upload, 
  RotateCcw, 
  ShieldAlert, 
  CheckCircle2,
  FileJson
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const BackupSettings: React.FC = () => {
  const { data, importConfig, resetToDefaults, showToast } = usePortfolio();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `syeed_asif_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Full portfolio configuration exported as JSON!', 'success');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        importConfig(parsed);
      } catch (err) {
        showToast('Invalid JSON backup file format', 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to restore all portfolio data to original default settings? Any custom unsaved changes will be reset.')) {
      resetToDefaults();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Database className="w-3.5 h-3.5" />
            <span>Data Vault & Backups</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Export, Import & Disaster Recovery
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Backup your entire website database, projects, and custom layout settings into a portable JSON file.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Export Card */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Export Full Config</h3>
            <p className="text-xs text-slate-400">
              Download your complete site content, images, messages, and theme preferences as a JSON file.
            </p>
          </div>

          <button
            onClick={handleExport}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-500/30 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON File</span>
          </button>
        </div>

        {/* Import Card */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Upload className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Import / Restore Backup</h3>
            <p className="text-xs text-slate-400">
              Load an existing JSON backup to restore all site records instantly.
            </p>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            accept=".json"
            onChange={handleImportFile}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Backup JSON</span>
          </button>
        </div>

        {/* Reset Card */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Reset to Default Data</h3>
            <p className="text-xs text-slate-400">
              Revert all fields, projects, and publication records to original verified authentic portfolio data.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="w-full py-3 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 font-bold text-xs transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restore Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
};
