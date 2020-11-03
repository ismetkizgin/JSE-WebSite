import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User, Roles } from '../../../models';
import { AuthService } from '../../../utils/services';
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  userModel: User = new User();
  _passwordShowHide: boolean = false;

  constructor(
    private _authService: AuthService,
    public _router: Router
  ) { }
  _UserTypeName = this._authService.currentUserValue.result.UserTypeName;
  userRoles: Array<object> = [
    {
      userTypeName: 'Administrator',
      authorize:
        [Roles.Root].indexOf(this._UserTypeName) === -1 ? false : true,
    },
    {
      userTypeName: 'Editor',
      authorize:
        [Roles.Root, Roles.Administrator].indexOf(this._UserTypeName) === -1
          ? false
          : true,
    }
  ];
  ngOnInit(): void {
  }
  onSave(userForm: NgForm) {

  }
  onAutomaticPasswordGeneration(): void {
    this.userModel.UserPassword = this._authService.creatingPassword(8);
    this._passwordShowHide = true;
  }

  onPasswordToggle(): void {
    if (this._passwordShowHide) this._passwordShowHide = false;
    else this._passwordShowHide = true;
  }
}
