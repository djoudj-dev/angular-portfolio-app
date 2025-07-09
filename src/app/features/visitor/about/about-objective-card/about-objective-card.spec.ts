import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutObjectiveCard } from './about-objective-card';

describe('AboutObjectiveCard', () => {
  let component: AboutObjectiveCard;
  let fixture: ComponentFixture<AboutObjectiveCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutObjectiveCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutObjectiveCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
