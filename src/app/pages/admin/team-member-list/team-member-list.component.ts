import { Component, OnInit } from '@angular/core';
import { TeamMember } from '../../../models';
import { MatDialog } from '@angular/material/dialog';
import { DialogWindowComponent } from '../../../components';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamMemberService } from 'src/app/utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-team-member-list',
  templateUrl: './team-member-list.component.html',
  styleUrls: ['./team-member-list.component.scss'],
})
export class TeamMemberListComponent implements OnInit {
  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _teamMemberService: TeamMemberService
  ) {}
  searchText: string;
  paginationConfig = {
    id: 'TeamMemberList',
    itemsPerPage: 10,
    currentPage: 1,
  };
  teamMembers: Array<TeamMember>;
  async ngOnInit() {
    try {
      this.teamMembers = <Array<TeamMember>>await this._teamMemberService.listAsync();
    } catch (error) {
      this._teamMemberService.errorNotification(error);
    }
  }

  async teamMemberDelete(TeamMemberID) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the team member ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._teamMemberService.deleteAsync({ TeamMemberID });
          this.teamMembers.splice(
            this.teamMembers.findIndex((teamMember) => teamMember.TeamMemberID == TeamMemberID),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Team member information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._teamMemberService.errorNotification(error);
        }
      }
    });
  }
}
