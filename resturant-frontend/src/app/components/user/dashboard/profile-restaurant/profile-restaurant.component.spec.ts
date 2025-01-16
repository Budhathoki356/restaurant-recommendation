import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRestaurantComponent } from './profile-restaurant.component';

describe('ProfileRestaurantComponent', () => {
  let component: ProfileRestaurantComponent;
  let fixture: ComponentFixture<ProfileRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
