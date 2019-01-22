import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectQuickViewsComponent } from './project-quick-views.component';

describe('ProjectQuickViewsComponent', () => {
  let component: ProjectQuickViewsComponent;
  let fixture: ComponentFixture<ProjectQuickViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectQuickViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectQuickViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
