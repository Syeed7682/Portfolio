import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PortfolioData, 
  Project, 
  Publication, 
  EventAchievement, 
  ExperienceItem, 
  SkillCategory, 
  ContactMessage, 
  CVMetadata, 
  SiteTheme,
  SectionConfig,
  HeroConfig,
  AboutConfig
} from '../types';
import { initialPortfolioData } from '../data/initialData';
import confetti from 'canvas-confetti';

const API_BASE = 'https://portfolio-2-afjx.onrender.com';

interface ToastInfo {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface PortfolioContextType {
  data: PortfolioData;
  isAdmin: boolean;
  adminEmail: string;
  adminPin: string;
  activeView: 'portfolio' | 'admin';
  toast: ToastInfo | null;
  isLoadingData: boolean;
  selectedMediaModal: {
    isOpen: boolean;
    title: string;
    description: string;
    image: string;
    date?: string;
    category?: string;
    organization?: string;
  } | null;
  // Actions
  loginAdmin: (email?: string) => void;
  logoutAdmin: () => void;
  setActiveView: (view: 'portfolio' | 'admin') => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  openMediaModal: (item: {
    title: string;
    description: string;
    image: string;
    date?: string;
    category?: string;
    organization?: string;
  }) => void;
  closeMediaModal: () => void;
  // Updaters
  updateTheme: (theme: Partial<SiteTheme>) => void;
  updateHero: (hero: Partial<HeroConfig>) => void;
  updateAbout: (about: Partial<AboutConfig>) => void;
  reorderSections: (newSections: SectionConfig[]) => void;
  toggleSectionVisibility: (sectionId: string) => void;
  updateSectionHeading: (sectionId: string, updates: Partial<SectionConfig>) => void;
  // Projects CRUD
  addProject: (project: Omit<Project, '_id'>) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  // Publications CRUD
  addPublication: (pub: Omit<Publication, '_id'>) => Promise<void>;
  updatePublication: (id: string, pub: Partial<Publication>) => Promise<void>;
  deletePublication: (id: string) => Promise<void>;
  // Events/Achievements CRUD
  addEvent: (event: Omit<EventAchievement, '_id'>) => Promise<void>;
  updateEvent: (id: string, event: Partial<EventAchievement>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  // Experience CRUD
  addExperience: (exp: Omit<ExperienceItem, '_id'>) => Promise<void>;
  updateExperience: (id: string, exp: Partial<ExperienceItem>) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  // Skills CRUD
  updateSkillCategories: (categories: SkillCategory[]) => void;
  // Messages & CV
  sendMessage: (name: string, email: string, subject: string, message: string) => Promise<boolean>;
  deleteMessage: (id: string) => void;
  markMessageRead: (id: string) => void;
  updateCV: (cv: Partial<CVMetadata>) => void;
  // Global Reset / Import / Export
  resetToDefaults: () => void;
  importConfig: (imported: PortfolioData) => void;
  // Admin Credentials
  updateAdminCredentials: (email: string, pin: string) => void;
}

const STORAGE_KEY = 'syeed_portfolio_data_v2';
const AUTH_KEY = 'syeed_portfolio_isAdmin';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with initial data to ensure all keys exist
        return {
          ...initialPortfolioData,
          ...parsed,
          theme: { ...initialPortfolioData.theme, ...(parsed.theme || {}) },
          hero: { ...initialPortfolioData.hero, ...(parsed.hero || {}) },
          about: { ...initialPortfolioData.about, ...(parsed.about || {}) },
          cv: { ...initialPortfolioData.cv, ...(parsed.cv || {}) },
          sections: parsed.sections || initialPortfolioData.sections,
          // Start with initial data for dynamic content; will be overwritten by API fetch
          projects: initialPortfolioData.projects,
          publications: initialPortfolioData.publications,
          events: initialPortfolioData.events,
          experience: initialPortfolioData.experience,
        };
      }
    } catch (e) {
      console.warn('Could not read saved portfolio data, using defaults', e);
    }
    return initialPortfolioData;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [adminEmail, setAdminEmail] = useState<string>(() => {
    return localStorage.getItem('syeed_admin_email') || 'kmsyeedasif@gmail.com';
  });
  const [adminPin, setAdminPin] = useState<string>(() => {
    return localStorage.getItem('syeed_admin_pin') || 'asif2026';
  });
  const [activeView, setActiveView] = useState<'portfolio' | 'admin'>('portfolio');
  const [toast, setToast] = useState<ToastInfo | null>(null);
  const [selectedMediaModal, setSelectedMediaModal] = useState<PortfolioContextType['selectedMediaModal']>(null);

  // Fetch live data from MongoDB on mount
  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/portfolio-data`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const live = await res.json();

        setData(prev => ({
          ...prev,
          projects: live.projects?.length ? live.projects : prev.projects,
          publications: live.publications?.length ? live.publications : prev.publications,
          events: [
            ...(live.events || []),
            ...(live.certs || []),
          ].length ? [...(live.events || []), ...(live.certs || [])] : prev.events,
          experience: live.experience?.length ? live.experience : prev.experience,
        }));
        console.log('[Portfolio] Live data loaded from MongoDB ✓');
      } catch (err) {
        console.warn('[Portfolio] Could not fetch live data, using local defaults:', err);
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchLiveData();
  }, []);

  // Sync theme/hero/about/sections to localStorage on changes
  useEffect(() => {
    try {
      const toSave = {
        theme: data.theme,
        hero: data.hero,
        about: data.about,
        cv: data.cv,
        sections: data.sections,
        skillCategories: data.skillCategories,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.error('Error saving portfolio data to storage', e);
    }
  }, [data.theme, data.hero, data.about, data.cv, data.sections, data.skillCategories]);

  // Apply dark mode class to document
  useEffect(() => {
    const isDark = data.theme.mode === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [data.theme.mode]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast(curr => (curr?.id === id ? null : curr));
    }, 4000);
  };

  const loginAdmin = (email = 'kmsyeedasif@gmail.com') => {
    setIsAdmin(true);
    setAdminEmail(email);
    sessionStorage.setItem(AUTH_KEY, 'true');
    showToast(`Welcome back, Syeed Asif! Admin Mode enabled.`, 'success');
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem(AUTH_KEY);
    setActiveView('portfolio');
    showToast('Logged out of Admin Panel', 'info');
  };

  const openMediaModal = (item: {
    title: string;
    description: string;
    image: string;
    date?: string;
    category?: string;
    organization?: string;
  }) => {
    setSelectedMediaModal({ isOpen: true, ...item });
  };

  const closeMediaModal = () => setSelectedMediaModal(null);

  // ─── Theme / Layout Updaters ─────────────────────────────────────────
  const updateTheme = (newTheme: Partial<SiteTheme>) => {
    setData(prev => ({ ...prev, theme: { ...prev.theme, ...newTheme } }));
    showToast('Theme updated in real-time!', 'success');
  };

  const updateHero = (heroUpdates: Partial<HeroConfig>) => {
    setData(prev => ({ ...prev, hero: { ...prev.hero, ...heroUpdates } }));
    showToast('Hero section updated!', 'success');
  };

  const updateAbout = (aboutUpdates: Partial<AboutConfig>) => {
    setData(prev => ({ ...prev, about: { ...prev.about, ...aboutUpdates } }));
    showToast('About section updated!', 'success');
  };

  const reorderSections = (newSections: SectionConfig[]) => {
    setData(prev => ({ ...prev, sections: newSections }));
    showToast('Layout order updated!', 'info');
  };

  const toggleSectionVisibility = (sectionId: string) => {
    setData(prev => ({
      ...prev,
      sections: prev.sections.map(sec =>
        sec.id === sectionId ? { ...sec, isVisible: !sec.isVisible } : sec
      ),
    }));
    showToast('Section visibility toggled', 'info');
  };

  const updateSectionHeading = (sectionId: string, updates: Partial<SectionConfig>) => {
    setData(prev => ({
      ...prev,
      sections: prev.sections.map(sec =>
        sec.id === sectionId ? { ...sec, ...updates } : sec
      ),
    }));
    showToast('Section header updated', 'success');
  };

  // ─── Projects CRUD (with MongoDB sync) ───────────────────────────────
  const addProject = async (project: Omit<Project, '_id'>) => {
    try {
      const res = await fetch(`${API_BASE}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      const saved = await res.json();
      const newProj: Project = { ...project, _id: saved._id || saved.insertedId || 'proj-' + Date.now(), createdAt: new Date().toISOString() };
      setData(prev => ({ ...prev, projects: [newProj, ...prev.projects] }));
      showToast(`Project "${project.title}" published!`, 'success');
    } catch {
      const newProj: Project = { ...project, _id: 'proj-' + Date.now(), createdAt: new Date().toISOString() };
      setData(prev => ({ ...prev, projects: [newProj, ...prev.projects] }));
      showToast(`Project "${project.title}" saved locally.`, 'info');
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p._id === id ? { ...p, ...updates } : p)),
    }));
    try {
      await fetch(`${API_BASE}/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
    } catch (err) { console.warn('[API] project update failed:', err); }
    showToast('Project updated successfully', 'success');
  };

  const deleteProject = async (id: string) => {
    setData(prev => ({ ...prev, projects: prev.projects.filter(p => p._id !== id) }));
    try {
      await fetch(`${API_BASE}/api/projects/${id}`, { method: 'DELETE' });
    } catch (err) { console.warn('[API] project delete failed:', err); }
    showToast('Project deleted', 'info');
  };

  // ─── Publications CRUD (with MongoDB sync) ───────────────────────────
  const addPublication = async (pub: Omit<Publication, '_id'>) => {
    try {
      const res = await fetch(`${API_BASE}/api/publications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pub),
      });
      const saved = await res.json();
      const newPub: Publication = { ...pub, _id: saved._id || saved.insertedId || 'pub-' + Date.now(), createdAt: new Date().toISOString() };
      setData(prev => ({ ...prev, publications: [newPub, ...prev.publications] }));
      showToast(`Publication "${pub.title}" added!`, 'success');
    } catch {
      const newPub: Publication = { ...pub, _id: 'pub-' + Date.now(), createdAt: new Date().toISOString() };
      setData(prev => ({ ...prev, publications: [newPub, ...prev.publications] }));
      showToast(`Publication saved locally.`, 'info');
    }
  };

  const updatePublication = async (id: string, updates: Partial<Publication>) => {
    setData(prev => ({
      ...prev,
      publications: prev.publications.map(p => (p._id === id ? { ...p, ...updates } : p)),
    }));
    try {
      await fetch(`${API_BASE}/api/publications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
    } catch (err) { console.warn('[API] publication update failed:', err); }
    showToast('Publication updated', 'success');
  };

  const deletePublication = async (id: string) => {
    setData(prev => ({ ...prev, publications: prev.publications.filter(p => p._id !== id) }));
    try {
      await fetch(`${API_BASE}/api/publications/${id}`, { method: 'DELETE' });
    } catch (err) { console.warn('[API] publication delete failed:', err); }
    showToast('Publication deleted', 'info');
  };

  // ─── Events & Achievements CRUD (with MongoDB sync) ──────────────────
  const addEvent = async (event: Omit<EventAchievement, '_id'>) => {
    const endpoint = event.category === 'certificates' ? '/api/certificates' : '/api/events';
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      const saved = await res.json();
      const newEvent: EventAchievement = { ...event, _id: saved._id || saved.insertedId || 'ev-' + Date.now(), createdAt: new Date().toISOString() };
      setData(prev => ({ ...prev, events: [newEvent, ...prev.events] }));
      showToast(`"${event.title}" published!`, 'success');
    } catch {
      const newEvent: EventAchievement = { ...event, _id: 'ev-' + Date.now(), createdAt: new Date().toISOString() };
      setData(prev => ({ ...prev, events: [newEvent, ...prev.events] }));
      showToast(`"${event.title}" saved locally.`, 'info');
    }
  };

  const updateEvent = async (id: string, updates: Partial<EventAchievement>) => {
    setData(prev => ({
      ...prev,
      events: prev.events.map(ev => (ev._id === id ? { ...ev, ...updates } : ev)),
    }));
    const category = updates.category || data.events.find(e => e._id === id)?.category;
    const endpoint = category === 'certificates' ? `/api/certificates/${id}` : `/api/events/${id}`;
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) {
        // If not found in primary endpoint, try the alternate endpoint
        const altEndpoint = category === 'certificates' ? `/api/events/${id}` : `/api/certificates/${id}`;
        await fetch(`${API_BASE}${altEndpoint}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });
      }
    } catch (err) { console.warn('[API] event update failed:', err); }
    showToast('Milestone updated successfully', 'success');
  };

  const deleteEvent = async (id: string) => {
    const category = data.events.find(e => e._id === id)?.category;
    setData(prev => ({ ...prev, events: prev.events.filter(ev => ev._id !== id) }));
    const endpoint = category === 'certificates' ? `/api/certificates/${id}` : `/api/events/${id}`;
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, { method: 'DELETE' });
      if (!res.ok) {
        const altEndpoint = category === 'certificates' ? `/api/events/${id}` : `/api/certificates/${id}`;
        await fetch(`${API_BASE}${altEndpoint}`, { method: 'DELETE' });
      }
    } catch (err) { console.warn('[API] event delete failed:', err); }
    showToast('Milestone deleted', 'info');
  };

  // ─── Experience CRUD (with MongoDB sync) ─────────────────────────────
  const addExperience = async (exp: Omit<ExperienceItem, '_id'>) => {
    try {
      const res = await fetch(`${API_BASE}/api/experience`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exp),
      });
      const saved = await res.json();
      const newExp: ExperienceItem = { ...exp, _id: saved._id || saved.insertedId || 'exp-' + Date.now(), createdAt: new Date().toISOString() };
      setData(prev => ({ ...prev, experience: [newExp, ...prev.experience] }));
      showToast(`Timeline item "${exp.title}" added!`, 'success');
    } catch {
      const newExp: ExperienceItem = { ...exp, _id: 'exp-' + Date.now(), createdAt: new Date().toISOString() };
      setData(prev => ({ ...prev, experience: [newExp, ...prev.experience] }));
      showToast(`Experience saved locally.`, 'info');
    }
  };

  const updateExperience = async (id: string, updates: Partial<ExperienceItem>) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(e => (e._id === id ? { ...e, ...updates } : e)),
    }));
    try {
      await fetch(`${API_BASE}/api/experience/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
    } catch (err) { console.warn('[API] experience update failed:', err); }
    showToast('Experience updated', 'success');
  };

  const deleteExperience = async (id: string) => {
    setData(prev => ({ ...prev, experience: prev.experience.filter(e => e._id !== id) }));
    try {
      await fetch(`${API_BASE}/api/experience/${id}`, { method: 'DELETE' });
    } catch (err) { console.warn('[API] experience delete failed:', err); }
    showToast('Experience deleted', 'info');
  };

  // ─── Skills ──────────────────────────────────────────────────────────
  const updateSkillCategories = (categories: SkillCategory[]) => {
    setData(prev => ({ ...prev, skillCategories: categories }));
    showToast('Skills catalog updated', 'success');
  };

  // ─── Messages ────────────────────────────────────────────────────────
  const sendMessage = async (name: string, email: string, subject: string, message: string): Promise<boolean> => {
    const newMsg: ContactMessage = {
      _id: 'msg-' + Date.now(),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    setData(prev => ({ ...prev, messages: [newMsg, ...prev.messages] }));

    try {
      await fetch(`${API_BASE}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.75 } });
    } catch (err) {
      console.warn('[API] message send failed:', err);
    }

    showToast('Thank you! Your message has been sent to Syeed Asif.', 'success');
    return true;
  };

  const deleteMessage = (id: string) => {
    setData(prev => ({ ...prev, messages: prev.messages.filter(m => m._id !== id) }));
    showToast('Message removed', 'info');
  };

  const markMessageRead = (id: string) => {
    setData(prev => ({
      ...prev,
      messages: prev.messages.map(m => (m._id === id ? { ...m, isRead: true } : m)),
    }));
  };

  // ─── CV Updater ───────────────────────────────────────────────────────
  const updateCV = (cvUpdates: Partial<CVMetadata>) => {
    setData(prev => ({ ...prev, cv: { ...prev.cv, ...cvUpdates } }));
    showToast('CV & Resume information updated!', 'success');
  };

  // ─── Global Config ────────────────────────────────────────────────────
  const resetToDefaults = () => {
    setData(initialPortfolioData);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Portfolio reset to default state', 'info');
  };

  const importConfig = (imported: PortfolioData) => {
    if (!imported || !imported.hero) {
      showToast('Invalid configuration file format', 'error');
      return;
    }
    setData(imported);
    showToast('Configuration imported successfully!', 'success');
  };

  const updateAdminCredentials = (email: string, pin: string) => {
    setAdminEmail(email);
    setAdminPin(pin);
    localStorage.setItem('syeed_admin_email', email);
    localStorage.setItem('syeed_admin_pin', pin);
    showToast('Admin credentials updated successfully', 'success');
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isAdmin,
        adminEmail,
        adminPin,
        activeView,
        toast,
        isLoadingData,
        selectedMediaModal,
        loginAdmin,
        logoutAdmin,
        setActiveView,
        showToast,
        openMediaModal,
        closeMediaModal,
        updateTheme,
        updateHero,
        updateAbout,
        reorderSections,
        toggleSectionVisibility,
        updateSectionHeading,
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
        sendMessage,
        deleteMessage,
        markMessageRead,
        updateCV,
        resetToDefaults,
        importConfig,
        updateAdminCredentials,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
