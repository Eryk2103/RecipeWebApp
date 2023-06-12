import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecipesPageComponent } from './user-recipes-page.component';

describe('UserRecipesPageComponent', () => {
  let component: UserRecipesPageComponent;
  let fixture: ComponentFixture<UserRecipesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRecipesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRecipesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
