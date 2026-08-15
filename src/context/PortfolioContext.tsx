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

interface ToastInfo {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface PortfolioContextType {
  data: PortfolioData;
  isAdmin: boolean;
  adminEmail: string;
  activeView: 'portfolio' | 'admin';
  toast: ToastInfo | null;
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
  addProject: (project: Omit<Project, '_id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  // Publications CRUD
  addPublication: (pub: Omit<Publication, '_id'>) => void;
  updatePublication: (id: string, pub: Partial<Publication>) => void;
  deletePublication: (id: string) => void;
  // Events/Achievements CRUD
  addEvent: (event: Omit<EventAchievement, '_id'>) => void;
  updateEvent: (id: string, event: Partial<EventAchievement>) => void;
  deleteEvent: (id: string) => void;
  // Experience CRUD
  addExperience: (exp: Omit<ExperienceItem, '_id'>) => void;
  updateExperience: (id: string, exp: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;
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

  const [adminEmail, setAdminEmail] = useState<string>('kmsyeedasif@gmail.com');
  const [activeView, setActiveView] = useState<'portfolio' | 'admin'>('portfolio');
  const [toast, setToast] = useState<ToastInfo | null>(null);
  const [selectedMediaModal, setSelectedMediaModal] = useState<PortfolioContextType['selectedMediaModal']>(null);

  // Sync to local storage on data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving portfolio data to storage', e);
    }
  }, [data]);

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
    setSelectedMediaModal({
      isOpen: true,
      ...item,
    });
  };

  const closeMediaModal = () => {
    setSelectedMediaModal(null);
  };

  // Updaters
  const updateTheme = (newTheme: Partial<SiteTheme>) => {
    setData(prev => ({
      ...prev,
      theme: { ...prev.theme, ...newTheme },
    }));
    showToast('Theme updated in real-time!', 'success');
  };

  const updateHero = (heroUpdates: Partial<HeroConfig>) => {
    setData(prev => ({
      ...prev,
      hero: { ...prev.hero, ...heroUpdates },
    }));
    showToast('Hero section updated!', 'success');
  };

  const updateAbout = (aboutUpdates: Partial<AboutConfig>) => {
    setData(prev => ({
      ...prev,
      about: { ...prev.about, ...aboutUpdates },
    }));
    showToast('About section updated!', 'success');
  };

  const reorderSections = (newSections: SectionConfig[]) => {
    setData(prev => ({
      ...prev,
      sections: newSections,
    }));
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

  // Projects CRUD
  const addProject = (project: Omit<Project, '_id'>) => {
    const newProj: Project = {
      ...project,
      _id: 'proj-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setData(prev => ({
      ...prev,
      projects: [newProj, ...prev.projects],
    }));
    showToast(`Project "${project.title}" published!`, 'success');
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p._id === id ? { ...p, ...updates } : p)),
    }));
    showToast('Project updated successfully', 'success');
  };

  const deleteProject = (id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p._id !== id),
    }));
    showToast('Project deleted', 'info');
  };

  // Publications CRUD
  const addPublication = (pub: Omit<Publication, '_id'>) => {
    const newPub: Publication = {
      ...pub,
      _id: 'pub-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setData(prev => ({
      ...prev,
      publications: [newPub, ...prev.publications],
    }));
    showToast(`Publication "${pub.title}" added!`, 'success');
  };

  const updatePublication = (id: string, updates: Partial<Publication>) => {
    setData(prev => ({
      ...prev,
      publications: prev.publications.map(p => (p._id === id ? { ...p, ...updates } : p)),
    }));
    showToast('Publication updated', 'success');
  };

  const deletePublication = (id: string) => {
    setData(prev => ({
      ...prev,
      publications: prev.publications.filter(p => p._id !== id),
    }));
    showToast('Publication deleted', 'info');
  };

  // Events & Achievements CRUD
  const addEvent = (event: Omit<EventAchievement, '_id'>) => {
    const newEvent: EventAchievement = {
      ...event,
      _id: 'ev-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setData(prev => ({
      ...prev,
      events: [newEvent, ...prev.events],
    }));
    showToast(`Event "${event.title}" saved!`, 'success');
  };

  const updateEvent = (id: string, updates: Partial<EventAchievement>) => {
    setData(prev => ({
      ...prev,
      events: prev.events.map(ev => (ev._id === id ? { ...ev, ...updates } : ev)),
    }));
    showToast('Event updated', 'success');
  };

  const deleteEvent = (id: string) => {
    setData(prev => ({
      ...prev,
      events: prev.events.filter(ev => ev._id !== id),
    }));
    showToast('Event deleted', 'info');
  };

  // Experience CRUD
  const addExperience = (exp: Omit<ExperienceItem, '_id'>) => {
    const newExp: ExperienceItem = {
      ...exp,
      _id: 'exp-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setData(prev => ({
      ...prev,
      experience: [newExp, ...prev.experience],
    }));
    showToast(`Timeline item "${exp.title}" added!`, 'success');
  };

  const updateExperience = (id: string, updates: Partial<ExperienceItem>) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(e => (e._id === id ? { ...e, ...updates } : e)),
    }));
    showToast('Experience updated', 'success');
  };

  const deleteExperience = (id: string) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e._id !== id),
    }));
    showToast('Experience deleted', 'info');
  };

  // Skills
  const updateSkillCategories = (categories: SkillCategory[]) => {
    setData(prev => ({
      ...prev,
      skillCategories: categories,
    }));
    showToast('Skills catalog updated', 'success');
  };

  // Messages
  const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? '' 
    : 'https://portfolio-2-afjx.onrender.com';

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

    setData(prev => ({
      ...prev,
      messages: [newMsg, ...prev.messages],
    }));

    try {
      fetch(`${API_BASE}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      }).catch(err => console.warn('[Message Sync Warning]:', err));

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // fallback
    }

    showToast('Thank you! Your message has been sent to Syeed Asif.', 'success');
    return true;
  };

  const deleteMessage = (id: string) => {
    setData(prev => ({
      ...prev,
      messages: prev.messages.filter(m => m._id !== id),
    }));
    showToast('Message removed', 'info');
  };

  const markMessageRead = (id: string) => {
    setData(prev => ({
      ...prev,
      messages: prev.messages.map(m => (m._id === id ? { ...m, isRead: true } : m)),
    }));
  };

  // CV Updater
  const updateCV = (cvUpdates: Partial<CVMetadata>) => {
    setData(prev => ({
      ...prev,
      cv: { ...prev.cv, ...cvUpdates },
    }));
    showToast('CV & Resume information updated!', 'success');
  };

  // Global Config Management
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

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isAdmin,
        adminEmail,
        activeView,
        toast,
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
