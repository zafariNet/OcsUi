import { NgModule } from '@angular/core';
import * as ApiServiceProxies from './service-proxies';
@NgModule({
  providers: [
    ApiServiceProxies.AccountService,
    ApiServiceProxies.UserService,
    ApiServiceProxies.RoleService,
  ],
  imports: [],
})
export class ServiceProxyModule {}
