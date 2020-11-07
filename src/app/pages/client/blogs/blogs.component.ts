import { Component, OnInit } from '@angular/core';
import { Blog } from '../../../models';
import { BlogService } from '../../../utils';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  constructor(
    private _blogService: BlogService,
    private _activatedRoute: ActivatedRoute
  ) {}

  searchText: String;
  paginationConfig = {
    id: 'blog',
    itemsPerPage: 5,
    currentPage: 1,
  };
  blogs: Array<Blog>;

  async ngOnInit() {
    try {
      const BlogMenuID = this._activatedRoute.snapshot.paramMap.get(
        'BlogMenuID'
      );
      this.blogs = <Array<Blog>>(
        await this._blogService.listAsync({ BlogMenuID })
      );
    } catch (error) {
      this._blogService.errorNotification(error);
    }
  }
}
