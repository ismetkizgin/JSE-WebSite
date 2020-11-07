import { Component, OnInit } from '@angular/core';
import { ChangePasswordComponent } from '../../../change-password/change-password.component';
import { AuthService } from '../../../../utils';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent implements OnInit {
  constructor(private _authService: AuthService, private _dialog: MatDialog) {}

  userInformation = this._authService.currentUserValue.result;

  ngOnInit(): void {}

  openPasswordChangeWindow() {
    this._dialog.open(ChangePasswordComponent, {
      width: '400px',
    });
  }

  async signout() {
    await this._authService.logout();
  }
}
