import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectViewStaffDetailPopoverComponent } from './project-view-staff-detail-popover.component';

describe('ProjectViewStaffDetailPopoverComponent', () => {
  let component: ProjectViewStaffDetailPopoverComponent;
  let fixture: ComponentFixture<ProjectViewStaffDetailPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectViewStaffDetailPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectViewStaffDetailPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
