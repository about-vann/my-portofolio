export type ThemeAccent = 'cyan' | 'violet' | 'emerald' | 'amber';
export type Language = 'id' | 'en';
export type ColorMode = 'dark' | 'light';
export type BackgroundMode = 'off' | 'particles' | 'matrix' | 'stars' | 'grid';

export interface Article {
  id: string;
  title: string;
  slug: string;
  reads: string;
  date: string;
  excerpt: string;
  content: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'web' | 'ai' | 'mobile' | 'system';
  categoryLabel: { id: string; en: string };
  summary: { id: string; en: string };
  description: { id: string; en: string };
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: string;
  metrics?: { label: { id: string; en: string }; value: string }[];
  architecture?: {
    overview: { id: string; en: string };
    challenges: { id: string; en: string };
    solutions: { id: string; en: string };
    stack: string[];
  };
}

export interface SkillItem {
  name: string;
  category: 'frontend' | 'backend' | 'ai' | 'cloud' | 'tools';
  categoryLabel: { id: string; en: string };
  level: number; // 0 - 100
  experience: string;
  icon: string;
  description: { id: string; en: string };
  topSkill?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: { id: string; en: string };
  company: string;
  location: string;
  period: string;
  type: { id: string; en: string };
  current: boolean;
  description: { id: string; en: string };
  achievements: { id: string; en: string }[];
  techStack: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: { id: string; en: string };
}
