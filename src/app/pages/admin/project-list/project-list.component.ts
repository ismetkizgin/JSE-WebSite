import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {
  
  DialogWindowComponent,
} from '../../../components';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,

    private _dialog: MatDialog
  ) {}

  projects: Array<Project> = [
    {
      ProjectID : 1,
      ProjectName : 'JSE project',
      ProjectDescription:'xxxxx'
    },
    {
      ProjectID : 2,
      ProjectName : 'JSE project',
      ProjectDescription:'xxxxx'
    },
    {
      ProjectID : 3,
      ProjectName : 'JSE project',
      ProjectDescription:'xxxxx'
    },
    {
      ProjectID : 4,
      ProjectName : 'JSE project',
      ProjectDescription:'xxxxx'
    }
  ] ;
  searchText: string;
  paginationConfig = {
    id: 'ProjectList',
    itemsPerPage: 10,
    currentPage: 1,
  };

  ngOnInit(): void {

  }


  async projectListDelete(ProjectID) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the project ?',
        icon: 'fa fa-exclamation',
      },
    });

  }

}  