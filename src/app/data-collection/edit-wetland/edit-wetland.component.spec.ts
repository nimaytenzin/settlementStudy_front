import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWetlandComponent } from './edit-wetland.component';

describe('EditWetlandComponent', () => {
  let component: EditWetlandComponent;
  let fixture: ComponentFixture<EditWetlandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWetlandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWetlandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
