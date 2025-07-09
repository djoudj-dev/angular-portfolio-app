import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBadgeTech } from './about-badge-tech';

describe('AboutBadgeTech', () => {
  let component: AboutBadgeTech;
  let fixture: ComponentFixture<AboutBadgeTech>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutBadgeTech],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutBadgeTech);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
