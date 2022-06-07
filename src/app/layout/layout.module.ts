import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './../account/change-password/change-password.component';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HeaderComponent } from './header/header.component';
import { MainLayoutComponent } from './main/main-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
    ChangePasswordComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    BrowserAnimationsModule,
  
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutModule {}
