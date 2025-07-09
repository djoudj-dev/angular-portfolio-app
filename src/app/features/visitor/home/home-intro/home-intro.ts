import { Component, inject } from '@angular/core';
import { HomeLaptop } from '../home-laptop/home-laptop';
import { NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '@app/shared/button/button';
import { ScrollService } from '@app/core/services/scroll.service';

@Component({
  selector: 'app-home-intro',
  imports: [HomeLaptop, ButtonComponent, NgOptimizedImage],
  templateUrl: './home-intro.html',
  styles: `
    @keyframes halo {
      0%,
      100% {
        opacity: 0.6;
        transform: scale(1);
      }
      50% {
        opacity: 0.85;
        transform: scale(1.05);
      }
    }
  `,
})
export class HomeIntro {
  private readonly scrollService = inject(ScrollService);
  scrollToSection(fragment: string): Promise<void> {
    return this.scrollService.scrollToSection(fragment);
  }
}
