import { NgModule } from '@angular/core';
import * as ApiServiceProxies from './service-proxies';
@NgModule({
  providers: [
    ApiServiceProxies.AccountService,
    ApiServiceProxies.UserService,
    ApiServiceProxies.RoleService,
    ApiServiceProxies.FileService,
  ],
  imports: [],
})
export class ServiceProxyModule {}
