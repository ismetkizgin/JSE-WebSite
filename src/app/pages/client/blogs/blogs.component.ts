import { Component, OnInit } from '@angular/core';
import { Blog } from '../../../models';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  constructor() { }

  searchText: String;
  paginationConfig = {
    id: 'blog',
    itemsPerPage: 10,
    currentPage: 1,
  };
  _model: Array<Blog> = [
    { BlogTitle: "Deneme Başlığı", BlogCreatedDate: "10.02.2020", BlogUserName: "Furkan Söğüt", BlogImagePath: "../../../../assets/images/deneme.jpg", BlogDescription: "Today we released a prototype of a C# feature called nullable reference types which is intended to help you find and fix most of your null-related bugs before they blow up at runtime. We would love for you to install the prototype and try it out on your code! (Or maybe a copy of it! ) Your feedback is going to help us get the feature" },
    { BlogTitle: "Deneme Başlığı", BlogCreatedDate: "10.05.2012", BlogUserName: "İsmet Kizgin", BlogImagePath: "../../../../assets/images/deneme.jpg", BlogDescription: "Today we released a prototype of a C# feature called nullable reference types which is intended to help you find and fix most of your null-related bugs before they blow up at runtime. We would love for you to install the prototype and try it out on your code! (Or maybe a copy of it! ) Your feedback is going to help us get the feature" },
    { BlogTitle: "Deneme Başlığı", BlogCreatedDate: "10.02.2020", BlogUserName: "Kadir Can Karademir", BlogImagePath: "../../../../assets/images/deneme.jpg", BlogDescription: "Today we released a prototype of a C# feature called nullable reference types which is intended to help you find and fix most of your null-related bugs before they blow up at runtime. We would love for you to install the prototype and try it out on your code! (Or maybe a copy of it! ) Your feedback is going to help us get the feature" },
    { BlogTitle: "Deneme Başlığı", BlogCreatedDate: "10.02.2020", BlogUserName: "Ayberk Acar", BlogImagePath: "../../../../assets/images/deneme.jpg", BlogDescription: "Today we released a prototype of a C# feature called nullable reference types which is intended to help you find and fix most of your null-related bugs before they blow up at runtime. We would love for you to install the prototype and try it out on your code! (Or maybe a copy of it! ) Your feedback is going to help us get the feature" },

  ];

  ngOnInit(): void {
  }

}
