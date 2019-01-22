import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffQuickViewsComponent } from './staff-quick-views.component';

describe('StaffQuickViewsComponent', () => {
  let component: StaffQuickViewsComponent;
  let fixture: ComponentFixture<StaffQuickViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffQuickViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffQuickViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
