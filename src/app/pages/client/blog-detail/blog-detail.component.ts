import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  constructor() { }

  blogs: Blog =
    {BlogTitle:"Deneme Başlığı", BlogUserName: "Furkan Söğüt", BlogCreatedDate: "12.10.2020", BlogImagePath: "assets/images/software.jpg",
     BlogContent: "deneme deneme denemedeneme deneme deneme deneme deneme deneme deneme deneme denemedeneme deneme deneme deneme deneme deneme deneme deneme denemedeneme deneme deneme deneme deneme deneme deneme deneme denemedeneme deneme deneme deneme deneme deneme deneme deneme denemedeneme deneme deneme deneme deneme deneme deneme deneme denemedeneme deneme deneme deneme deneme deneme deneme deneme denemedeneme deneme deneme deneme deneme deneme deneme deneme denemedeneme deneme deneme deneme deneme deneme deneme deneme denemedeneme deneme deneme deneme deneme deneme deneme deneme denemedeneme deneme deneme deneme deneme deneme deneme deneme denemedeneme deneme deneme deneme deneme deneme deneme deneme denemedeneme deneme deneme deneme deneme deneme deneme deneme denemedeneme deneme deneme deneme deneme deneme deneme deneme denemedeneme deneme deneme deneme deneme deneme deneme deneme denemedeneme deneme deneme deneme deneme deneme deneme deneme denemedeneme deneme deneme deneme deneme deneme deneme deneme denemedeneme deneme deneme deneme deneme deneme deneme deneme denemedeneme deneme deneme deneme deneme deneme deneme deneme denemedeneme deneme deneme deneme deneme deneme deneme deneme denemedeneme deneme deneme deneme deneme deneme deneme deneme denemedeneme deneme deneme deneme deneme deneme" };

  async ngOnInit() {
   
  }

}
