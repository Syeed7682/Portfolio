import React, { useEffect } from 'react';
import { X, Calendar, Building, Tag, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const MediaLightbox: React.FC = () => {
  const { selectedMediaModal, closeMediaModal } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMediaModal();
    };
    if (selectedMediaModal?.isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedMediaModal, closeMediaModal]);

  if (!selectedMediaModal?.isOpen) return null;

  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(selectedMediaModal.image);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
        onClick={closeMediaModal}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 backdrop-blur-2xl shadow-2xl flex flex-col lg:flex-row text-white">
        {/* Close Button */}
        <button
          onClick={closeMediaModal}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Container */}
        <div className="lg:w-3/5 bg-black/95 flex items-center justify-center min-h-[320px] max-h-[500px] lg:max-h-[85vh] overflow-hidden">
          {isVideo ? (
            <video
              src={selectedMediaModal.image}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src={selectedMediaModal.image}
              alt={selectedMediaModal.title}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Info Column */}
        <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[400px] lg:max-h-[85vh] bg-slate-900/60">
          <div className="space-y-4">
            {selectedMediaModal.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
                <Tag className="w-3 h-3" />
                {selectedMediaModal.category}
              </span>
            )}

            <h3 className="text-2xl font-bold text-white tracking-tight leading-snug">
              {selectedMediaModal.title}
            </h3>

            <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full my-3" />

            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line font-light">
              {selectedMediaModal.description || 'No detailed description provided for this item.'}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 space-y-2 text-xs text-slate-400">
            {selectedMediaModal.organization && (
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-purple-400" />
                <span>{selectedMediaModal.organization}</span>
              </div>
            )}
            {selectedMediaModal.date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-pink-400" />
                <span>{selectedMediaModal.date}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
