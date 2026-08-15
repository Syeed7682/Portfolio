import React, { useState } from 'react';
import { 
  Layout, 
  User, 
  FolderGit2, 
  Palette, 
  FileText, 
  Inbox, 
  Database, 
  Eye, 
  LogOut, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Maximize2, 
  Minimize2,
  ChevronRight,
  Split
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { LayoutCustomizer } from './LayoutCustomizer';
import { HeroProfileEditor } from './HeroProfileEditor';
import { ContentManager } from './ContentManager';
import { ThemeCustomizer } from './ThemeCustomizer';
import { ResumeManager } from './ResumeManager';
import { MessagesInbox } from './MessagesInbox';
import { BackupSettings } from './BackupSettings';

interface AdminDashboardProps {
  onBackToPortfolio: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToPortfolio }) => {
  const { data, adminEmail, logoutAdmin } = usePortfolio();
  const [activeTab, setActiveTab] = useState<
    'layout' | 'profile' | 'content' | 'theme' | 'resume' | 'messages' | 'backup'
  >('layout');

  const unreadCount = data.messages.filter(m => !m.isRead).length;

  const navItems = [
    {
      id: 'layout',
      label: 'Drag & Drop Layout',
      icon: <Layout className="w-4 h-4" />,
      badge: `${data.sections.filter(s => s.isVisible).length} Active`,
    },
    {
      id: 'profile',
      label: 'Hero & Bio Studio',
      icon: <User className="w-4 h-4" />,
    },
    {
      id: 'content',
      label: 'Projects & Milestones',
      icon: <FolderGit2 className="w-4 h-4" />,
      badge: `${data.projects.length} Projs`,
    },
    {
      id: 'theme',
      label: 'Themes & Visuals',
      icon: <Palette className="w-4 h-4" />,
    },
    {
      id: 'resume',
      label: 'CV & Resume Control',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 'messages',
      label: 'Messages Inbox',
      icon: <Inbox className="w-4 h-4" />,
      badge: unreadCount > 0 ? `${unreadCount} New` : undefined,
      badgeColor: 'bg-purple-500 text-white',
    },
    {
      id: 'backup',
      label: 'Backup & Recovery',
      icon: <Database className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-slate-900/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-extrabold tracking-tight text-white leading-none">
                Admin <span className="text-purple-400">Studio</span>
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Sync
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">{adminEmail}</p>
          </div>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPortfolio}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-md shadow-purple-500/25 transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Portfolio</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 transition-all text-xs font-bold flex items-center gap-1.5"
            title="Log out of Admin"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Tabs */}
        <aside className="lg:col-span-3 space-y-2 sticky top-24">
          <div className="p-3 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full px-3.5 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                        item.badgeColor || (isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400')
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Summary Pill Card */}
          <div className="p-5 rounded-3xl bg-slate-900/40 border border-white/5 space-y-2 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Resume File:</span>
              <span className="text-emerald-400 font-mono truncate max-w-[110px]" title={data.cv.filename}>
                {data.cv.filename}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Theme Preset:</span>
              <span className="text-purple-400 capitalize">{data.theme.preset}</span>
            </div>
            <div className="flex justify-between">
              <span>Active Sections:</span>
              <span className="text-white font-mono">
                {data.sections.filter(s => s.isVisible).length} / {data.sections.length}
              </span>
            </div>
          </div>
        </aside>

        {/* Right Active Panel */}
        <main className="lg:col-span-9">
          {activeTab === 'layout' && <LayoutCustomizer />}
          {activeTab === 'profile' && <HeroProfileEditor />}
          {activeTab === 'content' && <ContentManager />}
          {activeTab === 'theme' && <ThemeCustomizer />}
          {activeTab === 'resume' && <ResumeManager />}
          {activeTab === 'messages' && <MessagesInbox />}
          {activeTab === 'backup' && <BackupSettings />}
        </main>
      </div>
    </div>
  );
};
