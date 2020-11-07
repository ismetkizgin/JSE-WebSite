import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from '../../../models';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'src/app/utils';

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
  recaptcha: any;
  ngOnInit(): void {}

  async onSubmit(messageForm: NgForm) {
    console.log(this.recaptcha);
    console.log(messageForm.value);
    try {
      let notification: any = {
        message: '',
        panelClass: '',
      };

      if (messageForm.valid) {
        this._translateService
          .get('Your message has been sent')
          .subscribe((value) => (notification.message = value));
        notification.panelClass = 'notification__success';
        if (!messageForm.value.SenderPhone)
          delete messageForm.value.SenderPhone;
        await this._messageService.insertAsync(messageForm.value);
        messageForm.resetForm();
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
    } catch (error) {
      console.log(error);
      this._messageService.errorNotification(error);
    }
  }

  handleSuccess(e) {
    this.recaptcha = e;
  }
}
