import React, { useState } from 'react';
import { 
  GripVertical, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  Edit3, 
  Check, 
  Sparkles,
  Layout,
  RefreshCcw
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionConfig } from '../../types';

export const LayoutCustomizer: React.FC = () => {
  const { data, reorderSections, toggleSectionVisibility, updateSectionHeading, showToast } = usePortfolio();
  const [sections, setSections] = useState<SectionConfig[]>(data.sections);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ label: string; heading: string; badgeTitle: string; subtitle: string }>({
    label: '',
    heading: '',
    badgeTitle: '',
    subtitle: '',
  });

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Sync state if context changes
  React.useEffect(() => {
    setSections(data.sections);
  }, [data.sections]);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const updated = [...sections];
    const item = updated.splice(draggedIndex, 1)[0];
    updated.splice(index, 0, item);

    // update orders
    const reordered = updated.map((sec, idx) => ({ ...sec, order: idx }));
    setSections(reordered);
    setDraggedIndex(index);
    reorderSections(reordered);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    const reordered = updated.map((sec, idx) => ({ ...sec, order: idx }));
    setSections(reordered);
    reorderSections(reordered);
  };

  const moveDown = (index: number) => {
    if (index === sections.length - 1) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    const reordered = updated.map((sec, idx) => ({ ...sec, order: idx }));
    setSections(reordered);
    reorderSections(reordered);
  };

  const startEditing = (sec: SectionConfig) => {
    setEditingSectionId(sec.id);
    setEditForm({
      label: sec.label,
      heading: sec.heading,
      badgeTitle: sec.badgeTitle || '',
      subtitle: sec.subtitle || '',
    });
  };

  const saveEditing = (sectionId: string) => {
    updateSectionHeading(sectionId, {
      label: editForm.label,
      heading: editForm.heading,
      badgeTitle: editForm.badgeTitle,
      subtitle: editForm.subtitle,
    });
    setEditingSectionId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
            <Layout className="w-3.5 h-3.5" />
            <span>Drag-and-Drop Builder</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Real-Time Site Layout & Section Architecture
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Drag sections to reorder how they appear on your live portfolio, toggle visibility, and edit headings in real time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
            Live Sync Active
          </span>
        </div>
      </div>

      {/* Drag and Drop List */}
      <div className="space-y-3">
        {sections.map((section, index) => {
          const isEditing = editingSectionId === section.id;

          return (
            <div
              key={section.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
                draggedIndex === index
                  ? 'border-purple-500 bg-purple-950/40 shadow-2xl scale-[1.01]'
                  : section.isVisible
                  ? 'bg-slate-900/70 border-white/10 hover:border-purple-500/40'
                  : 'bg-slate-950/50 border-white/5 opacity-60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Drag Handle & Section Name */}
                <div className="flex items-center gap-3">
                  <div
                    className="cursor-grab active:cursor-grabbing p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    title="Drag to reorder"
                  >
                    <GripVertical className="w-5 h-5" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-purple-600/20 text-purple-400 text-xs font-mono flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white tracking-tight">
                          {section.label}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                          #{section.id}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate max-w-[280px] sm:max-w-md">
                        {section.heading}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Controls */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  {/* Up / Down buttons */}
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-slate-300 hover:text-white transition-colors"
                    title="Move up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === sections.length - 1}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-slate-300 hover:text-white transition-colors"
                    title="Move down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>

                  {/* Toggle Visibility */}
                  <button
                    onClick={() => toggleSectionVisibility(section.id)}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      section.isVisible
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                        : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                    }`}
                    title={section.isVisible ? 'Hide Section' : 'Show Section'}
                  >
                    {section.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span className="hidden md:inline">{section.isVisible ? 'Visible' : 'Hidden'}</span>
                  </button>

                  {/* Edit Headings */}
                  <button
                    onClick={() => isEditing ? saveEditing(section.id) : startEditing(section)}
                    className="p-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    {isEditing ? <Check className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    <span>{isEditing ? 'Save' : 'Edit Text'}</span>
                  </button>
                </div>
              </div>

              {/* Inline Edit Panel */}
              {isEditing && (
                <div className="mt-4 pt-4 border-t border-white/10 grid sm:grid-cols-2 gap-4 animate-in fade-in">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-400 uppercase">Navbar Label</label>
                    <input
                      type="text"
                      value={editForm.label}
                      onChange={(e) => setEditForm(prev => ({ ...prev, label: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-400 uppercase">Badge Pill Title</label>
                    <input
                      type="text"
                      value={editForm.badgeTitle}
                      onChange={(e) => setEditForm(prev => ({ ...prev, badgeTitle: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[11px] font-semibold text-slate-400 uppercase">Main Section Heading</label>
                    <input
                      type="text"
                      value={editForm.heading}
                      onChange={(e) => setEditForm(prev => ({ ...prev, heading: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[11px] font-semibold text-slate-400 uppercase">Subtitle Description</label>
                    <input
                      type="text"
                      value={editForm.subtitle}
                      onChange={(e) => setEditForm(prev => ({ ...prev, subtitle: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setEditingSectionId(null)}
                      className="px-4 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => saveEditing(section.id)}
                      className="px-5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-md shadow-purple-500/30"
                    >
                      Save Section Text
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
