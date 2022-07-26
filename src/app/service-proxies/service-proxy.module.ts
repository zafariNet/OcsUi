import { NgModule } from '@angular/core';
import * as ApiServiceProxies from './service-proxies';
@NgModule({
  providers: [
    ApiServiceProxies.AccountService,
    ApiServiceProxies.UserService,
    ApiServiceProxies.RoleService,
    ApiServiceProxies.FileService,
    ApiServiceProxies.QueueMonitorService,
  ],
  imports: [],
})
export class ServiceProxyModule {}
