import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLabelCreateComponent } from './custom-label-create.component';

describe('CustomLabelCreateComponent', () => {
  let component: CustomLabelCreateComponent;
  let fixture: ComponentFixture<CustomLabelCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomLabelCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomLabelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
