
import { NgModule } from "@angular/core";
import * as ApiServiceProxies from './service-proxies';
@NgModule({
    providers: [

        ApiServiceProxies.AccountService,
    ],
    imports :[]
})
export class ServiceProxyModule{

}