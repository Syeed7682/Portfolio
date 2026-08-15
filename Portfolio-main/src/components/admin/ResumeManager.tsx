import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  FileDown, 
  Calendar,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const ResumeManager: React.FC = () => {
  const { data, updateCV, showToast } = usePortfolio();
  const cv = data.cv;

  const [filenameInput, setFilenameInput] = useState(cv.filename);
  const [urlInput, setUrlInput] = useState(cv.fileUrl || '');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      showToast('File is too large (max 15MB)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        updateCV({
          filename: file.name,
          uploadedAt: new Date().toISOString(),
          fileData: reader.result,
          fileUrl: reader.result,
          sizeBytes: file.size,
          previewEnabled: true,
        });
        setFilenameInput(file.name);
        showToast(`CV "${file.name}" uploaded & activated!`, 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateCV({
      filename: filenameInput,
      fileUrl: urlInput || cv.fileUrl,
    });
    showToast('CV metadata updated!', 'success');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>CV & Resume Control</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Curriculum Vitae Document & Hover Preview
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage your downloadable resume, frosted glass hover popup, and &quot;Hire Me&quot; navbar actions.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Upload & Live Status */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-purple-400">
              Active CV File Status
            </h3>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-mono truncate max-w-[220px]">
                    {cv.filename || 'No CV Uploaded'}
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Uploaded: {new Date(cv.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Ready
              </span>
            </div>

            {/* Upload Button */}
            <div className="space-y-2">
              <input
                type="file"
                id="cv-file-input"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => document.getElementById('cv-file-input')?.click()}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <Upload className="w-4 h-4" />
                <span>Upload New Resume / CV (PDF)</span>
              </button>
              <p className="text-[11px] text-slate-400 text-center">Supports PDF, DOC, DOCX up to 15MB</p>
            </div>

            {/* Toggle Hover Popup & Visibility */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white">Enable CV Hover Popup on Site</h4>
                <p className="text-[11px] text-slate-400">Displays glassmorphic document card on button hover.</p>
              </div>
              <button
                onClick={() => updateCV({ previewEnabled: !cv.previewEnabled })}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                  cv.previewEnabled
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-red-500/20 text-red-300 border-red-500/30'
                }`}
              >
                {cv.previewEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span>{cv.previewEnabled ? 'Enabled' : 'Disabled'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Metadata Form */}
        <div className="lg:col-span-6">
          <form onSubmit={handleSaveInfo} className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-pink-400">
              Download Settings & External Links
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Display Filename</label>
              <input
                type="text"
                value={filenameInput}
                onChange={(e) => setFilenameInput(e.target.value)}
                placeholder="Kha_Mo_Syeed_Asif_Resume_2026.pdf"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Custom Cloud / Drive Link</label>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://syeed-asif.pages.dev/resume.pdf"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10 transition-colors"
            >
              Update Resume Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
