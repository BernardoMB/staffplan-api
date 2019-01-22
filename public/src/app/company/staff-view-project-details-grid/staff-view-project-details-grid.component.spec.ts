import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffViewProjectDetailsGridComponent } from './staff-view-project-details-grid.component';

describe('StaffViewProjectDetailsGridComponent', () => {
  let component: StaffViewProjectDetailsGridComponent;
  let fixture: ComponentFixture<StaffViewProjectDetailsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffViewProjectDetailsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffViewProjectDetailsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
