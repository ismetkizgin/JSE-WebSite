import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from '../../../models';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'src/app/utils';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _messageService: MessageService
  ) {}
  _model: Message = new Message();
  recaptchaSiteKey: string = environment.recaptchaSiteKey;
  ngOnInit(): void {}

  async onSubmit(messageForm: NgForm) {
    console.log(messageForm.value);
    try {
      let notification: any = {
        message: '',
        panelClass: '',
      };

      if (messageForm.valid && this._model.recaptcha) {
        this._translateService
          .get('Your message has been sent')
          .subscribe((value) => (notification.message = value));
        notification.panelClass = 'notification__success';
        if (!messageForm.value.SenderPhone)
          delete messageForm.value.SenderPhone;
        delete messageForm.value.recaptcha;
        await this._messageService.insertAsync(messageForm.value);
        messageForm.resetForm();
      } else {
        this._translateService
          .get('Please fill in the required fields')
          .subscribe((value) => (notification.message = value));
        notification.panelClass = 'notification__error';
      }

      this._snackBar.open(notification.message, 'X', {
        duration: 6000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: notification.panelClass,
      });
    } catch (error) {
      console.log(error);
      this._messageService.errorNotification(error);
    }
  }
}
