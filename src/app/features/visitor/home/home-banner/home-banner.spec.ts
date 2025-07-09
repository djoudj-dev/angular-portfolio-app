import { ComponentFixture, TestBed } from '@angular/core/testing';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { HomeBanner } from './home-banner';

describe('HomeBanner', () => {
  let component: HomeBanner;
  let fixture: ComponentFixture<HomeBanner>;

  beforeEach(async () => {
    // Register French locale for tests
    registerLocaleData(localeFr, 'fr');

    await TestBed.configureTestingModule({
      imports: [HomeBanner],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
