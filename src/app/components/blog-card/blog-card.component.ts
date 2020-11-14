import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from '../../utils/services';
import { Blog } from '../../models';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
})
export class BlogCardComponent implements OnInit {
  constructor(private _blogService: BlogService) {}

  blogs: Array<Blog>;
  @Input() limit: number = 6;
  async ngOnInit() {
    try {
      this.blogs = <Array<Blog>>(
        await this._blogService.listAsync({ limit: 6, BlogState: true })
      );
    } catch (error) {
      this._blogService.errorNotification(error);
    }
  }
}
