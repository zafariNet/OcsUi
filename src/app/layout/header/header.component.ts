import {
  AccountService,
  ChanageDefaultLanguageRequest,
} from 'src/app/service-proxies/service-proxies';
import { AppBaseComponent } from 'src/app/app-base.component';
import { ChangePasswordComponent } from './../../account/change-password/change-password.component';
import { Component, Injector, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/account/services/login.service';

@Component({
  selector: 'ocs-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent extends AppBaseComponent {
  @ViewChild('changePasswordModal')
  changePasswordModal: ChangePasswordComponent;
  constructor(
    injector: Injector,
    private accountService: AccountService,
    private loginService: LoginService
  ) {
    super(injector);
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
}
