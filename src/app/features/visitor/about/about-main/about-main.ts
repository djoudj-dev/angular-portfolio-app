import { Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { AboutCardMindset } from '../about-card-mindset/about-card-mindset';
import { AboutBadgeTech } from '../about-badge-tech/about-badge-tech';
import { AboutObjectiveCard } from '../about-objective-card/about-objective-card';
import { AboutHero } from '../about-hero/about-hero';

@Component({
  selector: 'app-about-main',
  imports: [
    NgOptimizedImage,
    AboutCardMindset,
    AboutBadgeTech,
    AboutObjectiveCard,
    AboutHero,
  ],
  templateUrl: './about-main.html',
})
export class AboutMain {
  profileImage = signal('about/photoProfil.webp');
  protected readonly AboutBadgeTech = AboutBadgeTech;

  readonly aboutTitle = signal('À propos de moi');
  readonly aboutSubTitle = signal(
    'Développeur Web en reconversion, certifié DWWM, motivé par la création d’applications web modernes et performantes.',
  );
}
