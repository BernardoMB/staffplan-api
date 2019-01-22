import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureDaysComponent } from './future-days.component';

describe('FutureDaysComponent', () => {
  let component: FutureDaysComponent;
  let fixture: ComponentFixture<FutureDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
