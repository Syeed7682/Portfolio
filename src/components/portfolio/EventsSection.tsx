import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Calendar, 
  Building, 
  Maximize2, 
  Sparkles, 
  Play,
  Pencil,
  Trash2,
  Plus,
  X,
  Upload,
  Check,
  Link as LinkIcon,
  Image as ImageIcon
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { EventAchievement } from '../../types';

export const EventsSection: React.FC = () => {
  const { data, openMediaModal, isAdmin, addEvent, updateEvent, deleteEvent, showToast } = usePortfolio();
  const sectionConfig = data.sections.find(s => s.id === 'events');
  const [filter, setFilter] = useState<'all' | 'events' | 'certificates' | 'awards'>('all');

  // Modal State for Adding / Editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EventAchievement | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<EventAchievement, '_id'>>({
    title: '',
    description: '',
    image: '',
    category: 'events',
    date: '',
    organization: '',
    credentialUrl: '',
  });

  if (sectionConfig && !sectionConfig.isVisible) return null;

  const events = data.events;

  const filteredEvents = events.filter(e => {
    if (filter === 'all') return true;
    return e.category === filter;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      category: filter === 'all' ? 'events' : filter,
      date: new Date().getFullYear().toString(),
      organization: '',
      credentialUrl: '',
    });
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (item: EventAchievement, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image,
      category: item.category || 'events',
      date: item.date || '',
      organization: item.organization || '',
      credentialUrl: item.credentialUrl || '',
    });
    setIsEditModalOpen(true);
  };

  const handleFileUpload = (file: File) => {
    if (file.size > 15 * 1024 * 1024) {
      showToast('File size is too large (max 15MB)', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Title is required', 'error');
      return;
    }

    if (editingItem) {
      updateEvent(editingItem._id, formData);
    } else {
      addEvent(formData);
    }
    setIsEditModalOpen(false);
  };

  const handleDelete = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteEvent(id);
    }
  };

  return (
    <section id="events" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 uppercase tracking-wider">
            <Trophy className="w-3 h-3 text-purple-400" />
            <span>{sectionConfig?.badgeTitle || 'Milestones'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            {sectionConfig?.heading || 'Events & Achievements'}
          </h2>
          {sectionConfig?.subtitle && (
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              {sectionConfig.subtitle}
            </p>
          )}
        </div>

        {/* Filter Pills & Admin Add Button */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-md">
            {(['all', 'events', 'awards', 'certificates'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                  filter === cat
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Milestones' : cat}
              </button>
            ))}
          </div>

          {isAdmin && (
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-purple-500/20 hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event / Award / Certificate</span>
            </button>
          )}
        </div>

        {/* Grid Cards */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl bg-white/40 dark:bg-slate-900/40 border border-slate-200/60 dark:border-white/5 backdrop-blur-xl">
            <Trophy className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-3 opacity-50" />
            <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">No items found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">There are no {filter !== 'all' ? filter : 'milestones'} to display currently.</p>
            {isAdmin && (
              <button
                onClick={handleOpenAdd}
                className="mt-4 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold"
              >
                Add the first one
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((item) => {
              const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(item.image);

              return (
                <div
                  key={item._id}
                  className="group cursor-pointer rounded-3xl overflow-hidden bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/15 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Media Container */}
                  <div
                    className="relative h-60 w-full overflow-hidden bg-slate-950"
                    onClick={() => openMediaModal({
                      title: item.title,
                      description: item.description,
                      image: item.image,
                      date: item.date,
                      category: item.category,
                      organization: item.organization,
                    })}
                  >
                    {isVideo ? (
                      <video
                        src={item.image}
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    )}

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Category Pill */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-purple-300 border border-purple-500/30">
                        {item.category === 'events' ? 'Event' : item.category === 'awards' ? 'Award' : 'Certificate'}
                      </span>
                    </div>

                    {isVideo && (
                      <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-purple-600/80 text-white flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 fill-white" />
                      </div>
                    )}

                    {/* Bottom title text overlay */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
                      <h3 className="text-base font-bold text-white leading-snug group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between text-[11px] text-slate-300 font-light">
                        <span>{item.organization || item.date}</span>
                        <span className="flex items-center gap-1 text-purple-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Details</span>
                          <Maximize2 className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="p-5 bg-white/40 dark:bg-slate-900/40 border-t border-slate-200/50 dark:border-white/5 space-y-3">
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed font-light">
                      {item.description}
                    </p>

                    {/* Admin Edit & Delete Buttons */}
                    {isAdmin && (
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-200/50 dark:border-white/5">
                        <button
                          onClick={(e) => handleOpenEdit(item, e)}
                          className="flex-1 px-3 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500 text-blue-600 dark:text-blue-400 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={(e) => handleDelete(item._id, item.title, e)}
                          className="flex-1 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-600 dark:text-red-400 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ADMIN EDIT / ADD MODAL */}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsEditModalOpen(false)}
            />

            {/* Modal Dialog */}
            <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-900/95 backdrop-blur-2xl shadow-2xl p-6 sm:p-8 text-white space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {editingItem ? 'Edit Milestone / Achievement' : 'Add New Milestone / Award / Certificate'}
                    </h3>
                    <p className="text-xs text-slate-400">Fill in details and upload an image or video.</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. EWU National RoboFest 2026 / Champion Award"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* Category & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="events">Event / Fest</option>
                      <option value="awards">Award / Finalist</option>
                      <option value="certificates">Certificate</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Date / Year</label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      placeholder="e.g. 2024 or Nov 2024"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Organization & Credential Link */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Organization / Issuer</label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                      placeholder="e.g. East West University Robotics Club"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Credential / Verification URL (Optional)</label>
                    <input
                      type="text"
                      value={formData.credentialUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, credentialUrl: e.target.value }))}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Media Upload & URL */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Media (Image or Video)</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="file"
                      id="event-modal-file"
                      accept="image/*,video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('event-modal-file')?.click()}
                      className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors"
                    >
                      <Upload className="w-4 h-4 text-purple-400" />
                      <span>Upload File (Max 15MB)</span>
                    </button>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="Or enter Image / Video URL / path"
                      className="flex-grow px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Preview */}
                  {formData.image && (
                    <div className="relative h-36 w-full rounded-xl overflow-hidden bg-slate-950 border border-white/10 mt-2">
                      {/\.(mp4|webm|ogg|mov)$/i.test(formData.image) ? (
                        <video src={formData.image} controls className="w-full h-full object-contain" />
                      ) : (
                        <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
                      )}
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Description</label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Provide details about the event, role, or achievement..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                {/* Modal Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-all"
                  >
                    <Check className="w-4 h-4" />
                    <span>{editingItem ? 'Save Changes' : 'Publish Milestone'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
