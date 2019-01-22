import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffTimeLineComponent } from './staff-time-line.component';

describe('StaffTimeLineComponent', () => {
  let component: StaffTimeLineComponent;
  let fixture: ComponentFixture<StaffTimeLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffTimeLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffTimeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
