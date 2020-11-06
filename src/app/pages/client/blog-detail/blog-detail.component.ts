import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/models';
import { BlogService } from 'src/app/utils';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit {
  constructor(
    private _blogService: BlogService,
    private _activatedRoute: ActivatedRoute
  ) {}

  blog: Blog;
  async ngOnInit() {
    try {
      const BlogID = this._activatedRoute.snapshot.paramMap.get('BlogID');
      console.log(BlogID)
      this.blog = <Blog>await this._blogService.findAsync(BlogID);
    } catch (error) {
      this._blogService.errorNotification(error);
    }
  }
}
