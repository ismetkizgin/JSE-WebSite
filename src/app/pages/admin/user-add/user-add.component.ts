import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User, Roles } from '../../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, UserService } from '../../../utils';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PasswordControlWindowComponent } from '../../../components/';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {
  _model: User = new User();
  _passwordShowHide: boolean = false;

  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _dialog: MatDialog,
    private _authService: AuthService,
    public _router: Router
  ) {}
  _UserTypeName = this._authService.currentUserValue.result.UserTypeName;
  _action: Function;
  userRoles: Array<object> = [
    {
      userTypeName: 'Administrator',
      authorize: [Roles.Root].indexOf(this._UserTypeName) === -1 ? false : true,
    },
    {
      userTypeName: 'Editor',
      authorize:
        [Roles.Root, Roles.Administrator].indexOf(this._UserTypeName) === -1
          ? false
          : true,
    },
  ];

  async ngOnInit() {
    const UserID = this._activatedRoute.snapshot.paramMap.get('UserID');
    if (UserID != null) {
      try {
        this._model = <any>await this._userService.findAsync(UserID);
      } catch (error) {
        this._userService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    } else if (this._router.isActive('/admin/user/profile', true)) {
      this._model = JSON.parse(
        JSON.stringify(this._authService.currentUserValue.result)
      );
      this._model.UserTypeName = null;
      this._action = this.updateProfileActionAsync;
    } else {
      this._action = this.insertActionAsync;
    }
  }

  async onSave(userForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (userForm.valid) {
      this._translateService
        .get('User registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(userForm))) return;
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

  onAutomaticPasswordGeneration(): void {
    this._model.UserPassword = this._authService.creatingPassword(8);
    this._passwordShowHide = true;
  }

  onPasswordToggle(): void {
    if (this._passwordShowHide) this._passwordShowHide = false;
    else this._passwordShowHide = true;
  }

  async insertActionAsync(userForm: NgForm) {
    try {
      console.log(userForm);
      await this._userService.insertAsync(userForm.value);
      userForm.resetForm();
      return true;
    } catch (error) {
      this._userService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(userForm: NgForm) {
    try {
      await this._userService.updateAsync(
        Object.assign(userForm.value, {
          UserID: parseInt(
            this._activatedRoute.snapshot.paramMap.get('UserID')
          ),
        })
      );
      return true;
    } catch (error) {
      this._userService.errorNotification(error);
      return false;
    }
  }

  async updateProfileActionAsync(userForm: NgForm) {
    try {
      await this._authService.updateProfile(userForm.value);
      this._model.UserPassword = null;
      return true;
    } catch (error) {
      this._userService.errorNotification(error);
      return false;
    }
  }

  myAccountDelete() {
    const diologRef = this._dialog.open(PasswordControlWindowComponent, {
      width: '400px',
    });

    diologRef.afterClosed().subscribe(async (result: any) => {
      if (result) {
        try {
          await this._authService.deleteProfile(result);
          let message;
          this._translateService
            .get('Your account has been deleted')
            .subscribe((value) => (message = value));
          this._snackBar.open(message, 'X', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: 'notification__success',
          });
          this._authService.logout();
          this._router.navigateByUrl('login');
        } catch (error) {
          this._authService.errorNotification(error);
        }
      }
    });
  }
}
