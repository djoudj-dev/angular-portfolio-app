import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMain } from './about-main';

describe('AboutMain', () => {
  let component: AboutMain;
  let fixture: ComponentFixture<AboutMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutMain],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
