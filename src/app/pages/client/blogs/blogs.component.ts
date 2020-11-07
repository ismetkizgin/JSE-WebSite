import { Component, OnInit } from '@angular/core';
import { Blog } from '../../../models';
import { BlogService } from '../../../utils';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  constructor(private _blogService: BlogService) {}

  searchText: String;
  paginationConfig = {
    id: 'blog',
    itemsPerPage: 5,
    currentPage: 1,
  };
  blogs: Array<Blog>;

  async ngOnInit() {
    try {
      this.blogs = <Array<Blog>>await this._blogService.listAsync();
    } catch (error) {
      this._blogService.errorNotification(error);
    }
  }
}
