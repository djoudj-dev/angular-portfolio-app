import { Component } from '@angular/core';
import { Navbar } from './core/layout/header/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'angular-portfolio-app';
}
