import { NgOptimizedImage } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { PROJECTS, PROJECT_FILTERS } from './data/project-data';
import {
  ProjectCategory,
  ProjectData,
  ProjectFilter,
} from './interface/project-data';
import { ProjectPagination } from './project-pagination/project-pagination';
import { ProjectSearch } from './project-search/project-search';

@Component({
  selector: 'app-project',
  imports: [NgOptimizedImage, ProjectSearch, ProjectPagination],
  templateUrl: './project.html',
})
export class Project {
  // Titles
  readonly projectTitle = signal<string>('Mes Projets');
  readonly projectSubTitle = signal<string>(
    'Découvrez mes réalisations et projets personnels',
  );

  // Projects data
  readonly allProjects = signal<ProjectData[]>(PROJECTS);
  readonly filters = signal<ProjectFilter[]>(PROJECT_FILTERS);

  // Search and filter state
  readonly searchQuery = signal<string>('');
  readonly activeFilter = signal<ProjectCategory | 'all'>('all');

  // Pagination state
  readonly currentPage = signal<number>(1);
  readonly projectsPerPage = 3;

  // Computed filtered projects
  readonly filteredProjects = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const filter = this.activeFilter();

    return this.allProjects().filter((project) => {
      // Apply category filter
      if (filter !== 'all' && project.category !== filter) {
        return false;
      }

      // Apply search query
      if (query) {
        return (
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(query),
          )
        );
      }

      return true;
    });
  });
  readonly paginatedProjects = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.projectsPerPage;
    const endIndex = startIndex + this.projectsPerPage;
    return this.filteredProjects().slice(startIndex, endIndex);
  });
  readonly totalPages = computed(() => {
    return Math.ceil(this.filteredProjects().length / this.projectsPerPage);
  });

  // Methods
  onSearch(query: string): void {
    this.searchQuery.set(query);
    this.currentPage.set(1); // Reset to first page when search changes
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.currentPage.set(1); // Reset to first page when search is cleared
  }

  setFilter(filter: ProjectCategory | 'all'): void {
    this.activeFilter.set(filter);
    this.currentPage.set(1); // Reset to first page when filter changes
    this.filters.update((filters) =>
      filters.map((f) => ({
        ...f,
        active: f.value === filter,
      })),
    );
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  // Helper methods to reduce template complexity
  hasGithubUrls(project: ProjectData): boolean {
    return !!(
      project.githubUrls?.frontend ??
      project.githubUrls?.backend ??
      project.githubUrls?.fullstack
    );
  }

  getGithubLinks(
    project: ProjectData,
  ): Array<{ href: string; label: string; ariaLabel: string }> {
    const links: Array<{ href: string; label: string; ariaLabel: string }> = [];

    if (project.githubUrls?.frontend) {
      links.push({
        href: project.githubUrls.frontend,
        label: 'GitHub Front',
        ariaLabel: 'Voir le code source frontend sur GitHub',
      });
    }

    if (project.githubUrls?.backend) {
      links.push({
        href: project.githubUrls.backend,
        label: 'GitHub Back',
        ariaLabel: 'Voir le code source backend sur GitHub',
      });
    }

    if (project.githubUrls?.fullstack) {
      links.push({
        href: project.githubUrls.fullstack,
        label: 'GitHub',
        ariaLabel: 'Voir le code source sur GitHub',
      });
    }

    return links;
  }

  getAllProjectLinks(
    project: ProjectData,
  ): Array<{ href: string; label: string; ariaLabel: string }> {
    const links = this.getGithubLinks(project);

    if (project.demoUrl) {
      links.push({
        href: project.demoUrl,
        label: 'Démo',
        ariaLabel: 'Voir la démo du projet',
      });
    }

    return links;
  }
}
