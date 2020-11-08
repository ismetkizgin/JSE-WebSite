import { Component, OnInit } from '@angular/core';
import { Message } from '../../../models';
import { MessageService } from '../../../utils';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogWindowComponent, MessageDetailComponent } from '../../../components';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  messages: Array<Message>;
  searchText: String;
  paginationConfig = {
    id: 'messageList',
    itemsPerPage: 10,
    currentPage: 1,
  };
  
  constructor(
    private _messageService: MessageService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _dialog: MatDialog
  ) { }

  examineOpenDialog(MessageID){
    const diologRef = this._dialog.open(MessageDetailComponent, {
      width: '500px',
      data: this.messages.find(
        (message) => message.MessageID == MessageID
      ),
    });
  }

  async ngOnInit() {
    try {
      this.messages = <Array<Message>>await this._messageService.listAsync();
    } catch (error) {
      this._messageService.errorNotification(error);
    }
  }
  async messageDelete(MessageID) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the message ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._messageService.deleteAsync({ MessageID });
          this.messages.splice(
            this.messages.findIndex((message) => message.MessageID == MessageID),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Message information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._messageService.errorNotification(error);
        }
      }
    });
  }

}
