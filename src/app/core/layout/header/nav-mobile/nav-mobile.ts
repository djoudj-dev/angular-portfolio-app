import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ScrollService } from '@core/services/scroll.service';
import { NAVIGATION_ITEMS } from '../constants/navlink';

@Component({
  selector: 'app-nav-mobile',
  imports: [CommonModule],
  templateUrl: './nav-mobile.html',
})
export class NavMobile {
  navigationItems = NAVIGATION_ITEMS;
  isMenuOpen = signal(false);
  private readonly scrollService = inject(ScrollService);

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  onNavigationClick(fragment?: string) {
    this.scrollService.scrollToSection(fragment);
    this.closeMenu();
  }
}
