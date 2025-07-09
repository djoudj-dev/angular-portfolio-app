import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPagination } from './project-pagination';

describe('ProjectPagination', () => {
  let component: ProjectPagination;
  let fixture: ComponentFixture<ProjectPagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPagination],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectPagination);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
