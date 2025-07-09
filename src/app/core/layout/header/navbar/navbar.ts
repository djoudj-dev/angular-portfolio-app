import { Component, inject } from '@angular/core';
import { ScrollService } from '@app/core/services/scroll-service';
import { ButtonDarkMode } from '../button-dark-mode/button-dark-mode';
import { NAVIGATION_ITEMS } from '../constants/navlink';
import { NavMobile } from '../nav-mobile/nav-mobile';

@Component({
  selector: 'app-navbar',
  imports: [ButtonDarkMode, NavMobile],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  navigationItems = NAVIGATION_ITEMS;
  private readonly scrollService = inject(ScrollService);

  onNavigationClick(fragment?: string): void {
    this.scrollService.scrollToSection(fragment);
  }
}
