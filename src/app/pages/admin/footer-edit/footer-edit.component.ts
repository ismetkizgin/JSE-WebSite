import { Component, OnInit } from '@angular/core';
import { Setting} from '../../../models';
import {SettingService} from '../../../utils';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-footer-edit',
  templateUrl: './footer-edit.component.html',
  styleUrls: ['./footer-edit.component.scss']
})
export class FooterEditComponent implements OnInit {
  _model: Setting = new Setting();
  _action: Function;

  constructor(
    private _settingService: SettingService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
  ) { }

  async ngOnInit(){
    try {
      this._model = <Setting> await this._settingService.getAsync();
      this._action = this.updateActionAsync;
    } catch (error) {
      this._settingService.errorNotification(error);
    }
  }

  async onSave(footerForm: NgForm){
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (footerForm.valid) {
      this._translateService
        .get('Footer registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(footerForm))) return;
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

  async updateActionAsync(footerForm: NgForm) {
    try {
      await this._settingService.updateAsync(footerForm.value);
      return true;
    } catch (error) {
      this._settingService.errorNotification(error);
      return false;
    }
  }

}
