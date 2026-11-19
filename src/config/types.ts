import type { RouteRecordRaw } from 'vue-router';

export interface ContactInfo {
  email: string;
  phone: string;
  phoneHref: string;
}

export interface ProjectMeta {
  label: string;
  value: string;
}

export interface ProjectItem {
  size: 'tall' | 'wide' | 'square' | 'small';
  title: string;
  subtitle: string;
  image: string;
  modalImage?: string;
  description: string[];
  tags: string[];
  link?: string;
  meta: ProjectMeta[];
}

export interface ProfileConfig {
  isBlind: boolean;
  heroName: string | null;
  contact: ContactInfo | null;
  personalPortfolioProject: ProjectItem | null;
  extraRoutes: RouteRecordRaw[];
}
