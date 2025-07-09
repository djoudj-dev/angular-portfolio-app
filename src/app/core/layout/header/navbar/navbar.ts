import { Component } from '@angular/core';
import { ButtonDarkMode } from '../button-dark-mode/button-dark-mode';

@Component({
  selector: 'app-navbar',
  imports: [ButtonDarkMode],
  templateUrl: './navbar.html',
})
export class Navbar {}
