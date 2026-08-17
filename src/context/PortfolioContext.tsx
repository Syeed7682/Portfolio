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

const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
export const API_BASE = import.meta.env.VITE_API_BASE || (isLocalhost ? 'http://localhost:3000' : 'https://portfolio-2-afjx.onrender.com');

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


const AUTH_KEY = 'syeed_portfolio_isAdmin';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });
  const [isLoadingData, setIsLoadingData] = useState(false);
  // Admin credentials are now persisted in MongoDB via the config API
  const [adminEmail, setAdminEmail] = useState<string>('');
  const [adminPin, setAdminPin] = useState<string>('');
  const [activeView, setActiveView] = useState<'portfolio' | 'admin'>(() => {
    return window.location.pathname === '/admin' ? 'admin' : 'portfolio';
  });
  const [toast, setToast] = useState<ToastInfo | null>(null);
  const [selectedMediaModal, setSelectedMediaModal] = useState<PortfolioContextType['selectedMediaModal']>(null);

// Fetch live data from MongoDB on mount (no localStorage fallback)
  const saveConfigToBackend = async (partialConfig: Record<string, any>) => {
    try {
      await fetch(`${API_BASE}/api/config`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partialConfig),
      });
      console.log('[Portfolio] Saved config to MongoDB ✓');
    } catch (err) {
      console.warn('[API] Config save to MongoDB failed:', err);
    }
  };

  // No-op sync function (kept for compatibility)
  const syncLocalCache = (newData: PortfolioData) => {
    // Intentionally left blank – data persistence handled by MongoDB.
  };

  useEffect(() => {
    const fetchLiveData = async () => {
      setIsLoadingData(true);
      try {
        const res = await fetch(`${API_BASE}/api/portfolio-data`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const live = await res.json();
        const mergedEvents = [
          ...(live.events || []),
          ...(live.certs || []),
        ];
        const liveConfig = live.config || {};
        setData({
          ...initialPortfolioData,
          projects: live.projects || [],
          publications: live.publications || [],
          events: mergedEvents,
          experience: live.experience || [],
          theme: liveConfig.theme || initialPortfolioData.theme,
          hero: liveConfig.hero || initialPortfolioData.hero,
          about: liveConfig.about || initialPortfolioData.about,
          cv: liveConfig.cv || initialPortfolioData.cv,
          sections: liveConfig.sections || initialPortfolioData.sections,
          skillCategories: liveConfig.skillCategories || initialPortfolioData.skillCategories,
        });
        // Load admin credentials from config if present
        setAdminEmail(liveConfig.adminEmail || '');
        setAdminPin(liveConfig.adminPin || '');
        console.log('[Portfolio] Live data loaded from MongoDB ✓');
      } catch (err) {
        console.warn('[Portfolio] Could not fetch live data, using defaults:', err);
        setData(initialPortfolioData);
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchLiveData();
  }, []);

  // Removed localStorage sync for config.


  // Apply dark mode class to document
  // Apply dark mode class to document
  useEffect(() => {
    const isDark = data.theme.mode === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [data.theme.mode]);

  // Poll for live updates to reflect admin changes instantly
  useEffect(() => {
    const pollInterval = setInterval(() => {
      fetch(`${API_BASE}/api/portfolio-data`)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then(live => {
          setData(prev => ({
            ...prev,
            projects: live.projects?.length ? live.projects : prev.projects,
            publications: live.publications?.length ? live.publications : prev.publications,
            events: live.events?.length ? live.events : prev.events,
            experience: live.experience?.length ? live.experience : prev.experience,
            theme: live.config?.theme || prev.theme,
            hero: live.config?.hero || prev.hero,
            about: live.config?.about || prev.about,
            cv: live.config?.cv || prev.cv,
            sections: live.config?.sections || prev.sections,
            skillCategories: live.config?.skillCategories || prev.skillCategories,
          }));
        })
        .catch(err => {
          console.warn('[Portfolio] Poll fetch failed:', err);
        });
    }, 5000);
    return () => clearInterval(pollInterval);
  }, []);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast(curr => (curr?.id === id ? null : curr));
    }, 4000);
  };

  const loginAdmin = (email = 'kmsyeedasif@gmail.com', pin = '') => {
    setIsAdmin(true);
    setAdminEmail(email);
    setAdminPin(pin);
    sessionStorage.setItem(AUTH_KEY, 'true');
    // Store admin credentials in MongoDB
    saveConfigToBackend({ adminEmail: email, adminPin: pin });
    showToast(`Welcome back, ${email}! Admin Mode enabled.`, 'success');
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
    setData(prev => {
      const updatedTheme = { ...prev.theme, ...newTheme };
      saveConfigToBackend({ theme: updatedTheme });
      return { ...prev, theme: updatedTheme };
    });
    showToast('Theme updated in real-time!', 'success');
  };

  const updateHero = (heroUpdates: Partial<HeroConfig>) => {
    setData(prev => {
      const updatedHero = { ...prev.hero, ...heroUpdates };
      saveConfigToBackend({ hero: updatedHero });
      return { ...prev, hero: updatedHero };
    });
    showToast('Hero section updated!', 'success');
  };

  const updateAbout = (aboutUpdates: Partial<AboutConfig>) => {
    setData(prev => {
      const updatedAbout = { ...prev.about, ...aboutUpdates };
      saveConfigToBackend({ about: updatedAbout });
      return { ...prev, about: updatedAbout };
    });
    showToast('About section updated!', 'success');
  };

  const reorderSections = (newSections: SectionConfig[]) => {
    setData(prev => {
      saveConfigToBackend({ sections: newSections });
      return { ...prev, sections: newSections };
    });
    showToast('Layout order updated!', 'info');
  };

  const toggleSectionVisibility = (sectionId: string) => {
    setData(prev => {
      const newSections = prev.sections.map(sec =>
        sec.id === sectionId ? { ...sec, isVisible: !sec.isVisible } : sec
      );
      saveConfigToBackend({ sections: newSections });
      return { ...prev, sections: newSections };
    });
    showToast('Section visibility toggled', 'info');
  };

  const updateSectionHeading = (sectionId: string, updates: Partial<SectionConfig>) => {
    setData(prev => {
      const newSections = prev.sections.map(sec =>
        sec.id === sectionId ? { ...sec, ...updates } : sec
      );
      saveConfigToBackend({ sections: newSections });
      return { ...prev, sections: newSections };
    });
    showToast('Section header updated', 'success');
  };

  // ─── Projects CRUD (with MongoDB sync & Cache Persistence) ────────────
  const addProject = async (project: Omit<Project, '_id'>) => {
    let newProj: Project;
    try {
      const res = await fetch(`${API_BASE}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const saved = await res.json();
      newProj = {
        ...project,
        _id: saved._id || saved.insertedId || 'proj-' + Date.now(),
        createdAt: saved.createdAt || new Date().toISOString()
      };
      showToast(`Project "${project.title}" published!`, 'success');
    } catch (err) {
      console.warn('[API] Project add failed, saving locally:', err);
      newProj = { ...project, _id: 'proj-' + Date.now(), createdAt: new Date().toISOString() };
      showToast(`Project "${project.title}" saved locally.`, 'info');
    }
    setData(prev => {
      const updated = { ...prev, projects: [newProj, ...prev.projects] };
      syncLocalCache(updated);
      return updated;
    });
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    setData(prev => {
      const updatedProjects = prev.projects.map(p => (p._id === id ? { ...p, ...updates } : p));
      const updated = { ...prev, projects: updatedProjects };
      syncLocalCache(updated);
      return updated;
    });
    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) console.warn('[API] project update returned HTTP ' + res.status);
    } catch (err) { console.warn('[API] project update failed:', err); }
    showToast('Project updated successfully', 'success');
  };

  const deleteProject = async (id: string) => {
    setData(prev => {
      const updatedProjects = prev.projects.filter(p => p._id !== id);
      const updated = { ...prev, projects: updatedProjects };
      syncLocalCache(updated);
      return updated;
    });
    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) console.warn('[API] project delete returned HTTP ' + res.status);
    } catch (err) { console.warn('[API] project delete failed:', err); }
    showToast('Project deleted', 'info');
  };

  // ─── Publications CRUD (with MongoDB sync & Cache Persistence) ────────
  const addPublication = async (pub: Omit<Publication, '_id'>) => {
    let newPub: Publication;
    try {
      const res = await fetch(`${API_BASE}/api/publications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pub),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const saved = await res.json();
      newPub = { ...pub, _id: saved._id || saved.insertedId || 'pub-' + Date.now(), createdAt: saved.createdAt || new Date().toISOString() };
      showToast(`Publication "${pub.title}" added!`, 'success');
    } catch (err) {
      console.warn('[API] Publication add failed, saving locally:', err);
      newPub = { ...pub, _id: 'pub-' + Date.now(), createdAt: new Date().toISOString() };
      showToast(`Publication saved locally.`, 'info');
    }
    setData(prev => {
      const updated = { ...prev, publications: [newPub, ...prev.publications] };
      syncLocalCache(updated);
      return updated;
    });
  };

  const updatePublication = async (id: string, updates: Partial<Publication>) => {
    setData(prev => {
      const updatedPubs = prev.publications.map(p => (p._id === id ? { ...p, ...updates } : p));
      const updated = { ...prev, publications: updatedPubs };
      syncLocalCache(updated);
      return updated;
    });
    try {
      const res = await fetch(`${API_BASE}/api/publications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) console.warn('[API] publication update returned HTTP ' + res.status);
    } catch (err) { console.warn('[API] publication update failed:', err); }
    showToast('Publication updated', 'success');
  };

  const deletePublication = async (id: string) => {
    setData(prev => {
      const updatedPubs = prev.publications.filter(p => p._id !== id);
      const updated = { ...prev, publications: updatedPubs };
      syncLocalCache(updated);
      return updated;
    });
    try {
      const res = await fetch(`${API_BASE}/api/publications/${id}`, { method: 'DELETE' });
      if (!res.ok) console.warn('[API] publication delete returned HTTP ' + res.status);
    } catch (err) { console.warn('[API] publication delete failed:', err); }
    showToast('Publication deleted', 'info');
  };

  // ─── Events & Achievements CRUD (with MongoDB sync & Cache Persistence)
  const addEvent = async (event: Omit<EventAchievement, '_id'>) => {
    const endpoint = event.category === 'certificates' ? '/api/certificates' : '/api/events';
    let newEvent: EventAchievement;
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const saved = await res.json();
      newEvent = { ...event, _id: saved._id || saved.insertedId || 'ev-' + Date.now(), createdAt: saved.createdAt || new Date().toISOString() };
      showToast(`"${event.title}" published!`, 'success');
    } catch (err) {
      console.warn('[API] Event add failed, saving locally:', err);
      newEvent = { ...event, _id: 'ev-' + Date.now(), createdAt: new Date().toISOString() };
      showToast(`"${event.title}" saved locally.`, 'info');
    }
    setData(prev => {
      const updated = { ...prev, events: [newEvent, ...prev.events] };
      syncLocalCache(updated);
      return updated;
    });
  };

  const updateEvent = async (id: string, updates: Partial<EventAchievement>) => {
    const category = updates.category || data.events.find(e => e._id === id)?.category;
    setData(prev => {
      const updatedEvents = prev.events.map(ev => (ev._id === id ? { ...ev, ...updates } : ev));
      const updated = { ...prev, events: updatedEvents };
      syncLocalCache(updated);
      return updated;
    });
    const primaryEndpoint = category === 'certificates' ? `/api/certificates/${id}` : `/api/events/${id}`;
    const altEndpoint = category === 'certificates' ? `/api/events/${id}` : `/api/certificates/${id}`;
    try {
      const res = await fetch(`${API_BASE}${primaryEndpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) {
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
    setData(prev => {
      const updatedEvents = prev.events.filter(ev => ev._id !== id);
      const updated = { ...prev, events: updatedEvents };
      syncLocalCache(updated);
      return updated;
    });
    const primaryEndpoint = category === 'certificates' ? `/api/certificates/${id}` : `/api/events/${id}`;
    const altEndpoint = category === 'certificates' ? `/api/events/${id}` : `/api/certificates/${id}`;
    try {
      const res = await fetch(`${API_BASE}${primaryEndpoint}`, { method: 'DELETE' });
      if (!res.ok) {
        await fetch(`${API_BASE}${altEndpoint}`, { method: 'DELETE' });
      }
    } catch (err) { console.warn('[API] event delete failed:', err); }
    showToast('Milestone deleted', 'info');
  };

  // ─── Experience CRUD (with MongoDB sync & Cache Persistence) ─────────
  const addExperience = async (exp: Omit<ExperienceItem, '_id'>) => {
    let newExp: ExperienceItem;
    try {
      const res = await fetch(`${API_BASE}/api/experience`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exp),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const saved = await res.json();
      newExp = { ...exp, _id: saved._id || saved.insertedId || 'exp-' + Date.now(), createdAt: saved.createdAt || new Date().toISOString() };
      showToast(`Timeline item "${exp.title}" added!`, 'success');
    } catch (err) {
      console.warn('[API] Experience add failed, saving locally:', err);
      newExp = { ...exp, _id: 'exp-' + Date.now(), createdAt: new Date().toISOString() };
      showToast(`Experience saved locally.`, 'info');
    }
    setData(prev => {
      const updated = { ...prev, experience: [newExp, ...prev.experience] };
      syncLocalCache(updated);
      return updated;
    });
  };

  const updateExperience = async (id: string, updates: Partial<ExperienceItem>) => {
    setData(prev => {
      const updatedExp = prev.experience.map(e => (e._id === id ? { ...e, ...updates } : e));
      const updated = { ...prev, experience: updatedExp };
      syncLocalCache(updated);
      return updated;
    });
    try {
      const res = await fetch(`${API_BASE}/api/experience/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) console.warn('[API] experience update returned HTTP ' + res.status);
    } catch (err) { console.warn('[API] experience update failed:', err); }
    showToast('Experience updated', 'success');
  };

  const deleteExperience = async (id: string) => {
    setData(prev => {
      const updatedExp = prev.experience.filter(e => e._id !== id);
      const updated = { ...prev, experience: updatedExp };
      syncLocalCache(updated);
      return updated;
    });
    try {
      const res = await fetch(`${API_BASE}/api/experience/${id}`, { method: 'DELETE' });
      if (!res.ok) console.warn('[API] experience delete returned HTTP ' + res.status);
    } catch (err) { console.warn('[API] experience delete failed:', err); }
    showToast('Experience deleted', 'info');
  };

  // ─── Skills ──────────────────────────────────────────────────────────
  const updateSkillCategories = (categories: SkillCategory[]) => {
    setData(prev => {
      saveConfigToBackend({ skillCategories: categories });
      const updated = { ...prev, skillCategories: categories };
      syncLocalCache(updated);
      return updated;
    });
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

    setData(prev => {
      const updated = { ...prev, messages: [newMsg, ...prev.messages] };
      syncLocalCache(updated);
      return updated;
    });

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

  const deleteMessage = async (id: string) => {
    setData(prev => {
      const updatedMsgs = prev.messages.filter(m => m._id !== id);
      const updated = { ...prev, messages: updatedMsgs };
      syncLocalCache(updated);
      return updated;
    });
    try {
      await fetch(`${API_BASE}/api/messages/${id}`, { method: 'DELETE' });
    } catch (err) { console.warn('[API] message delete failed:', err); }
    showToast('Message removed', 'info');
  };

  const markMessageRead = async (id: string) => {
    setData(prev => {
      const updatedMsgs = prev.messages.map(m => (m._id === id ? { ...m, isRead: true } : m));
      const updated = { ...prev, messages: updatedMsgs };
      syncLocalCache(updated);
      return updated;
    });
    try {
      await fetch(`${API_BASE}/api/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      });
    } catch (err) { console.warn('[API] message mark read failed:', err); }
  };

  // ─── CV Updater ───────────────────────────────────────────────────────
  const updateCV = (cvUpdates: Partial<CVMetadata>) => {
    setData(prev => {
      const updatedCV = { ...prev.cv, ...cvUpdates };
      saveConfigToBackend({ cv: updatedCV });
      return { ...prev, cv: updatedCV };
    });
    showToast('CV & Resume information updated!', 'success');
  };

  // ─── Global Config ────────────────────────────────────────────────────
  const resetToDefaults = () => {
    setData(initialPortfolioData);
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
    // Persist admin credentials to MongoDB via config API
    saveConfigToBackend({ adminEmail: email, adminPin: pin });
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
