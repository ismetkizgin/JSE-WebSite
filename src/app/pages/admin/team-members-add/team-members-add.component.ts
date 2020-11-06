import { Component, OnInit } from '@angular/core';
import { TeamMember } from '../../../models';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamMemberService } from '../../../utils';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-team-members-add',
  templateUrl: './team-members-add.component.html',
  styleUrls: ['./team-members-add.component.scss'],
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
  ) {}

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
    } else {
      this._action = this.insertActionAsync;
    }
  }

  onFileSelect(event) {
    this._model.Image = event.target.files[0];
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
      const formData = new FormData();
      formData.append('Image', this._model.Image);
      formData.set('TeamMemberName', teamForm.value.TeamMemberName);
      formData.set('TeamMemberTitle', teamForm.value.TeamMemberTitle);
      formData.set('TeamMemberGithub', teamForm.value.TeamMemberGithub);
      formData.set('TeamMemberLinkedin', teamForm.value.TeamMemberLinkedin);
      formData.set(
        'TeamMemberDescription',
        teamForm.value.TeamMemberDescription
      );
      formData.set('TeamMemberCompany', teamForm.value.TeamMemberCompany);

      await this._teamMemberService.insertAsync(formData);
      this._model.Image = null;
      teamForm.resetForm();
      return true;
    } catch (error) {
      this._teamMemberService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(teamForm: NgForm) {
    try {
      const formData = new FormData();
      if (this._model.Image) formData.append('Image', this._model.Image);
      formData.set('TeamMemberName', teamForm.value.TeamMemberName);
      formData.set('TeamMemberTitle', teamForm.value.TeamMemberTitle);
      formData.set('TeamMemberGithub', teamForm.value.TeamMemberGithub);
      formData.set('TeamMemberLinkedin', teamForm.value.TeamMemberLinkedin);
      formData.set(
        'TeamMemberDescription',
        teamForm.value.TeamMemberDescription
      );
      formData.set('TeamMemberCompany', teamForm.value.TeamMemberCompany);
      formData.set(
        'TeamMemberID',
        this._activatedRoute.snapshot.paramMap.get('MemberID')
      );

      await this._teamMemberService.updateAsync(formData);
      return true;
    } catch (error) {
      this._teamMemberService.errorNotification(error);
      return false;
    }
  }
}
