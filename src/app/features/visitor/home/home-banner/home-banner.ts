import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HomeBadge } from '../home-badge/home-badge';

@Component({
  selector: 'app-home-banner',
  imports: [NgOptimizedImage, HomeBadge],
  templateUrl: './home-banner.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeBanner {
  readonly title = signal('Développeur Angular');
  readonly logoPath = signal('home/angular.webp');
}
