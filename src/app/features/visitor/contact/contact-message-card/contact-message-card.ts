import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/button/button';
import {
  ContactStatusMessage,
  SubmissionStatus as StatusType,
} from '../contact-status-message/contact-status-message';
import { ContactService } from '../contact.service';
import { ContactForm } from '../interface/contact.interface';

type SubmissionStatus = 'idle' | 'success' | 'error';

@Component({
  selector: 'app-contact-message-card',
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    NgClass,
    ContactStatusMessage,
  ],
  template: `
    <div class="min-h-[500px]">
      @if (formSubmissionStatus() === 'idle') {
        <h3 class="text-text mb-4 text-xl font-bold">Envoyez-moi un message</h3>
        <form
          [formGroup]="contactForm"
          (ngSubmit)="onSubmit()"
          class="space-y-4"
        >
          <div style="position: absolute; left: -9999px; top: -9999px">
            <label for="honeypot">Ne pas remplir ce champ</label>
            <input
              type="text"
              id="honeypot"
              formControlName="honeypot"
              autocomplete="off"
              tabindex="-1"
            />
          </div>
          <div>
            <label for="name" class="text-text mb-1 block text-sm font-medium"
              >Nom</label
            >
            <input
              type="text"
              id="name"
              formControlName="name"
              class="bg-background text-text border-text focus:ring-accent w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
              [ngClass]="{
                'border-red-500':
                  (formSubmitted() || nameTouched()) && nameControl?.invalid,
              }"
              (blur)="nameTouched.set(true)"
            />
            @if (
              (formSubmitted() || nameTouched()) &&
              nameControl?.errors?.['required']
            ) {
              <p class="mt-1 text-xs text-red-500">Le nom est requis</p>
            }
            @if (
              (formSubmitted() || nameTouched()) &&
              nameControl?.errors?.['minlength']
            ) {
              <p class="mt-1 text-xs text-red-500">
                Le nom doit contenir au moins 3 caractères
              </p>
            }
          </div>

          <div>
            <label for="email" class="text-text mb-1 block text-sm font-medium"
              >Email</label
            >
            <input
              type="email"
              id="email"
              formControlName="email"
              class="bg-background text-text border-primary focus:ring-accent w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
              [ngClass]="{
                'border-red-500':
                  (formSubmitted() || emailTouched()) && emailControl?.invalid,
              }"
              (blur)="emailTouched.set(true)"
            />
            @if (
              (formSubmitted() || emailTouched()) &&
              emailControl?.errors?.['required']
            ) {
              <p class="mt-1 text-xs text-red-500">L'email est requis</p>
            }
            @if (
              (formSubmitted() || emailTouched()) &&
              emailControl?.errors?.['email']
            ) {
              <p class="mt-1 text-xs text-red-500">
                Veuillez entrer une adresse email valide
              </p>
            }
          </div>

          <div>
            <label
              for="subject"
              class="text-text mb-1 block text-sm font-medium"
              >Sujet</label
            >
            <input
              type="text"
              id="subject"
              formControlName="subject"
              class="bg-background text-text border-primary focus:ring-accent w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
              [ngClass]="{
                'border-red-500':
                  (formSubmitted() || subjectTouched()) &&
                  subjectControl?.invalid,
              }"
              (blur)="subjectTouched.set(true)"
            />
            @if (
              (formSubmitted() || subjectTouched()) &&
              subjectControl?.errors?.['required']
            ) {
              <p class="mt-1 text-xs text-red-500">Le sujet est requis</p>
            }
          </div>

          <div>
            <label
              for="message"
              class="text-text mb-1 block text-sm font-medium"
              >Message</label
            >
            <textarea
              id="message"
              formControlName="message"
              rows="5"
              class="bg-background text-text border-primary focus:ring-accent w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
              [ngClass]="{
                'border-red-500':
                  (formSubmitted() || messageTouched()) &&
                  messageControl?.invalid,
              }"
              (blur)="messageTouched.set(true)"
            ></textarea>
            @if (
              (formSubmitted() || messageTouched()) &&
              messageControl?.errors?.['required']
            ) {
              <p class="mt-1 text-xs text-red-500">Le message est requis</p>
            }
            @if (
              (formSubmitted() || messageTouched()) &&
              messageControl?.errors?.['minlength']
            ) {
              <p class="mt-1 text-xs text-red-500">
                Le message doit contenir au moins 10 caractères
              </p>
            }
          </div>

          <div>
            <app-button
              type="submit"
              color="accent"
              [disabled]="isSending()"
              [isLoading]="isSending()"
              customClass="px-6 py-2"
            >
              Envoyer
            </app-button>
          </div>
        </form>
      } @else {
        <app-contact-status-message
          [status]="getStatusForComponent()"
          (tryAgain)="resetForm()"
        />
      }
    </div>
  `,
})
export class ContactMessageCard {
  readonly formSubmitted = signal<boolean>(false);
  readonly isSending = signal<boolean>(false);
  readonly formSubmissionStatus = signal<SubmissionStatus>('idle');

  readonly nameTouched = signal<boolean>(false);
  readonly emailTouched = signal<boolean>(false);
  readonly subjectTouched = signal<boolean>(false);
  readonly messageTouched = signal<boolean>(false);

  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    honeypot: [''], // Honeypot field to catch bots
  });

  get nameControl() {
    return this.contactForm.get('name');
  }
  get emailControl() {
    return this.contactForm.get('email');
  }
  get subjectControl() {
    return this.contactForm.get('subject');
  }
  get messageControl() {
    return this.contactForm.get('message');
  }

  onSubmit(): void {
    this.formSubmitted.set(true);

    if (this.contactForm.get('honeypot')?.value) {
      console.warn('Bot detected');
      return;
    }

    if (this.contactForm.valid) {
      this.isSending.set(true);
      const formData: ContactForm = this.contactForm.value;

      this.contactService.sendContactForm(formData).subscribe({
        next: () => {
          this.formSubmissionStatus.set('success');
          this.contactForm.reset();
          this.formSubmitted.set(false);
          this.nameTouched.set(false);
          this.emailTouched.set(false);
          this.subjectTouched.set(false);
          this.messageTouched.set(false);
        },
        error: () => {
          this.formSubmissionStatus.set('error');
        },
        complete: () => {
          this.isSending.set(false);
        },
      });
    }
  }

  // Reset the form to allow the user to try again
  resetForm(): void {
    this.formSubmissionStatus.set('idle');
    this.formSubmitted.set(false);
    this.contactForm.reset();
    // Reset touched state for all fields
    this.nameTouched.set(false);
    this.emailTouched.set(false);
    this.subjectTouched.set(false);
    this.messageTouched.set(false);
  }

  // Convert internal SubmissionStatus to StatusType for the ContactStatusMessage component
  getStatusForComponent(): StatusType {
    return this.formSubmissionStatus() === 'success' ? 'success' : 'error';
  }
}
