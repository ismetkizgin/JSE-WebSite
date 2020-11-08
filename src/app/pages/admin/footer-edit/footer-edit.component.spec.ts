import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterEditComponent } from './footer-edit.component';

describe('FooterEditComponent', () => {
  let component: FooterEditComponent;
  let fixture: ComponentFixture<FooterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
