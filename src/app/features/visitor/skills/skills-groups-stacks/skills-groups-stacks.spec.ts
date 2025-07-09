import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsGroupsStacks } from './skills-groups-stacks';

describe('SkillsGroupsStacks', () => {
  let component: SkillsGroupsStacks;
  let fixture: ComponentFixture<SkillsGroupsStacks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsGroupsStacks],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsGroupsStacks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
