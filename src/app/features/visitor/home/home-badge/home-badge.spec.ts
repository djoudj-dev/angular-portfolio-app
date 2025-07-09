import { ComponentFixture, TestBed } from '@angular/core/testing';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { HomeBadge } from './home-badge';

describe('HomeBadge', () => {
  let component: HomeBadge;
  let fixture: ComponentFixture<HomeBadge>;

  beforeEach(async () => {
    // Register French locale for tests
    registerLocaleData(localeFr, 'fr');

    await TestBed.configureTestingModule({
      imports: [HomeBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
