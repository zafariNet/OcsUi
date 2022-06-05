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
    private loginService: LoginService,
    private accountService: AccountService
  ) {
    super(injector);
  }
  logout() {
    this.loginService.logout();
  }
  showChangePasswordModal() {
    this.changePasswordModal.showModal(null);
  }
  changeLanguage(language: string): void {
    this.showSpinner();
    let request = new ChanageDefaultLanguageRequest();
    request.defaultLanguage = language;
    this.accountService.changeDefaultLanguage(request).subscribe({
      next: () => {
        this.translate.use(language);
        this.hideSpinner();
      },
      error: () => {},
    });
  }
}
