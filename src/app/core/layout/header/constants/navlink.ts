import { Navlink } from '@core/layout/header/interface/navlink';

export const NAVIGATION_ITEMS: Navlink[] = [
  {
    label: 'Accueil',
    icon: 'navbar/home.svg',
    altText: 'Home icon',
    route: '/',
    fragment: 'home',
  },
  {
    label: 'À propos',
    icon: 'navbar/about.svg',
    altText: 'About icon',
    route: '/',
    fragment: 'about',
  },
  {
    label: 'Compétences',
    icon: 'navbar/stack.svg',
    altText: 'Stacks icon',
    route: '/',
    fragment: 'skills',
  },
  {
    label: 'Projets',
    icon: 'navbar/project.svg',
    altText: 'Projects icon',
    route: '/',
    fragment: 'projects',
  },
  {
    label: 'Contact',
    icon: 'navbar/contact.svg',
    altText: 'Contact icon',
    route: '/',
    fragment: 'contact',
  },
];
