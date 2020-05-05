import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResDashboardComponent } from './res-dashboard.component';

describe('ResDashboardComponent', () => {
  let component: ResDashboardComponent;
  let fixture: ComponentFixture<ResDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
