import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsGridComponent } from './project-view-staff-details-grid.component';

describe('ProjectDetailsGridComponent', () => {
  let component: ProjectDetailsGridComponent;
  let fixture: ComponentFixture<ProjectDetailsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDetailsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
