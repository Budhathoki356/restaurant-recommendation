import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResInfoComponent } from './res-info.component';

describe('ResInfoComponent', () => {
  let component: ResInfoComponent;
  let fixture: ComponentFixture<ResInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
