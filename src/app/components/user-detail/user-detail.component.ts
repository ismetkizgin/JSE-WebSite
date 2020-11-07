import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models';
import {UserService}from '../../utils/services';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _userService:UserService
  ) { }
  
  _model:User=new User();

  ngOnInit(): void {
    try {
      this._model = this.data;
    } catch (error) {
      this._userService.errorNotification(error);
    }
  }

}
