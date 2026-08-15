import React, { useState } from 'react';
import { 
  User, 
  Sparkles, 
  Upload, 
  Link as LinkIcon, 
  Plus, 
  Trash2, 
  Check, 
  Github, 
  Linkedin, 
  Facebook, 
  Mail, 
  MapPin,
  Image as ImageIcon
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const HeroProfileEditor: React.FC = () => {
  const { data, updateHero, updateAbout, showToast } = usePortfolio();
  const [heroForm, setHeroForm] = useState(data.hero);
  const [aboutForm, setAboutForm] = useState(data.about);
  const [newTypewriterTitle, setNewTypewriterTitle] = useState('');

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHero(heroForm);
    updateAbout(aboutForm);
    showToast('Hero & About profile details saved successfully!', 'success');
  };

  const handleAddTypewriterTitle = () => {
    if (!newTypewriterTitle.trim()) return;
    setHeroForm(prev => ({
      ...prev,
      typewriterTitles: [...prev.typewriterTitles, newTypewriterTitle.trim()],
    }));
    setNewTypewriterTitle('');
  };

  const handleRemoveTypewriterTitle = (index: number) => {
    setHeroForm(prev => ({
      ...prev,
      typewriterTitles: prev.typewriterTitles.filter((_, idx) => idx !== index),
    }));
  };

  const handleProfileImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      showToast('Image file size must be under 15MB', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setHeroForm(prev => ({ ...prev, profileImageUrl: reader.result as string }));
        showToast('Profile image uploaded! Click Save to apply.', 'info');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCoverImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setAboutForm(prev => ({ ...prev, coverImageUrl: reader.result as string }));
        showToast('About cover image uploaded!', 'info');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSaveHero} className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
            <User className="w-3.5 h-3.5" />
            <span>Profile & Bio Studio</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Hero Information, Bio & Social Channels
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Update your public persona, animated typewriter titles, headshot photo, and background story.
          </p>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>Save Profile Changes</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Basic Details & Headshot */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-purple-400">
              Basic Identification
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Full Display Name</label>
              <input
                type="text"
                required
                value={heroForm.name}
                onChange={(e) => setHeroForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Greeting Prefix</label>
                <input
                  type="text"
                  value={heroForm.greetingText}
                  onChange={(e) => setHeroForm(prev => ({ ...prev, greetingText: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Availability Pill Badge</label>
                <input
                  type="text"
                  value={heroForm.availableBadgeText}
                  onChange={(e) => setHeroForm(prev => ({ ...prev, availableBadgeText: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Profile Headshot Photo Upload & URL */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-slate-300">Profile Photo (File or URL)</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-950 border-2 border-purple-500 shrink-0">
                  <img
                    src={heroForm.profileImageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow space-y-2">
                  <input
                    type="file"
                    id="profile-img-upload"
                    accept="image/*"
                    onChange={handleProfileImageFile}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById('profile-img-upload')?.click()}
                    className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 flex items-center justify-center gap-2"
                  >
                    <Upload className="w-3.5 h-3.5 text-purple-400" />
                    <span>Upload Image File</span>
                  </button>
                  <input
                    type="text"
                    value={heroForm.profileImageUrl}
                    onChange={(e) => setHeroForm(prev => ({ ...prev, profileImageUrl: e.target.value }))}
                    placeholder="Or paste image URL"
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-950/80 border border-white/10 text-[11px] text-slate-300 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Hero Bio */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-slate-300">Hero Bio Description</label>
              <textarea
                rows={3}
                value={heroForm.bio}
                onChange={(e) => setHeroForm(prev => ({ ...prev, bio: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>
          </div>

          {/* Typewriter Titles Tag Manager */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-purple-400">
              Typewriter Animated Titles
            </h3>
            <p className="text-xs text-slate-400">
              These rotating titles cycle continuously in the hero typewriter header.
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={newTypewriterTitle}
                onChange={(e) => setNewTypewriterTitle(e.target.value)}
                placeholder="e.g. AI Research Fellow"
                className="flex-grow px-4 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <button
                type="button"
                onClick={handleAddTypewriterTitle}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white flex items-center gap-1 shrink-0"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            <div className="space-y-2">
              {heroForm.typewriterTitles.map((title, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-white/5 text-xs text-slate-200"
                >
                  <span className="font-mono text-purple-300">{title}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTypewriterTitle(idx)}
                    className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: About Section & Social Links */}
        <div className="lg:col-span-6 space-y-6">
          {/* About Section Detailed Bio */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-pink-400">
              About Me Section Content
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">About Heading</label>
              <input
                type="text"
                value={aboutForm.heading}
                onChange={(e) => setAboutForm(prev => ({ ...prev, heading: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Paragraph 1</label>
              <textarea
                rows={3}
                value={aboutForm.paragraph1}
                onChange={(e) => setAboutForm(prev => ({ ...prev, paragraph1: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Paragraph 2</label>
              <textarea
                rows={3}
                value={aboutForm.paragraph2}
                onChange={(e) => setAboutForm(prev => ({ ...prev, paragraph2: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">About Cover Image (File or URL)</label>
              <div className="flex flex-col gap-2">
                {aboutForm.coverImageUrl && (
                  <div className="w-full h-32 rounded-xl overflow-hidden bg-slate-950 border border-white/10 shrink-0">
                    <img
                      src={aboutForm.coverImageUrl}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex gap-2 w-full">
                  <input
                    type="file"
                    id="cover-img-upload"
                    accept="image/*"
                    onChange={handleCoverImageFile}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById('cover-img-upload')?.click()}
                    className="w-1/3 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-slate-300 flex items-center justify-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5 text-pink-400" />
                    <span>Upload</span>
                  </button>
                  <input
                    type="text"
                    value={aboutForm.coverImageUrl}
                    onChange={(e) => setAboutForm(prev => ({ ...prev, coverImageUrl: e.target.value }))}
                    placeholder="Or paste image URL"
                    className="w-2/3 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-white/10 text-[11px] text-slate-300 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Links & Coordinates */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-blue-400">
              Contact & Social Channels
            </h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-purple-400" /> Contact Email
                </label>
                <input
                  type="email"
                  value={heroForm.email}
                  onChange={(e) => setHeroForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-pink-400" /> Location
                </label>
                <input
                  type="text"
                  value={heroForm.location}
                  onChange={(e) => setHeroForm(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-slate-400" /> GitHub URL
                </label>
                <input
                  type="text"
                  value={heroForm.githubUrl}
                  onChange={(e) => setHeroForm(prev => ({ ...prev, githubUrl: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" /> LinkedIn URL
                </label>
                <input
                  type="text"
                  value={heroForm.linkedinUrl}
                  onChange={(e) => setHeroForm(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Facebook className="w-3.5 h-3.5 text-[#1877f2]" /> Facebook URL
                </label>
                <input
                  type="text"
                  value={heroForm.facebookUrl}
                  onChange={(e) => setHeroForm(prev => ({ ...prev, facebookUrl: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
