import { Component, OnDestroy, Injector, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { GlobalModelService } from './account/services/global-model.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup } from '@angular/forms';
import { NotifyService } from './services/notify-service.service';
import { TokenService } from './account/services/token.service';
import { Router } from '@angular/router';
import { API_BASE_URL } from './service-proxies/service-proxies';
@Component({
  template: '',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
      transition(':leave', [animate(500, style({ opacity: 0 }))]),
    ]),
  ],
})
export class AppBaseComponent implements OnDestroy {
  translate: TranslateService;
  spinner: NgxSpinnerService;
  notificationService: NotifyService;
  globalModelService: GlobalModelService;
  tokenService: TokenService;
  router: Router;
  baseUrl: string = '';
  constructor(injector: Injector) {
    this.translate = injector.get(TranslateService);
    this.globalModelService = injector.get(GlobalModelService);
    this.spinner = injector.get(NgxSpinnerService);
    this.notificationService = injector.get(NotifyService);
    this.tokenService = injector.get(TokenService);
    this.router = injector.get(Router);
    let currentToken = this.tokenService.getToken();
    this.baseUrl = injector.get(API_BASE_URL);
    if (!currentToken) {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy(): void {}

  l(key: string | undefined | null): string {
    let translated;
    let resolvedKey = key != '' ? key! : 'NOTHING';
    this.translate.get(resolvedKey).subscribe({
      next: (value) => (translated = value),
      error: (error) => {},
    });
    return translated;
  }
  currentLanguage(): string {
    return this.translate.currentLang;
  }
  showSpinner(): void {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }
  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);

      control?.updateValueAndValidity();
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }
  hasAccess(permissionName: string) {
    var index = this.globalModelService.logedInUser.permissions?.find(
      (permission) => {
        return permission.name?.startsWith(permissionName);
      }
    );
    return index?.id;
  }
}
