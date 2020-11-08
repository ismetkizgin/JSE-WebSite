import { Component, OnInit } from '@angular/core';
import { BlogMenu } from 'src/app/models';
import { BlogMenuService } from 'src/app/utils';

@Component({
  selector: 'app-client-navbar',
  templateUrl: './client-navbar.component.html',
  styleUrls: ['./client-navbar.component.scss'],
})
export class ClientNavbarComponent implements OnInit {
  constructor(private _blogMenuService: BlogMenuService) {}

  blogMenus: Array<BlogMenu>;
  async ngOnInit() {
    this.blogMenus = <Array<BlogMenu>>await this._blogMenuService.listAsync();
  }
}
