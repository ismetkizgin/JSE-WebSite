import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgSearchFilterModule } from 'ng-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import {
  ClientLayoutComponent,
  ClientNavbarComponent,
  ClientBannerComponent,
  SliderComponent,
  ClientFooterComponent,
  BlogCardComponent
} from '../../components/';
import {
  HomepageComponent,
  ProjectsComponent,
  BlogDetailComponent,
  BlogsComponent,
  TeamMembersComponent,
  ContactComponent,
} from './';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    ClientLayoutComponent,
    HomepageComponent,
    ClientNavbarComponent,
    ClientBannerComponent,
    ProjectsComponent,
    ContactComponent,
    BlogDetailComponent,
    SliderComponent,
    TeamMembersComponent,
    ProjectsComponent,
    BlogsComponent,
    ClientFooterComponent,
    BlogCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    RecaptchaModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    RecaptchaFormsModule,
    NgSearchFilterModule,
    NgxPaginationModule,
    HttpClientModule,
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
export class ClientLayoutModule {}
