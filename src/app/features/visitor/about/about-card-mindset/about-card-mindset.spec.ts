import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCardMindset } from './about-card-mindset';

describe('AboutCardMindset', () => {
  let component: AboutCardMindset;
  let fixture: ComponentFixture<AboutCardMindset>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutCardMindset],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutCardMindset);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
