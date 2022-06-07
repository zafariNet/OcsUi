import { NgModule } from '@angular/core';
import * as ApiServiceProxies from './service-proxies';
@NgModule({
  providers: [ApiServiceProxies.AccountService, ApiServiceProxies.UserService],
  imports: [],
})
export class ServiceProxyModule {}
