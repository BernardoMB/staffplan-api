import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStaffingComponent } from './project-staffing.component';

describe('ProjectStaffingComponent', () => {
  let component: ProjectStaffingComponent;
  let fixture: ComponentFixture<ProjectStaffingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectStaffingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStaffingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
