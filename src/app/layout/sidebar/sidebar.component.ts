import { AppBaseComponent } from 'src/app/app-base.component';
import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { GlobalModelService } from 'src/app/account/services/global-model.service';
import { LoginService } from 'src/app/account/services/login.service';
declare var $: any;
import * as AdminLte from 'admin-lte';
@Component({
  selector: 'ocs-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent
  extends AppBaseComponent
  implements OnInit, AfterViewInit
{
  currentUrl: string = '';
  _globalMpodelService: GlobalModelService;
  constructor(
    injector: Injector,
    globalModelService: GlobalModelService,
    private loginService: LoginService
  ) {
    super(injector);
    this._globalMpodelService = globalModelService;
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {}
  isActiveRoute(route: string) {
    return this.router.url.startsWith(route);
  }
  hasAccessToSidebarMenu(permissionName: string) {
    var index = this._globalMpodelService.logedInUser.permissions?.filter(
      (response) => {
        return response.name?.startsWith(permissionName);
      }
    );
    return index?.length;
  }
}
