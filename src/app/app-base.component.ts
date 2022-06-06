import { Component, OnDestroy, Injector, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { GlobalModelService } from './account/services/global-model.service';
import { NgxSpinnerService } from 'ngx-spinner';
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
  globalModelService: GlobalModelService;
  constructor(injector: Injector) {
    this.translate = injector.get(TranslateService);
    this.globalModelService = injector.get(GlobalModelService);
    this.spinner = injector.get(NgxSpinnerService);
  }

  ngOnDestroy(): void {}

  l(key: string): string {
    let translated;
    let resolvedKey = key != '' ? key : 'NOTHING';
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
}
