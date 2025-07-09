import { Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-about-objective-card',
  imports: [NgOptimizedImage],
  template: `
    <article aria-labelledby="objective-heading">
      <header class="mb-2 flex items-center gap-2">
        <img
          [ngSrc]="iconObjective()"
          alt="Icône d'objectif professionnel"
          class="icon-invert h-6 w-6"
          width="24"
          height="24"
        />
        <h2
          id="objective-heading"
          class="text-accent decoration-accent text-xl font-semibold"
        >
          {{ titleObjective() }}
        </h2>
      </header>
      <div class="content">
        <p class="text-text/90 mb-8 text-base">
          {{ textObjective() }}
        </p>
        <p class="text-text/90 text-base">
          {{ textObjectiveBis() }}
        </p>
      </div>
    </article>
  `,
})
export class AboutObjectiveCard {
  readonly iconObjective = signal('about/target.svg');
  readonly titleObjective = signal('Objectif professionnel');
  readonly textObjective = signal(
    'Contribuer à des projets web innovants en tant que développeur Angular, en concevant des interfaces performantes, accessibles et durables. J’accorde une attention particulière à la qualité du code, à la maintenabilité et à l’expérience utilisateur.',
  );
  readonly textObjectiveBis = signal(
    'Impliqué dans l’écosystème open-source, je cherche à collaborer sur des projets utiles et bien conçus. Le partage de compétences et la veille technologique font partie intégrante de ma démarche professionnelle.',
  );
}
