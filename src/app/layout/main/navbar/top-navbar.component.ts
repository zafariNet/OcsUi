import { Component, Injector, ViewChild } from '@angular/core';
import {
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from 'src/app/account/change-password/change-password.component';
import { GlobalModelService } from 'src/app/account/services/global-model.service';
import { LoginService } from 'src/app/account/services/login.service';
import { AppBaseComponent } from 'src/app/app-base.component';
import {
  AccountService,
  ChanageDefaultLanguageRequest,
} from 'src/app/service-proxies/service-proxies';

@Component({
  selector: 'ocs-top-navbar',
  templateUrl: './top-navbar.component.html',
})
export class TopNavbarComponent extends AppBaseComponent {
  @ViewChild('changePasswordModal')
  changePasswordModal: ChangePasswordComponent;
  _globalMpodelService: GlobalModelService;
  closeResult = '';
  constructor(
    injector: Injector,
    private accountService: AccountService,
    globalModelService: GlobalModelService,
    private loginService: LoginService
  ) {
    super(injector);
    this._globalMpodelService = globalModelService;
  }
  logout() {
    this.notificationService
      .showNewConfirm('ARE_YOU_SURE_TO_LOGOUT')
      .then((response) => {
        if (response) {
          this.loginService.logout(response.value);
        }
      });
  }
  showChangePasswordModal() {
    this.changePasswordModal.showModal(null);
  }
  changeLanguage(language: string): void {
    let request = new ChanageDefaultLanguageRequest();
    request.defaultLanguage = language;
    this.accountService.changeDefaultLanguage(request).subscribe({
      next: () => {
        this.translate.use(language);
      },
      error: () => {},
    });
  }
  getCurrentLanguageFlag() {
    if (this.translate.currentLang == 'en') {
      return 'us';
    }
    return this.translate.currentLang;
  }
  hasAccessToSidebarMenu(permissionName: string) {
    var index = this._globalMpodelService.logedInUser.permissions?.filter(
      (response) => {
        return response.name?.startsWith(permissionName);
      }
    );
    return index?.length;
  }
  isActiveRoute(route: string) {
    return this.router.url.startsWith(route);
  }
}
