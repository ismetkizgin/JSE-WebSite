import { Component, OnInit } from '@angular/core';
import { TeamMember } from '../../../models';
import { MatDialog } from '@angular/material/dialog';
import { DialogWindowComponent } from '../../../components';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-team-member-list',
  templateUrl: './team-member-list.component.html',
  styleUrls: ['./team-member-list.component.scss'],
})
export class TeamMemberListComponent implements OnInit {
  constructor(
   
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    )
     {}
  searchText: string; 
  paginationConfig = {
    id: 'TeamMemberList',
    itemsPerPage: 10,
    currentPage: 1,
  };
  teamMembers: Array<TeamMember> = [
    { TeamMemberID: 10, TeamMemberName: 'dsdgsd', TeamMemberTitle: 'djksfnsd' },
  ];

  ngOnInit(): void {}

  async teamMemberDelete(TeamMemberID) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the team member?',
        icon: 'fa fa-exclamation',
      },
    });
  }
}
