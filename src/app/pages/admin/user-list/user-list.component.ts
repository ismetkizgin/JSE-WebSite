import { Component, OnInit } from '@angular/core';
import { User } from "../../../models";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor() { }
  searchText: String;
  users: Array<User>;
  ngOnInit(): void {
    this.users = [{
      UserFirstName: "Elif",
      UserID: 1,
      UserLastName: "Yaren",
      UserTypeName: "root",
      UserEmail: "eyt@gmail.com",
      UserPassword: "abc",
    },
    {
      UserFirstName: "Elif",
      UserID: 1,
      UserLastName: "Yaren",
      UserTypeName: "root",
      UserEmail: "eyt@gmail.com",
      UserPassword: "abc",
    },
    {
      UserFirstName: "Elif",
      UserID: 1,
      UserLastName: "Yaren",
      UserTypeName: "root",
      UserEmail: "eyt@gmail.com",
      UserPassword: "abc",
    }]
  }

}
