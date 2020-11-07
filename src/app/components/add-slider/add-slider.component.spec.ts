import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSliderComponent } from './add-slider.component';

describe('AddSliderComponent', () => {
  let component: AddSliderComponent;
  let fixture: ComponentFixture<AddSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
