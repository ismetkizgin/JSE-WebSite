import { Component, OnInit } from '@angular/core';
import { TeamMember } from '../../../models';
import { TeamMemberService } from '../../../utils/services';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss'],
})
export class TeamMembersComponent implements OnInit {
  constructor(private _teamMemberService: TeamMemberService) {}

  teamMembers: Array<TeamMember>;

  async ngOnInit() {
    try {
      this.teamMembers = <Array<TeamMember>>(
        await this._teamMemberService.listAsync()
      );
    } catch (error) {
      this._teamMemberService.errorNotification(error);
    }
  }
}
