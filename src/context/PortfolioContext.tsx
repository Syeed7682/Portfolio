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
import { getThemePreset } from '../utils/themeUtils';
import confetti from 'canvas-confetti';

const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
export const API_BASE = import.meta.env.VITE_API_BASE || (isLocalhost ? 'http://localhost:3000' : 'https://portfolio-2-afjx.onrender.com');

// ─── API Request Helper (90s timeout for Render cold starts) ─────────────
const apiRequest = async (
  url: string,
  options: RequestInit = {},
  timeout = 90000
): Promise<any> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(text || `Request failed with status ${res.status}`);
    }
    return await res.json();
  } finally {
    clearTimeout(timeoutId);
  }
};

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
  loginAdmin: (email?: string, pin?: string) => void;
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

const CACHE_KEY = 'syeed_portfolio_cached_data_v2';

const syncLocalCache = (dataToCache: PortfolioData) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(dataToCache));
    } catch (e) {
      console.warn('[Cache] Could not save to localStorage:', e);
    }
  }
};

const getInitialData = (): PortfolioData => {
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.hero && parsed.projects) {
          let heroBio = parsed.hero.bio;
          if (heroBio && heroBio.includes("Undergraduate CSE Student")) {
            heroBio = heroBio.replace("Undergraduate CSE Student", "CSE Graduate");
          }
          let aboutSubheading = parsed.about?.subheading;
          if (aboutSubheading && aboutSubheading.includes("Undergraduate CSE Student")) {
            aboutSubheading = aboutSubheading.replace("Undergraduate CSE Student", "CSE Graduate");
          }
          return {
            ...initialPortfolioData,
            ...parsed,
            hero: {
              ...initialPortfolioData.hero,
              ...parsed.hero,
              bio: heroBio,
            },
            about: {
              ...initialPortfolioData.about,
              ...parsed.about,
              subheading: aboutSubheading,
            },
          };
        }
      }
    } catch (e) {
      console.warn('[Cache] Could not parse local cache:', e);
    }
  }
  return initialPortfolioData;
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(getInitialData);

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

  // Fetch live data from MongoDB on mount
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

  // Reusable data fetcher — called on mount (silent) AND after CRUD mutations
  const fetchLiveData = async (silent = false) => {
    if (!silent) setIsLoadingData(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch(`${API_BASE}/api/portfolio-data`, {
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const live = await res.json();
      const mergedEvents = [
        ...(live.events || []),
        ...(live.certs || []),
      ];
      const liveConfig = live.config || {};
      const rawHero = liveConfig.hero || initialPortfolioData.hero;
      const rawAbout = liveConfig.about || initialPortfolioData.about;

      const heroBio = (rawHero.bio || '').replace(/Undergraduate CSE Student/gi, 'CSE Graduate');
      const aboutSubheading = (rawAbout.subheading || '').replace(/Undergraduate CSE Student/gi, 'CSE Graduate');

      const updatedHero = { ...initialPortfolioData.hero, ...rawHero, bio: heroBio };
      const updatedAbout = { ...initialPortfolioData.about, ...rawAbout, subheading: aboutSubheading };

      const updatedData: PortfolioData = {
        ...initialPortfolioData,
        projects: live.projects || [],
        publications: live.publications || [],
        events: mergedEvents,
        experience: live.experience || [],
        theme: liveConfig.theme || initialPortfolioData.theme,
        hero: updatedHero,
        about: updatedAbout,
        cv: liveConfig.cv || initialPortfolioData.cv,
        sections: liveConfig.sections || initialPortfolioData.sections,
        skillCategories: liveConfig.skillCategories || initialPortfolioData.skillCategories,
      };

      setData(updatedData);

      // Cache fresh data locally for instant subsequent visits
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(updatedData));
      } catch (e) {
        // quota exceeded or private mode
      }

      setAdminEmail(liveConfig.adminEmail || 'kmsyeedasif@gmail.com');
      setAdminPin(liveConfig.adminPin || import.meta.env.VITE_ADMIN_PIN || '5264');
      console.log('[Portfolio] Live data loaded and cached ✓');
    } catch (err) {
      console.warn('[Portfolio] Live fetch deferred (backend waking up or offline). Displaying instant cached data.');
    } finally {
      clearTimeout(timeoutId);
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    // Silent initial fetch: renders immediately without blocking UI with loading screen
    fetchLiveData(true);
  }, []);

  // Removed localStorage sync for config.


  // Apply dark mode class and theme preset variables to document
  useEffect(() => {
    const isDark = data.theme.mode === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const preset = getThemePreset(data.theme.preset);
    document.documentElement.setAttribute('data-preset', data.theme.preset || 'purple');
    document.documentElement.style.setProperty('--theme-accent', data.theme.accentColor || preset.accent);
    document.documentElement.style.setProperty('--theme-gradient', data.theme.accentGradient || preset.gradient);
  }, [data.theme.mode, data.theme.preset, data.theme.accentColor, data.theme.accentGradient]);

  // Live data is fetched on mount. Admin modifications trigger targeted state updates and re-fetches.

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
      const updatedData = { ...prev, theme: updatedTheme };
      saveConfigToBackend({ theme: updatedTheme });
      syncLocalCache(updatedData);
      return updatedData;
    });
    showToast('Theme updated in real-time!', 'success');
  };

  const updateHero = (heroUpdates: Partial<HeroConfig>) => {
    setData(prev => {
      const updatedHero = { ...prev.hero, ...heroUpdates };
      const updatedData = { ...prev, hero: updatedHero };
      saveConfigToBackend({ hero: updatedHero });
      syncLocalCache(updatedData);
      return updatedData;
    });
    showToast('Hero section updated!', 'success');
  };

  const updateAbout = (aboutUpdates: Partial<AboutConfig>) => {
    setData(prev => {
      const updatedAbout = { ...prev.about, ...aboutUpdates };
      const updatedData = { ...prev, about: updatedAbout };
      saveConfigToBackend({ about: updatedAbout });
      syncLocalCache(updatedData);
      return updatedData;
    });
    showToast('About section updated!', 'success');
  };

  const reorderSections = (newSections: SectionConfig[]) => {
    setData(prev => {
      const updatedData = { ...prev, sections: newSections };
      saveConfigToBackend({ sections: newSections });
      syncLocalCache(updatedData);
      return updatedData;
    });
    showToast('Layout order updated!', 'info');
  };

  const toggleSectionVisibility = (sectionId: string) => {
    setData(prev => {
      const newSections = prev.sections.map(sec =>
        sec.id === sectionId ? { ...sec, isVisible: !sec.isVisible } : sec
      );
      const updatedData = { ...prev, sections: newSections };
      saveConfigToBackend({ sections: newSections });
      syncLocalCache(updatedData);
      return updatedData;
    });
    showToast('Section visibility toggled', 'info');
  };

  const updateSectionHeading = (sectionId: string, updates: Partial<SectionConfig>) => {
    setData(prev => {
      const newSections = prev.sections.map(sec =>
        sec.id === sectionId ? { ...sec, ...updates } : sec
      );
      const updatedData = { ...prev, sections: newSections };
      saveConfigToBackend({ sections: newSections });
      syncLocalCache(updatedData);
      return updatedData;
    });
    showToast('Section header updated', 'success');
  };

  // ─── Projects CRUD ────────────────────────────────────────────────────
  const addProject = async (project: Omit<Project, '_id'>) => {
    try {
      showToast('Saving project… (waking server if needed)', 'info');
      await apiRequest(`${API_BASE}/api/projects`, {
        method: 'POST',
        body: JSON.stringify(project),
      });
      await fetchLiveData();
      showToast(`Project "${project.title}" published!`, 'success');
    } catch (err) {
      console.error('[API] Project add failed:', err);
      showToast(`Failed to save "${project.title}". Please try again.`, 'error');
      throw err;
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      showToast('Updating project…', 'info');
      await apiRequest(`${API_BASE}/api/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      await fetchLiveData();
      showToast('Project updated successfully', 'success');
    } catch (err) {
      console.error('[API] Project update failed:', err);
      showToast('Failed to update project. Please try again.', 'error');
      throw err;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await apiRequest(`${API_BASE}/api/projects/${id}`, { method: 'DELETE' });
      await fetchLiveData();
      showToast('Project deleted', 'info');
    } catch (err) {
      console.error('[API] Project delete failed:', err);
      showToast('Failed to delete project. Please try again.', 'error');
      throw err;
    }
  };

  // ─── Publications CRUD ────────────────────────────────────────────────
  const addPublication = async (pub: Omit<Publication, '_id'>) => {
    try {
      showToast('Saving publication…', 'info');
      await apiRequest(`${API_BASE}/api/publications`, {
        method: 'POST',
        body: JSON.stringify(pub),
      });
      await fetchLiveData();
      showToast(`Publication "${pub.title}" added!`, 'success');
    } catch (err) {
      console.error('[API] Publication add failed:', err);
      showToast(`Failed to save publication. Please try again.`, 'error');
      throw err;
    }
  };

  const updatePublication = async (id: string, updates: Partial<Publication>) => {
    try {
      showToast('Updating publication…', 'info');
      await apiRequest(`${API_BASE}/api/publications/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      await fetchLiveData();
      showToast('Publication updated', 'success');
    } catch (err) {
      console.error('[API] Publication update failed:', err);
      showToast('Failed to update publication. Please try again.', 'error');
      throw err;
    }
  };

  const deletePublication = async (id: string) => {
    try {
      await apiRequest(`${API_BASE}/api/publications/${id}`, { method: 'DELETE' });
      await fetchLiveData();
      showToast('Publication deleted', 'info');
    } catch (err) {
      console.error('[API] Publication delete failed:', err);
      showToast('Failed to delete publication. Please try again.', 'error');
      throw err;
    }
  };

  // ─── Events & Achievements CRUD ───────────────────────────────────────
  const addEvent = async (event: Omit<EventAchievement, '_id'>) => {
    const endpoint = event.category === 'certificates' ? '/api/certificates' : '/api/events';
    try {
      showToast('Saving… (waking server if needed)', 'info');
      await apiRequest(`${API_BASE}${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(event),
      });
      await fetchLiveData();
      showToast(`"${event.title}" published!`, 'success');
    } catch (err) {
      console.error('[API] Event add failed:', err);
      showToast(`Failed to save "${event.title}". Please try again.`, 'error');
      throw err;
    }
  };

  const updateEvent = async (id: string, updates: Partial<EventAchievement>) => {
    const category = updates.category || data.events.find(e => e._id === id)?.category;
    const primaryEndpoint = category === 'certificates' ? `/api/certificates/${id}` : `/api/events/${id}`;
    const altEndpoint = category === 'certificates' ? `/api/events/${id}` : `/api/certificates/${id}`;
    try {
      showToast('Updating…', 'info');
      try {
        await apiRequest(`${API_BASE}${primaryEndpoint}`, {
          method: 'PUT',
          body: JSON.stringify(updates),
        });
      } catch {
        await apiRequest(`${API_BASE}${altEndpoint}`, {
          method: 'PUT',
          body: JSON.stringify(updates),
        });
      }
      await fetchLiveData();
      showToast('Milestone updated successfully', 'success');
    } catch (err) {
      console.error('[API] Event update failed:', err);
      showToast('Failed to update milestone. Please try again.', 'error');
      throw err;
    }
  };

  const deleteEvent = async (id: string) => {
    const category = data.events.find(e => e._id === id)?.category;
    const primaryEndpoint = category === 'certificates' ? `/api/certificates/${id}` : `/api/events/${id}`;
    const altEndpoint = category === 'certificates' ? `/api/events/${id}` : `/api/certificates/${id}`;
    try {
      try {
        await apiRequest(`${API_BASE}${primaryEndpoint}`, { method: 'DELETE' });
      } catch {
        await apiRequest(`${API_BASE}${altEndpoint}`, { method: 'DELETE' });
      }
      await fetchLiveData();
      showToast('Milestone deleted', 'info');
    } catch (err) {
      console.error('[API] Event delete failed:', err);
      showToast('Failed to delete milestone. Please try again.', 'error');
      throw err;
    }
  };

  // ─── Experience CRUD ──────────────────────────────────────────────────
  const addExperience = async (exp: Omit<ExperienceItem, '_id'>) => {
    try {
      showToast('Saving experience…', 'info');
      await apiRequest(`${API_BASE}/api/experience`, {
        method: 'POST',
        body: JSON.stringify(exp),
      });
      await fetchLiveData();
      showToast(`Timeline item "${exp.title}" added!`, 'success');
    } catch (err) {
      console.error('[API] Experience add failed:', err);
      showToast(`Failed to save "${exp.title}". Please try again.`, 'error');
      throw err;
    }
  };

  const updateExperience = async (id: string, updates: Partial<ExperienceItem>) => {
    try {
      showToast('Updating experience…', 'info');
      await apiRequest(`${API_BASE}/api/experience/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      await fetchLiveData();
      showToast('Experience updated', 'success');
    } catch (err) {
      console.error('[API] Experience update failed:', err);
      showToast('Failed to update experience. Please try again.', 'error');
      throw err;
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      await apiRequest(`${API_BASE}/api/experience/${id}`, { method: 'DELETE' });
      await fetchLiveData();
      showToast('Experience deleted', 'info');
    } catch (err) {
      console.error('[API] Experience delete failed:', err);
      showToast('Failed to delete experience. Please try again.', 'error');
      throw err;
    }
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
      const updatedData = { ...prev, cv: updatedCV };
      saveConfigToBackend({ cv: updatedCV });
      syncLocalCache(updatedData);
      return updatedData;
    });
    showToast('CV & Resume information updated!', 'success');
  };

  // ─── Global Config ────────────────────────────────────────────────────
  const resetToDefaults = () => {
    setData(initialPortfolioData);
    syncLocalCache(initialPortfolioData);
    showToast('Portfolio reset to default state', 'info');
  };

  const importConfig = (imported: PortfolioData) => {
    if (!imported || !imported.hero) {
      showToast('Invalid configuration file format', 'error');
      return;
    }
    setData(imported);
    syncLocalCache(imported);
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
