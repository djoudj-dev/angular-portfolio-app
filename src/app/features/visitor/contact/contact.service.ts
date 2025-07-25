import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import {
  ContactForm,
  ContactFormResponse,
} from './interface/contact.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  sendContactForm(formData: ContactForm): Observable<ContactFormResponse> {
    return this.http.post<ContactFormResponse>(
      `${this.apiUrl}/contact`,
      formData,
    );
  }
}
