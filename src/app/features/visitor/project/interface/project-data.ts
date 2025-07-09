export interface GithubUrls {
  frontend?: string;
  backend?: string;
  fullstack?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrls?: GithubUrls;
  demoUrl?: string;
  category: ProjectCategory;
  featured: boolean;
  date: string;
}

export type ProjectCategory = 'frontend' | 'backend' | 'fullstack' | 'script';

export interface ProjectFilter {
  label: string;
  value: ProjectCategory | 'all';
  active: boolean;
}
