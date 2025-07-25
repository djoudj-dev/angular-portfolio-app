import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from '@core/layout/header/navbar/navbar';
import { About } from '@features/visitor/about/about';
import { Contact } from '@features/visitor/contact/contact';
import { Project } from '@features/visitor/project/project';
import { Skills } from '@features/visitor/skills/skills';
import { FooterComponent } from '@shared/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, About, Skills, Project, Contact, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'angular-portfolio-app';
  protected router = inject(Router);
}
