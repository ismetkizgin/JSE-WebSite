import { Component, OnInit } from '@angular/core';
import { Slide } from '../../../models';
import { SlideService } from '../../../utils';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogWindowComponent, AddSliderComponent } from '../../../components';

@Component({
  selector: 'app-slide-list',
  templateUrl: './slide-list.component.html',
  styleUrls: ['./slide-list.component.scss'],
})
export class SlideListComponent implements OnInit {
  constructor(
    private _slideService: SlideService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _translateService: TranslateService
  ) {}

  slides: Array<Slide>;
  paginationConfig = {
    id: 'slideList',
    itemsPerPage: 10,
    currentPage: 1,
  };

  async ngOnInit() {
    try {
      this.slides = <Array<Slide>>await this._slideService.listAsync();
    } catch (error) {
      this._slideService.errorNotification(error);
    }
  }

  async slideDelete(SlideID) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the slide ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._slideService.deleteAsync({ SlideID });
          this.slides.splice(
            this.slides.findIndex((slide) => slide.SlideID == SlideID),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Slide information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._slideService.errorNotification(error);
        }
      }
    });
  }

  openSlideModal(slide = null) {
    const diologRef = this._dialog.open(AddSliderComponent, {
      width: '500px',
      data: slide,
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }
}
