import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { LoginRequest } from '@core/services/auth.service';
import { ButtonComponent } from '@app/shared/button/button';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const loginData: LoginRequest = this.loginForm.value;

    this.authService.login(loginData).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.successMessage.set('Connexion réussie !');

        // Get return URL from route parameters or default to '/admin/dashboard'
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] ?? '/admin/dashboard';

        // Short delay to show the success message
        setTimeout(() => {
          this.router.navigateByUrl(returnUrl);
        }, 1000);
      },
      error: (error) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(
          error.message ?? 'Identifiants invalides ou erreur de connexion.'
        );
      },
    });
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.loginForm.get(controlName);

    if (!control || !control.touched || !control.errors) {
      return null;
    }

    const errors = control.errors;

    if (errors['required']) {
      return 'Ce champ est requis';
    }

    if (controlName === 'email' && errors['email']) {
      return 'Veuillez fournir une adresse e-mail valide';
    }

    return 'Champ invalide';
  }
}
