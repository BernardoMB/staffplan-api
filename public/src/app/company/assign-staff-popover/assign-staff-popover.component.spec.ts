import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignStaffPopoverComponent } from './assign-staff-popover.component';

describe('AssignStaffPopoverComponent', () => {
  let component: AssignStaffPopoverComponent;
  let fixture: ComponentFixture<AssignStaffPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignStaffPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignStaffPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
