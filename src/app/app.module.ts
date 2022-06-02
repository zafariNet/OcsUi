import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { JwtModule } from '@auth0/angular-jwt';
import { ServiceProxyModule } from './service-proxies/service-proxy.module';
import { API_BASE_URL } from './service-proxies/service-proxies';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { HttpConfigInterceptor } from './shared/service-proxies/http-interceptor';
import { TokenService } from './login/services/token.service';
import { LocalStorageService } from './shared/local-storage.service';

export function tokenGetter(): string | null {
  var token = localStorage.getItem('token');
  return token;
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LayoutModule,
    DashboardModule,
    LoginModule,
    AppRoutingModule,
    SharedModule,
    ServiceProxyModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter,
    //     allowedDomains: ['localhost:7232'],
    //   },
    // }),
  ],
  providers: [
    TokenService,
    LocalStorageService,
    {
      provide: 'SERVER_BASE_URL',
      useValue: 'https://localhost:7232/api',
    },
    { provide: API_BASE_URL, useValue: 'https://localhost:7232' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
