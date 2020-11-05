import { Component, OnInit, Inject } from '@angular/core';
import { Blog, BlogMenu } from '../../../models';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, LanguageService,BlogService ,BlogMenuService} from '../../../utils';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.scss']
})
export class BlogAddComponent implements OnInit {

  _model: Blog = new Blog();
  _menuType: Array<BlogMenu>;
  lang: string = this._languageService.getLanguage() || 'tr';
  blogNewImage: File = null;
  _action: Function;

  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _activatedRoute: ActivatedRoute,
    private _blogService: BlogService,
    public _router: Router,
    private _languageService: LanguageService,
    private _blogMenu: BlogMenuService

  ) { }

  async ngOnInit() {
      this._menuType = <Array<BlogMenu>> await this._blogMenu.listAsync();
      const BlogID = this._activatedRoute.snapshot.paramMap.get('BlogID');
    if (BlogID != null) {
      try {
        this._model = <any>await this._blogService.findAsync(BlogID);
      } catch (error) {
        this._blogService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    }else {
      this._action = this.insertActionAsync;
    }
  }

  async onSave(blogForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

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
    this.blogNewImage= event.target.files[0];
  }

  async insertActionAsync(blogForm: NgForm) {
    try {
      const formData = new FormData();
      formData.append('BlogImage', this.blogNewImage);
      formData.set('BlogTitle',blogForm.value.BlogTitle);
      formData.set('BlogDescription',blogForm.value.BlogDescription);
      formData.set('BlogContent',blogForm.value.BlogContent);
      formData.set('BlogState',blogForm.value.BlogState);
      formData.set('BlogMenuID',blogForm.value.BlogMenuID);

      await this._blogService.insertAsync(formData);

      this.blogNewImage = null;
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
      formData.append('BlogImage', this.blogNewImage);
      formData.set('BlogTitle',blogForm.value.BlogTitle);
      formData.set('BlogDescription',blogForm.value.BlogDescription);
      formData.set('BlogContent',blogForm.value.BlogContent);
      formData.set('BlogState',blogForm.value.BlogState);
      formData.set('BlogMenuID',blogForm.value.BlogMenuID);

      await this._blogService.updateAsync(

        Object.assign(formData, {
          BlogId: parseInt(
            this._activatedRoute.snapshot.paramMap.get('BlogId')
          ),
        })
      );

      this._model.Image = null;
      blogForm.resetForm();
      return true;
    } catch (error) {
      this._blogService.errorNotification(error);
      return false;
    }
  }

}