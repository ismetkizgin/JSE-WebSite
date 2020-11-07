import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { NgSearchFilterModule } from 'ng-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { CKEditorModule } from 'ckeditor4-angular';
import {
  AdminSidebarComponent,
  AdminControlSidebarComponent,
  AdminHeaderComponent,
  AdminFooterComponent,
  AddBlogMenuComponent,
  AdminLayoutComponent,
  PasswordControlWindowComponent,
  ChangePasswordComponent,
  UserDetailComponent,
  AddSliderComponent,
  DialogWindowComponent,
  PaginationComponent,
} from '../../components/';
import {
  DashboardComponent,
  LoginComponent,
  UserAddComponent,
  UserListComponent,
  SlideListComponent,
  BlogMenuListComponent,
  ProjectAddComponent,
  TeamMembersAddComponent,
  TeamMemberListComponent,
  ProjectListComponent,
  BlogAddComponent,
  BlogListComponent,
} from './';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    ChangePasswordComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminControlSidebarComponent,
    AdminSidebarComponent,
    AddSliderComponent,
    LoginComponent,
    UserAddComponent,
    PasswordControlWindowComponent,
    AddBlogMenuComponent,
    UserDetailComponent,
    DialogWindowComponent,
    BlogMenuListComponent,
    UserListComponent,
    PaginationComponent,
    ProjectAddComponent,
    SlideListComponent,
    TeamMembersAddComponent,
    TeamMemberListComponent,
    ProjectListComponent,
    BlogAddComponent,
    BlogListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    NgxPaginationModule,
    NgSearchFilterModule,
    CKEditorModule,
    MatSlideToggleModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
})
export class AdminLayoutModule {}
