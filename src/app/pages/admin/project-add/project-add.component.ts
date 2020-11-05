import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Project} from '../../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, ProjectService, LanguageService } from '../../../utils';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {
  _model: Project = new Project();
  lang: string = this._languageService.getLanguage() || 'tr';
  _action: Function;

  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _projectService: ProjectService,
    private _activatedRoute: ActivatedRoute,
    private _dialog: MatDialog,
    private _authService: AuthService,
    private _languageService: LanguageService,

    public _router: Router
  ) { }

  async ngOnInit() {
    const ProjectID = this._activatedRoute.snapshot.paramMap.get('ProjectID');
    if (ProjectID != null) {
      try {
        this._model = <any>await this._projectService.findAsync(ProjectID);
      } catch (error) {
        this._projectService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    }else {
      this._action = this.insertActionAsync;
    }
  }

  async onSave(projectForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (projectForm.valid) {
      this._translateService
        .get('Project registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(projectForm))) return;
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

  async insertActionAsync(projectForm: NgForm) {
    try {
      console.log(projectForm);
      await this._projectService.insertAsync(projectForm.value);
      projectForm.resetForm();
      return true;
    } catch (error) {
      this._projectService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(projectForm: NgForm) {
    try {
      await this._projectService.updateAsync(
        Object.assign(projectForm.value, {
          ProjectID: parseInt(
            this._activatedRoute.snapshot.paramMap.get('ProjectID')
          ),
        })
      );
      return true;
    } catch (error) {
      this._projectService.errorNotification(error);
      return false;
    }
  }

}
