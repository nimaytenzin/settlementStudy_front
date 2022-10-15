import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFootpathComponent } from './edit-footpath.component';

describe('EditFootpathComponent', () => {
  let component: EditFootpathComponent;
  let fixture: ComponentFixture<EditFootpathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFootpathComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFootpathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
