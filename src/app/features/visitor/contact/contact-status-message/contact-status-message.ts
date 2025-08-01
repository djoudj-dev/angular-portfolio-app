import { NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '@shared/button/button';

export type SubmissionStatus = 'success' | 'error';

@Component({
  selector: 'app-contact-status-message',
  imports: [ButtonComponent, NgOptimizedImage],
  template: `
    <div class="flex flex-col items-center justify-center py-14">
      <div class="text-center">
        @if (status() === 'success') {
          <img
            [ngSrc]="'contact/success.svg'"
            alt="Error icon"
            class="mx-auto h-48 w-48"
            width="128"
            height="128"
          />

          <h4 class="text-text mb-2 text-xl font-bold">
            Message envoyé avec succès!
          </h4>
          <p class="text-text/70 mb-6 text-center">
            Merci pour votre message. Je vous répondrai dans les plus brefs
            délais.
          </p>
        } @else {
          <img
            [ngSrc]="'contact/error.svg'"
            alt="Error icon"
            class="mx-auto h-48 w-48"
            width="128"
            height="128"
          />

          <h4 class="text-text mb-2 text-xl font-bold">Erreur d'envoi</h4>
          <p class="text-text/70 mb-6 text-center">
            Une erreur s'est produite lors de l'envoi de votre message. Veuillez
            réessayer.
          </p>
        }
      </div>

      <app-button
        color="accent"
        customClass="px-6 py-2"
        (buttonClick)="tryAgain.emit()"
      >
        {{ status() === 'success' ? 'Envoyer un autre message' : 'Réessayer' }}
      </app-button>
    </div>
  `,
})
export class ContactStatusMessage {
  readonly status = input.required<SubmissionStatus>();
  readonly tryAgain = output<void>();
}
