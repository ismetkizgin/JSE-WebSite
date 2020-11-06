import { Component, OnInit } from '@angular/core';
import { Blog, BlogMenu, Roles } from '../../../models';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AuthService,
  LanguageService,
  BlogService,
  BlogMenuService,
} from '../../../utils';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.scss'],
})
export class BlogAddComponent implements OnInit {
  _model: Blog = new Blog();
  blogMenus: Array<BlogMenu>;
  lang: string = this._languageService.getLanguage() || 'tr';
  blogNewImage: File = null;
  _action: Function;
  hiddenSlideToggle =
    [Roles.Root, Roles.Administrator].indexOf(
      this._authService.currentUserValue.result.UserTypeName
    ) === -1
      ? true
      : false;

  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _activatedRoute: ActivatedRoute,
    private _blogService: BlogService,
    public router: Router,
    private _languageService: LanguageService,
    private _blogMenu: BlogMenuService,
    private _authService: AuthService
  ) {}

  async ngOnInit() {
    this._model.BlogState = false;
    this.blogMenus = <Array<BlogMenu>>await this._blogMenu.listAsync();
    const BlogID = this._activatedRoute.snapshot.paramMap.get('BlogID');
    if (BlogID != null) {
      try {
        this._model = <any>await this._blogService.findAsync(BlogID);
        this._model.BlogState = this._model.BlogState ? true : false;
      } catch (error) {
        this._blogService.errorNotification(error);
        this.router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    } else {
      this._action = this.insertActionAsync;
    }
  }

  async onSave(blogForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };
    console.log(blogForm.value);
    if (blogForm.valid) {
      this._translateService
        .get('Blog registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(blogForm))) return;
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

  onFileSelect(event) {
    this._model.Image = event.target.files[0];
  }

  async insertActionAsync(blogForm: NgForm) {
    try {
      const formData = new FormData();
      formData.append('Image', this._model.Image);
      formData.set('BlogTitle', blogForm.value.BlogTitle);
      formData.set('BlogDescription', blogForm.value.BlogDescription);
      formData.set('BlogContent', blogForm.value.BlogContent);
      formData.set('BlogMenuID', blogForm.value.BlogMenuID);
      formData.set('BlogState', blogForm.value.BlogState);

      await this._blogService.insertAsync(formData);
      this._model.Image = null;
      blogForm.resetForm();
      return true;
    } catch (error) {
      this._blogService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(blogForm: NgForm) {
    try {
      const formData = new FormData();
      if (this._model.Image) formData.append('Image', this._model.Image);
      formData.set('BlogTitle', blogForm.value.BlogTitle);
      formData.set('BlogDescription', blogForm.value.BlogDescription);
      formData.set('BlogContent', blogForm.value.BlogContent);
      formData.set('BlogMenuID', blogForm.value.BlogMenuID);
      formData.set('BlogState', blogForm.value.BlogState);
      formData.set(
        'BlogID',
        this._activatedRoute.snapshot.paramMap.get('BlogID')
      );

      await this._blogService.updateAsync(formData);

      return true;
    } catch (error) {
      this._blogService.errorNotification(error);
      return false;
    }
  }
}
