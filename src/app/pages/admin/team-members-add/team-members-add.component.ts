import { Component, OnInit } from '@angular/core';
import {TeamMember} from '../../../models';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, ProjectService, LanguageService, TeamMemberService} from '../../../utils';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-team-members-add',
  templateUrl: './team-members-add.component.html',
  styleUrls: ['./team-members-add.component.scss']
})
export class TeamMembersAddComponent implements OnInit {
  _action: Function;
  _model: TeamMember = new TeamMember();

  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _activatedRoute: ActivatedRoute,
    private _teamMemberService: TeamMemberService,
    public _router: Router
  ) { }

  async ngOnInit() {
    const MemberID = this._activatedRoute.snapshot.paramMap.get('MemberID');
    if (MemberID != null) {
      try {
       this._model = <any>await this._teamMemberService.findAsync(MemberID);
      } catch (error) {
        this._teamMemberService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    }else {
      this._action = this.insertActionAsync;
    }
  }

  async onSave(teamForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (teamForm.valid) {
      this._translateService
        .get('Member registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(teamForm))) return;
    } else {
      this._translateService
        .get('Please fill in the required fields')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__error';
    }

    this._snackBar.open(notification.message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: notification.panelClass,
    });
  }

  async insertActionAsync(teamForm: NgForm) {
    try {
      console.log(teamForm);
      await this._teamMemberService.insertAsync(teamForm.value);
      teamForm.resetForm();
      return true;
    } catch (error) {
      this._teamMemberService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(teamForm: NgForm) {
    try {
      await this._teamMemberService.updateAsync(
        Object.assign(teamForm.value, {
          ProjectID: parseInt(
            this._activatedRoute.snapshot.paramMap.get('MemberID')
          ),
        })
      );
      return true;
    } catch (error) {
      this._teamMemberService.errorNotification(error);
      return false;
    }
  }
}
