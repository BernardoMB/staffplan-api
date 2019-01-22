import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenRoleComponent } from './open-role.component';

describe('OpenRoleComponent', () => {
  let component: OpenRoleComponent;
  let fixture: ComponentFixture<OpenRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
