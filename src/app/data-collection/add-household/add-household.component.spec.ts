import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHouseholdComponent } from './add-household.component';

describe('AddHouseholdComponent', () => {
  let component: AddHouseholdComponent;
  let fixture: ComponentFixture<AddHouseholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHouseholdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHouseholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
