import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffViewProjectDetailsPopoverComponent } from './staff-view-project-details-popover.component';

describe('StaffViewProjectDetailsPopoverComponent', () => {
  let component: StaffViewProjectDetailsPopoverComponent;
  let fixture: ComponentFixture<StaffViewProjectDetailsPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffViewProjectDetailsPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffViewProjectDetailsPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
