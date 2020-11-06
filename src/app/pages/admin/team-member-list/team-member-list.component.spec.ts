import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberListComponent } from './team-member-list.component';

describe('TeamMemberListComponent', () => {
  let component: TeamMemberListComponent;
  let fixture: ComponentFixture<TeamMemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMemberListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
