import { Component, OnInit } from '@angular/core';
import { Setting } from 'src/app/models';
import { SettingService } from 'src/app/utils';

@Component({
  selector: 'app-client-footer',
  templateUrl: './client-footer.component.html',
  styleUrls: ['./client-footer.component.scss'],
})
export class ClientFooterComponent implements OnInit {
  constructor(private _settingService: SettingService) {}
  setting: Setting = new Setting();
  async ngOnInit() {
    this.setting = <Setting>await this._settingService.getAsync();
    console.log(this.setting)
  }
}
