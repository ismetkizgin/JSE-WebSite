import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { AuthService, SlideService } from '../../utils/services';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Slider } from '../../models';

@Component({
  selector: 'app-add-slider',
  templateUrl: './add-slider.component.html',
  styleUrls: ['./add-slider.component.scss']
})
export class AddSliderComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private _router:Router,
    private _translateService: TranslateService,
    private _authService: AuthService,
    private dialogRef: MatDialogRef<AddSliderComponent>,
    private _slideService:SlideService
  ) { }

  sliderImage: any = this.data.sliderImagePath;
  sliderNewImage: File = null;
  _model:Slider=new Slider();
  _action:Function;
  _addSliderRenew:boolean=false;

  ngOnInit(): void {
    if (this.data?.SliderImagePath != null) {
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

  async onSave(addSliderForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (addSliderForm.valid) {
      this._translateService
        .get('Slide registration completed')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(addSliderForm))) return;
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

  async insertActionAsync(addSliderForm: NgForm) {
    try {
      await this._slideService.insertAsync(addSliderForm.value);
      addSliderForm.resetForm();
      this._addSliderRenew = true;
      return true;
    } catch (error) {
      this._slideService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(addSliderForm: NgForm) {
    try {
      await this._slideService.updateAsync(
        Object.assign(addSliderForm.value, {
          BlogMenuID: this.data.BlogMenuID,
        })
      );
      return true;
    } catch (error) {
      this._slideService.errorNotification(error);
      return false;
    }
  }

  onFileSelect(event) {
    this.sliderNewImage = event.target.files[0];
    this.preview();
  }

  preview() {
    var mimeType = this.sliderNewImage.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.sliderNewImage);
    reader.onload = (_event) => {
      this.sliderImage = reader.result;
    };
  }

}
