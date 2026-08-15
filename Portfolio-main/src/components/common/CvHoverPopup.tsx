import React from 'react';
import { FileText, Download, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface CvHoverPopupProps {
  position: { x: number; y: number } | null;
  isVisible: boolean;
}

export const CvHoverPopup: React.FC<CvHoverPopupProps> = ({ position, isVisible }) => {
  const { data } = usePortfolio();
  const cv = data.cv;

  if (!isVisible || !position || !cv.previewEnabled) return null;

  // Keep within window boundaries
  const width = 320;
  const height = 360;
  let left = position.x + 20;
  let top = position.y + 20;

  if (typeof window !== 'undefined') {
    if (left + width > window.innerWidth - 20) {
      left = position.x - width - 15;
    }
    if (top + height > window.innerHeight - 20) {
      top = Math.max(20, window.innerHeight - height - 20);
    }
  }

  return (
    <div
      style={{ left: `${left}px`, top: `${top}px` }}
      className="fixed z-50 pointer-events-none transition-all duration-200 transform animate-in fade-in zoom-in-95"
    >
      <div className="w-80 rounded-2xl overflow-hidden border border-purple-500/30 bg-slate-900/85 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_25px_rgba(168,85,247,0.25)] text-white">
        {/* Glass Header */}
        <div className="px-4 py-3 bg-gradient-to-r from-purple-900/50 to-pink-900/40 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-tight text-purple-200">Curriculum Vitae</p>
              <p className="text-[10px] text-slate-400 font-mono truncate max-w-[150px]">{cv.filename}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-2.5 h-2.5" /> Verified
          </span>
        </div>

        {/* Mini Document Preview Pane */}
        <div className="p-4 space-y-3 bg-slate-950/40">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">Kha. Mo. Syeed Asif</span>
              <span className="text-[10px] text-purple-400 font-medium">Undergraduate 2026</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Specialized in RAG systems, PyTorch Deep Learning, and Full-Stack scalable application architectures.
            </p>
            
            <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
              <span className="text-[9px] px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 font-medium">PyTorch</span>
              <span className="text-[9px] px-2 py-0.5 rounded-md bg-pink-500/20 text-pink-300 border border-pink-500/30 font-medium">FAISS RAG</span>
              <span className="text-[9px] px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 font-medium">React & FastAPI</span>
              <span className="text-[9px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">Robotics Lead</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300">
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <p className="text-slate-400 text-[9px]">Institution</p>
              <p className="font-semibold truncate">East West University</p>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <p className="text-slate-400 text-[9px]">Role</p>
              <p className="font-semibold truncate">EWURC Executive</p>
            </div>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2.5 bg-slate-900/90 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1 text-purple-300">
            <Sparkles className="w-3 h-3 text-yellow-400" /> Click to view & download
          </span>
          <Download className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
    </div>
  );
};
