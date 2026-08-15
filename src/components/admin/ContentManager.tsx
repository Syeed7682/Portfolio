import React, { useState } from 'react';
import { 
  FolderGit2, 
  BookOpen, 
  Trophy, 
  Briefcase, 
  Code, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Upload, 
  ExternalLink,
  Search,
  Tag,
  X
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project, Publication, EventAchievement, ExperienceItem, SkillCategory } from '../../types';

export const ContentManager: React.FC = () => {
  const { 
    data, 
    addProject, 
    updateProject, 
    deleteProject,
    addPublication,
    updatePublication,
    deletePublication,
    addEvent,
    updateEvent,
    deleteEvent,
    addExperience,
    updateExperience,
    deleteExperience,
    updateSkillCategories,
    showToast
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'projects' | 'publications' | 'events' | 'experience' | 'skills'>('projects');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states for creating/editing
  const [projectForm, setProjectForm] = useState<Omit<Project, '_id'>>({
    title: '',
    description: '',
    image: '',
    type: 'AI Model',
    link: '',
    githubUrl: '',
    tags: ['Python', 'PyTorch'],
    metrics: '',
    featured: true,
  });
  const [tagInput, setTagInput] = useState('');

  const [pubForm, setPubForm] = useState<Omit<Publication, '_id'>>({
    title: '',
    description: '',
    authors: 'Kha. Mo. Syeed Asif',
    conference: 'IEEE QPAIN 2025',
    year: 2025,
    link: '',
    doi: '',
    tags: ['AI', 'Medical Vision'],
  });

  const [eventForm, setEventForm] = useState<Omit<EventAchievement, '_id'>>({
    title: '',
    description: '',
    image: '',
    category: 'events',
    date: '2024',
    organization: 'East West University',
  });

  const [expForm, setExpForm] = useState<Omit<ExperienceItem, '_id'>>({
    title: '',
    institution: '',
    period: '2024 - Present',
    type: 'Experience',
    description: '',
    tags: [],
  });

  // Handle Image Upload Helper
  const handleFileUpload = (file: File, callback: (base64: string) => void) => {
    if (file.size > 15 * 1024 * 1024) {
      showToast('File size is too large (max 15MB)', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Submit Project
  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title.trim()) return showToast('Title is required', 'error');

    if (editingId) {
      updateProject(editingId, projectForm);
      setEditingId(null);
    } else {
      addProject(projectForm);
    }
    resetProjectForm();
  };

  const resetProjectForm = () => {
    setEditingId(null);
    setProjectForm({
      title: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      type: 'AI Model',
      link: '',
      githubUrl: '',
      tags: ['Python', 'PyTorch'],
      metrics: '',
      featured: true,
    });
  };

  // Submit Publication
  const handlePubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pubForm.title.trim()) return showToast('Title is required', 'error');

    if (editingId) {
      updatePublication(editingId, pubForm);
      setEditingId(null);
    } else {
      addPublication(pubForm);
    }
    resetPubForm();
  };

  const resetPubForm = () => {
    setEditingId(null);
    setPubForm({
      title: '',
      description: '',
      authors: 'Kha. Mo. Syeed Asif',
      conference: '',
      year: new Date().getFullYear(),
      link: '',
      doi: '',
      tags: [],
    });
  };

  // Submit Event
  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title.trim()) return showToast('Title is required', 'error');

    if (editingId) {
      updateEvent(editingId, eventForm);
      setEditingId(null);
    } else {
      addEvent(eventForm);
    }
    resetEventForm();
  };

  const resetEventForm = () => {
    setEditingId(null);
    setEventForm({
      title: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      category: 'events',
      date: '2024',
      organization: 'East West University',
    });
  };

  // Submit Experience
  const handleExpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expForm.title.trim()) return showToast('Title is required', 'error');

    if (editingId) {
      updateExperience(editingId, expForm);
      setEditingId(null);
    } else {
      addExperience(expForm);
    }
    resetExpForm();
  };

  const resetExpForm = () => {
    setEditingId(null);
    setExpForm({
      title: '',
      institution: '',
      period: '',
      type: 'Experience',
      description: '',
      tags: [],
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Category Navigation Bar */}
      <div className="p-2 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-wrap gap-1.5">
        <button
          onClick={() => { setActiveTab('projects'); setEditingId(null); }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'projects'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>Projects ({data.projects.length})</span>
        </button>

        <button
          onClick={() => { setActiveTab('publications'); setEditingId(null); }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'publications'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Publications ({data.publications.length})</span>
        </button>

        <button
          onClick={() => { setActiveTab('events'); setEditingId(null); }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'events'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Events & Awards ({data.events.length})</span>
        </button>

        <button
          onClick={() => { setActiveTab('experience'); setEditingId(null); }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'experience'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Experience & Timeline ({data.experience.length})</span>
        </button>
      </div>

      {/* PROJECTS TAB */}
      {activeTab === 'projects' && (
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Form */}
          <div className="lg:col-span-5">
            <form onSubmit={handleProjectSubmit} className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 text-purple-400">
                <FolderGit2 className="w-4 h-4" />
                {editingId ? 'Edit Project Entry' : 'Add New Project'}
              </h3>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Project Title</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. MedRAG-VQA"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Project Category</label>
                <select
                  value={projectForm.type}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="AI Model">AI Model</option>
                  <option value="Computer Vision">Computer Vision</option>
                  <option value="RAG Systems">RAG Systems</option>
                  <option value="Web App">Web App</option>
                  <option value="Hardware / Robotics">Hardware / Robotics</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Description</label>
                <textarea
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the model or application..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              {/* Media File Upload or URL */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Project Banner Media</label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    id="proj-img-file"
                    accept="image/*,video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, (data) => setProjectForm(prev => ({ ...prev, image: data })));
                    }}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById('proj-img-file')?.click()}
                    className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 flex items-center justify-center gap-2"
                  >
                    <Upload className="w-3.5 h-3.5 text-purple-400" />
                    <span>Upload Image/Video File</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="Or paste media URL"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-[11px] text-slate-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">GitHub Link</label>
                  <input
                    type="text"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, githubUrl: e.target.value }))}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Live Demo Link</label>
                  <input
                    type="text"
                    value={projectForm.link}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, link: e.target.value }))}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Benchmark Metric / Highlight</label>
                <input
                  type="text"
                  value={projectForm.metrics}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, metrics: e.target.value }))}
                  placeholder="e.g. 94.2% Top-1 Accuracy"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={resetProjectForm}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-grow py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-500/30 flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingId ? 'Update Project' : 'Publish Project'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* List of existing projects */}
          <div className="lg:col-span-7 space-y-3">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Current Projects ({data.projects.length})</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-1">
              {data.projects.map((proj) => (
                <div
                  key={proj._id}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 overflow-hidden flex flex-col justify-between group"
                >
                  <div className="relative h-32 w-full overflow-hidden bg-slate-950">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-950/80 text-purple-300 border border-purple-500/30">
                      {proj.type}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="text-xs font-bold text-white truncate">{proj.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{proj.description}</p>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <button
                        onClick={() => {
                          setEditingId(proj._id);
                          setProjectForm({ ...proj });
                        }}
                        className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white text-[11px] font-bold transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProject(proj._id)}
                        className="px-3 py-1 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white text-[11px] font-bold transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PUBLICATIONS TAB */}
      {activeTab === 'publications' && (
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <form onSubmit={handlePubSubmit} className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 text-pink-400">
                <BookOpen className="w-4 h-4" />
                {editingId ? 'Edit Publication' : 'Add Research Publication'}
              </h3>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Paper Title</label>
                <input
                  type="text"
                  required
                  value={pubForm.title}
                  onChange={(e) => setPubForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Enhanced Multimodal Representation..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Authors</label>
                <input
                  type="text"
                  value={pubForm.authors}
                  onChange={(e) => setPubForm(prev => ({ ...prev, authors: e.target.value }))}
                  placeholder="Kha. Mo. Syeed Asif, et al."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Conference / Journal</label>
                  <input
                    type="text"
                    value={pubForm.conference}
                    onChange={(e) => setPubForm(prev => ({ ...prev, conference: e.target.value }))}
                    placeholder="IEEE QPAIN 2025"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Year</label>
                  <input
                    type="number"
                    value={pubForm.year}
                    onChange={(e) => setPubForm(prev => ({ ...prev, year: Number(e.target.value) }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Abstract Summary</label>
                <textarea
                  rows={3}
                  value={pubForm.description}
                  onChange={(e) => setPubForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief synopsis of findings and methodology..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Paper DOI / PDF Link</label>
                <input
                  type="text"
                  value={pubForm.link}
                  onChange={(e) => setPubForm(prev => ({ ...prev, link: e.target.value }))}
                  placeholder="https://doi.org/..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={resetPubForm}
                    className="px-4 py-2 rounded-xl bg-white/5 text-xs text-slate-300"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-grow py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                >
                  {editingId ? 'Update Publication' : 'Add Publication'}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {data.publications.map((pub) => (
              <div
                key={pub._id}
                className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded mr-2">
                      {pub.conference} &bull; {pub.year}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1">{pub.title}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingId(pub._id);
                        setPubForm({ ...pub });
                      }}
                      className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-bold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deletePublication(pub._id)}
                      className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 text-xs font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-400">{pub.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EVENTS & AWARDS TAB */}
      {activeTab === 'events' && (
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <form onSubmit={handleEventSubmit} className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 text-amber-400">
                <Trophy className="w-4 h-4" />
                {editingId ? 'Edit Event / Milestone' : 'Add Event / Award'}
              </h3>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Title</label>
                <input
                  type="text"
                  required
                  value={eventForm.title}
                  onChange={(e) => setEventForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. EWURC Robo Fest 2024"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Category</label>
                  <select
                    value={eventForm.category}
                    onChange={(e) => setEventForm(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="events">Event / Fest</option>
                    <option value="awards">Award / Finalist</option>
                    <option value="certificates">Certificate</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Date / Period</label>
                  <input
                    type="text"
                    value={eventForm.date}
                    onChange={(e) => setEventForm(prev => ({ ...prev, date: e.target.value }))}
                    placeholder="e.g. November 2024"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Organization</label>
                <input
                  type="text"
                  value={eventForm.organization}
                  onChange={(e) => setEventForm(prev => ({ ...prev, organization: e.target.value }))}
                  placeholder="East West University Robotics Club"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Media (File or URL)</label>
                <input
                  type="file"
                  id="event-img-file"
                  accept="image/*,video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, (data) => setEventForm(prev => ({ ...prev, image: data })));
                  }}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('event-img-file')?.click()}
                  className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 flex items-center justify-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5 text-purple-400" />
                  <span>Choose Image/Video File</span>
                </button>
                <input
                  type="text"
                  value={eventForm.image}
                  onChange={(e) => setEventForm(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="Or paste media URL"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-[11px] text-slate-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Description</label>
                <textarea
                  rows={3}
                  value={eventForm.description}
                  onChange={(e) => setEventForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={resetEventForm}
                    className="px-4 py-2 rounded-xl bg-white/5 text-xs text-slate-300"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-grow py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                >
                  {editingId ? 'Update Milestone' : 'Publish Milestone'}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-1">
            {data.events.map((ev) => (
              <div
                key={ev._id}
                className="rounded-2xl border border-white/10 bg-slate-900/70 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-32 bg-slate-950">
                  <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 text-purple-300">
                    {ev.category}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="text-xs font-bold text-white truncate">{ev.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{ev.description}</p>
                  <div className="flex justify-between pt-2 border-t border-white/5">
                    <button
                      onClick={() => {
                        setEditingId(ev._id);
                        setEventForm({ ...ev });
                      }}
                      className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-bold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEvent(ev._id)}
                      className="px-2.5 py-1 rounded bg-red-500/10 text-red-400 text-xs font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EXPERIENCE TAB */}
      {activeTab === 'experience' && (
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <form onSubmit={handleExpSubmit} className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 text-blue-400">
                <Briefcase className="w-4 h-4" />
                {editingId ? 'Edit Timeline Entry' : 'Add Experience / Education'}
              </h3>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Role / Degree Title</label>
                <input
                  type="text"
                  required
                  value={expForm.title}
                  onChange={(e) => setExpForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Associate Executive & Trainer"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Institution / Organization</label>
                <input
                  type="text"
                  required
                  value={expForm.institution}
                  onChange={(e) => setExpForm(prev => ({ ...prev, institution: e.target.value }))}
                  placeholder="East West University Robotics Club"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Type</label>
                  <select
                    value={expForm.type}
                    onChange={(e) => setExpForm(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Experience">Experience</option>
                    <option value="Education">Education</option>
                    <option value="Volunteering">Leadership & Volunteering</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Period</label>
                  <input
                    type="text"
                    value={expForm.period}
                    onChange={(e) => setExpForm(prev => ({ ...prev, period: e.target.value }))}
                    placeholder="2024 - Present"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Description</label>
                <textarea
                  rows={3}
                  value={expForm.description}
                  onChange={(e) => setExpForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={resetExpForm}
                    className="px-4 py-2 rounded-xl bg-white/5 text-xs text-slate-300"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-grow py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                >
                  {editingId ? 'Update Timeline' : 'Add to Timeline'}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {data.experience.map((exp) => (
              <div
                key={exp._id}
                className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 flex items-start justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                      {exp.type}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{exp.period}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">{exp.title}</h4>
                  <p className="text-xs text-purple-300 font-medium">{exp.institution}</p>
                  <p className="text-xs text-slate-400 mt-1">{exp.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setEditingId(exp._id);
                      setExpForm({ ...exp });
                    }}
                    className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-bold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteExperience(exp._id)}
                    className="px-2.5 py-1 rounded bg-red-500/10 text-red-400 text-xs font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
