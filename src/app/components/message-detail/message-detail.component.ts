import { Message } from '../../models';
import { Component, OnInit , Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from '../../utils/services';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _messageService:MessageService,
  ) { }

  _model:Message=new Message();
  ngOnInit(): void {
    this._messageService.findAsync(this.data?.MessageID);
    try {
      this._model = this.data;
    } catch (error) {
      this._messageService.errorNotification(error);
    }
  }

}
