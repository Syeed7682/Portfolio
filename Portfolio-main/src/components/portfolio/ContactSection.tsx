import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  Sparkles, 
  MessageSquare,
  ArrowRight,
  Phone
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const ContactSection: React.FC = () => {
  const { data, sendMessage, showToast } = usePortfolio();
  const sectionConfig = data.sections.find(s => s.id === 'contact');
  const hero = data.hero;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (sectionConfig && !sectionConfig.isVisible) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await sendMessage(name, email, subject || 'General Inquiry', message);
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      showToast('Could not send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(hero.email);
    setCopiedEmail(true);
    showToast('Email address copied to clipboard!', 'info');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 uppercase tracking-wider">
            <MessageSquare className="w-3 h-3 text-purple-400" />
            <span>{sectionConfig?.badgeTitle || 'Get In Touch'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            {sectionConfig?.heading || "Let's Connect"}
          </h2>
          {sectionConfig?.subtitle && (
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              {sectionConfig.subtitle}
            </p>
          )}
        </div>

        {/* Form & Info Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-lg space-y-6">
              <h3 className="text-2xl font-bold text-slate-950 dark:text-white">
                Direct Channels
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                Whether you have an inquiry regarding collaborative AI research, full-stack application development, or speaking engagements, I look forward to connecting with you.
              </p>

              {/* Email Card */}
              <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center justify-between group hover:border-purple-500/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Email</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white font-mono">{hero.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-purple-400 transition-colors"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Location</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{hero.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xl relative overflow-hidden">
              {/* Decorative Blur Bubble */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Your Name <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Alex Johnson"
                      className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Your Email <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. RAG Research Collaboration / Project Consultation"
                    className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Message <span className="text-pink-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project, timeline, or research topic..."
                    className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>

                {isSubmitted && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold text-center animate-in fade-in">
                    Message sent successfully! Syeed Asif will get back to you shortly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
