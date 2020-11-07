import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../utils/services';
import { Blog } from '../../models';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {

  constructor(
    private _blogService: BlogService,
  ) { }

  blogs:Blog=new Blog();
    async ngOnInit() {
      try {
        this.blogs = <Blog>await this._blogService.listAsync();
      } catch (error) {
        this._blogService.errorNotification(error);
      }
    }

}
