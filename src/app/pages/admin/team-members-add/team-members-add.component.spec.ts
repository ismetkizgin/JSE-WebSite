import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMembersAddComponent } from './team-members-add.component';

describe('TeamMembersAddComponent', () => {
  let component: TeamMembersAddComponent;
  let fixture: ComponentFixture<TeamMembersAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMembersAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMembersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
