import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './../account/change-password/change-password.component';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainLayoutComponent } from './main/main-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { TopNavbarComponent } from './main/navbar/top-navbar.component';
import { NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';
import { SignalRService } from '../shared/service-proxies/signalr.service';

@NgModule({
  declarations: [
    MainLayoutComponent,
    ChangePasswordComponent,
    TopNavbarComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    BrowserAnimationsModule,
    NgbOffcanvasModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [SignalRService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutModule {}
