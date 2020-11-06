import { Component, OnInit } from '@angular/core';
import { SlideService} from '../../utils/services';
import {Slide} from '../../models'

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  model: Array<Slide>;
  constructor(
    private _slideService: SlideService
  ) { }

  async ngOnInit(){
    this.model = <Array<Slide>> await this._slideService.listAsync();
  }
}
