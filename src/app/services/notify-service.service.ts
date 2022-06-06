import { animate } from '@angular/animations';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;
declare var Noty: any;
declare var Swal: any;
declare var toastr: any;
declare var toastr: any;
declare var Toast: any;

@Injectable({
  providedIn: 'root',
})
export class NotifyServiceService {
  constructor(private translate: TranslateService) {}

  showError(title?: string, body: string = '') {
    Swal.fire({
      icon: 'error',
      title: this.l(title),
      text: this.l(body),
    });
  }
  showSuccess(message: string) {
    toastr.options = {
      debug: false,
      positionClass: 'toast-bottom-right',
      onclick: null,
      fadeIn: 300,
      fadeOut: 1000,
      timeOut: 1000,
      extendedTimeOut: 1000,
    };
    toastr.success(this.l(message));
  }

  private l(key): string {
    let translated;
    let resolvedKey = key != '' ? key : 'NOTHING';
    this.translate.get(resolvedKey).subscribe({
      next: (value) => (translated = value),
      error: (error) => {},
    });
    return translated;
  }
}
