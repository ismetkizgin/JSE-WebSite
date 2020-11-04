import { Component, OnInit } from '@angular/core';
import { Slide } from '../../../models';
@Component({
  selector: 'app-slide-list',
  templateUrl: './slide-list.component.html',
  styleUrls: ['./slide-list.component.scss']
})
export class SlideListComponent implements OnInit {

  constructor() { }
  slides: Array<Slide>;
  searchText:string;
  ngOnInit(): void {
    this.slides = [
      {
        SlideID : 1,
        SlideImagePath : 'https://www.dunyaatlasi.com/wp-content/uploads/2018/09/resim-tablo-nasil-okunur.jpg',
        SlideLink : 'https://ismetkizgin.com'
      },
      {
        SlideID : 2,
        SlideImagePath : 'https://www.dunyaatlasi.com/wp-content/uploads/2018/09/resim-tablo-nasil-okunur.jpg',
        SlideLink : 'https://ismetkizgin.com'
      },
      {
        SlideID : 3,
        SlideImagePath : 'https://www.dunyaatlasi.com/wp-content/uploads/2018/09/resim-tablo-nasil-okunur.jpg',
        SlideLink : 'https://ismetkizgin.com'
      },
      {
        SlideID : 4,
        SlideImagePath : 'https://www.dunyaatlasi.com/wp-content/uploads/2018/09/resim-tablo-nasil-okunur.jpg',
        SlideLink : 'https://ismetkizgin.com'
      }
    ]
  }

}
