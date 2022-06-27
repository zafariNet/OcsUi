import { AccountModule } from './account/account.module';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { JwtModule } from '@auth0/angular-jwt';
import { ServiceProxyModule } from './service-proxies/service-proxy.module';
import { API_BASE_URL } from './service-proxies/service-proxies';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { HttpConfigInterceptor } from './shared/service-proxies/http-interceptor';
import { TokenService } from './account/services/token.service';
import { LocalStorageService } from './shared/local-storage.service';

import { initializeAppFactory } from './services/app-initializer.service';
import { Router } from '@angular/router';
import { ErrorComponent } from './layout/errors/error-component';
import { Error500Component } from './layout/errors/error-500.component';
import { GlobalModelService } from './account/services/global-model.service';
import { ClickPostModule } from './modules/click-post/click-post.module';
import { FileCenterModule } from './modules/file-center/file-center.module';

export function tokenGetter(): string | null {
  var token = localStorage.getItem('token');
  return token;
}
@NgModule({
  declarations: [AppComponent, ErrorComponent, Error500Component],
  imports: [
    BrowserModule,
    HttpClientModule,
    LayoutModule,
    DashboardModule,
    AccountModule,
    AppRoutingModule,
    SharedModule,
    ClickPostModule,
    FileCenterModule,
    ServiceProxyModule,
  ],
  providers: [
    TokenService,
    LocalStorageService,
    GlobalModelService,
    {
      provide: 'SERVER_BASE_URL',
      useValue: 'http://localhost:5232/api',
    },
    { provide: API_BASE_URL, useValue: 'http://localhost:5232' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [Injector, TokenService, Router, GlobalModelService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
