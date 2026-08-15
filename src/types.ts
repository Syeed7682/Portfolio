export type SectionId = 
  | 'home'
  | 'about'
  | 'skills'
  | 'portfolio'
  | 'publications'
  | 'events'
  | 'experience'
  | 'contact';

export interface SectionConfig {
  id: SectionId;
  label: string;
  badgeTitle?: string;
  heading: string;
  headingGradient: string;
  subtitle?: string;
  isVisible: boolean;
  order: number;
}

export type ThemePreset = 'purple' | 'cyan' | 'emerald' | 'rose' | 'amber' | 'blue' | 'midnight';

export interface SiteTheme {
  preset: ThemePreset;
  mode: 'dark' | 'light';
  accentColor: string;
  accentGradient: string;
  glassBlur: number; // e.g. 16
  borderRadius: 'rounded-xl' | 'rounded-2xl' | 'rounded-3xl';
}

export interface HeroConfig {
  availableBadgeText: string;
  greetingText: string;
  name: string;
  typewriterTitles: string[];
  bio: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  profileImageUrl: string;
  floatingBadgeTitle: string;
  floatingBadgeSubtitle: string;
  githubUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
  kaggleUrl?: string;
  email: string;
  location: string;
}

export interface AboutConfig {
  heading: string;
  subheading: string;
  paragraph1: string;
  paragraph2: string;
  coverImageUrl: string;
  stats: {
    label: string;
    value: string;
    icon: string;
  }[];
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  type: string; // e.g. "Web App", "AI & ML", "Computer Vision", "RAG Systems", "Hardware"
  link?: string;
  githubUrl?: string;
  tags: string[];
  featured?: boolean;
  metrics?: string;
  createdAt?: string;
}

export interface Publication {
  _id: string;
  title: string;
  description: string;
  authors: string;
  conference: string;
  year: string | number;
  link?: string;
  doi?: string;
  tags?: string[];
  image?: string;
  createdAt?: string;
}

export interface EventAchievement {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: 'events' | 'certificates' | 'awards';
  date?: string;
  organization?: string;
  credentialUrl?: string;
  createdAt?: string;
}

export interface ExperienceItem {
  _id: string;
  title: string;
  institution: string;
  period: string;
  type: 'Education' | 'Experience' | 'Volunteering';
  description: string;
  location?: string;
  tags?: string[];
  createdAt?: string;
}

export interface SkillItem {
  name: string;
  icon: string;
  proficiency: number; // 0 - 100
  level: string; // "Advanced", "Proficient", "Intermediate"
}

export interface SkillCategory {
  _id: string;
  categoryName: string;
  icon: string;
  skills: SkillItem[];
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead?: boolean;
}

export interface CVMetadata {
  filename: string;
  uploadedAt: string;
  fileUrl?: string;
  fileData?: string; // base64 / blob
  previewEnabled: boolean;
  sizeBytes?: number;
}

export interface PortfolioData {
  theme: SiteTheme;
  sections: SectionConfig[];
  hero: HeroConfig;
  about: AboutConfig;
  projects: Project[];
  publications: Publication[];
  events: EventAchievement[];
  experience: ExperienceItem[];
  skillCategories: SkillCategory[];
  messages: ContactMessage[];
  cv: CVMetadata;
}
