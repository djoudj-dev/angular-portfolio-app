import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMessageCard } from './contact-message-card';

describe('ContactMessageCard', () => {
  let component: ContactMessageCard;
  let fixture: ComponentFixture<ContactMessageCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactMessageCard],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactMessageCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
