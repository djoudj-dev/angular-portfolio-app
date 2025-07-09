import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsCertification } from './skills-certification';

describe('SkillsCertification', () => {
  let component: SkillsCertification;
  let fixture: ComponentFixture<SkillsCertification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsCertification],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsCertification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
