import { Component, OnInit } from '@angular/core';
import { Blog } from '../../../models';
import { BlogService } from '../../../utils';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  constructor(
    private _blogService: BlogService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this._router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.ngOnInit();
        window.scrollTo(0, 0);
      }
    });
  }

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
        await this._blogService.listAsync({ BlogMenuID, BlogState: true })
      );
    } catch (error) {
      this._blogService.errorNotification(error);
    }
  }
}
