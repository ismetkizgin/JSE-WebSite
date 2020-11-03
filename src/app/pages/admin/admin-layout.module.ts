import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  AdminSidebarComponent,
  AdminControlSidebarComponent,
  AdminHeaderComponent,
  AdminFooterComponent,
  AdminLayoutComponent,
} from '../../components/layouts/admin/';
import { DashboardComponent } from './';
import { LoginComponent } from './login/login.component';
import { UserAddComponent } from './user-add/user-add.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminControlSidebarComponent,
    AdminSidebarComponent,
    LoginComponent,
    UserAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
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
export class AdminLayoutModule { }
