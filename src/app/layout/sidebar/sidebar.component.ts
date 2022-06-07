import { AppBaseComponent } from 'src/app/app-base.component';
import { Component, Injector, OnInit } from '@angular/core';
import { GlobalModelService } from 'src/app/account/services/global-model.service';
import { LoginService } from 'src/app/account/services/login.service';
@Component({
  selector: 'ocs-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent extends AppBaseComponent implements OnInit {
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

  ngOnInit(): void {}
  isActiveRoute(route: string) {
    return this.router.url.startsWith(route);
  }
}
