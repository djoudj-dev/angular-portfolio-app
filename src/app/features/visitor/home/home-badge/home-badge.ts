import { DatePipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';

export type BadgeStatus = 'available' | 'unavailable' | 'availableFrom';

@Component({
  selector: 'app-home-badge',
  imports: [NgClass, DatePipe],
  templateUrl: './home-badge.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeBadge {
  // Badge state
  readonly status = signal<BadgeStatus>('availableFrom');
  readonly availableFromDate = signal<Date | null>(new Date('2025-08-25'));

  // Computed properties
  readonly statusText = computed(() => {
    switch (this.status()) {
      case 'available':
        return 'Disponible';
      case 'unavailable':
        return 'Indisponible';
      case 'availableFrom':
        return 'Disponible à partir du :';
    }
  });

  readonly badgeClasses = computed(() => {
    switch (this.status()) {
      case 'available':
        return 'bg-background text-text border border-green-300';
      case 'unavailable':
        return 'bg-background text-text border border-red-300';
      case 'availableFrom':
        return 'bg-background text-text border border-accent-300';
    }
  });

  readonly pulseClasses = computed(() => {
    switch (this.status()) {
      case 'available':
        return 'bg-green-500';
      case 'unavailable':
        return 'bg-red-500';
      case 'availableFrom':
        return 'bg-accent-500';
    }
  });
}
