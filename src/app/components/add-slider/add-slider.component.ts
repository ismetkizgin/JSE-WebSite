import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { SlideService } from '../../utils/services';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Slide } from '../../models';

@Component({
  selector: 'app-add-slider',
  templateUrl: './add-slider.component.html',
  styleUrls: ['./add-slider.component.scss'],
})
export class AddSliderComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _translateService: TranslateService,
    private dialogRef: MatDialogRef<AddSliderComponent>,
    private _slideService: SlideService
  ) {}

  slideImage: any;
  slideNewImage: File;
  _model: Slide = new Slide();
  _action: Function;
  _addSliderRenew: boolean = false;

  ngOnInit(): void {
    console.log(this.data);
    if (this.data?.SlideImagePath != null) {
      this.slideImage = this.data.SlideImagePath;
      try {
        this._model = this.data;
      } catch (error) {
        this._slideService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    } else {
      this._action = this.insertActionAsync;
    }
  }

  async onSave(addSlideForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (addSlideForm.valid) {
      this._translateService
        .get('Slide registration completed')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(addSlideForm))) return;
      this.dialogRef.close(this._addSliderRenew);
    } else {
      this._translateService
        .get('Please fill in the required fields')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__error';
    }

    this._snackBar.open(notification.message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: notification.panelClass,
    });
  }

  async insertActionAsync(addSlideForm: NgForm) {
    try {
      const formData = new FormData();
      formData.append('Image', this.slideNewImage);
      if (addSlideForm.value.SlideLink)
        formData.set('SlideLink', addSlideForm.value.SlideLink);

      await this._slideService.insertAsync(formData);
      addSlideForm.resetForm();
      this._addSliderRenew = true;
      return true;
    } catch (error) {
      this._slideService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(addSlideForm: NgForm) {
    try {
      const formData = new FormData();
      if (this.slideNewImage) formData.append('Image', this.slideNewImage);
      formData.set('SlideID', this.data.SlideID);
      if (addSlideForm.value.SlideLink)
        formData.set('SlideLink', addSlideForm.value.SlideLink);

      this.data.SlideImagePath = this.slideImage;
      await this._slideService.updateAsync(formData);
      return true;
    } catch (error) {
      this._slideService.errorNotification(error);
      return false;
    }
  }

  onFileSelect(event) {
    this.slideNewImage = event.target.files[0];
    this.preview();
  }

  preview() {
    var mimeType = this.slideNewImage.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.slideNewImage);
    reader.onload = (_event) => {
      this.slideImage = reader.result;
    };
  }
}
