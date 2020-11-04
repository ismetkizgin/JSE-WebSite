import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogMenuComponent } from './blog-menu.component';

describe('BlogMenuComponent', () => {
  let component: BlogMenuComponent;
  let fixture: ComponentFixture<BlogMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
