import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinationCreateComponent } from './combination-create.component';

describe('CombinationCreateComponent', () => {
  let component: CombinationCreateComponent;
  let fixture: ComponentFixture<CombinationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombinationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
