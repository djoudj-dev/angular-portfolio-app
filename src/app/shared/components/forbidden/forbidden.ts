import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  template: `
    <div class="min-h-screen flex items-center justify-center bg-background">
      <div class="max-w-md w-full p-8 bg-background rounded-lg shadow-lg text-center">
        <h1 class="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p class="text-text mb-6">
          You don't have permission to access this page.
        </p>
        <div class="flex justify-center space-x-4">
          <button
            (click)="goBack()"
            class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition duration-300"
          >
            Go Back
          </button>
          <button
            (click)="goHome()"
            class="px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white font-medium rounded-md transition duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  `,
})
export class Forbidden {
  private readonly router = inject (Router);

  goBack(): void {
    window.history.back();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
