import { animate } from '@angular/animations';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
declare var $: any;
declare var Noty: any;
declare var Swal: any;
declare var toastr: any;
declare var toastr: any;
declare var Toast: any;

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(private translate: TranslateService) {}

  showError(title?: string, body: string = '') {
    Swal.fire({
      icon: 'error',
      title: this.l(title),
      text: this.l(body),
    });
  }

  async showMessageWithCheckBox(
    title?: string,
    body: string = '',
    chechBoxMessage: string = '',
    YesButtonText: string = '',
    cancleButtonText: string = ''
  ) {
    return Swal.fire({
      icon: 'error',
      title: this.l(title),
      text: this.l(body),
      showCancelButton: true,
      input: 'checkbox',
      inputValue: 1,
      inputPlaceholder: chechBoxMessage,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-success button-in-notification',
        cancelButton: 'btn btn-info button-in-notification',
      },
      confirmButtonText:
        '<i  class="fa fa-check"></i><span class="button-text">' +
        YesButtonText +
        '</span>',
      cancelButtonText:
        '<i  class="fa fa-share"></i><span class="button-text">' +
        cancleButtonText +
        '</span>',
    });
  }
  showSuccess(message: string) {
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: 'toast-bottom-center',
      preventDuplicates: false,
      onclick: null,
      showDuration: '300',
      hideDuration: '1000',
      timeOut: '5000',
      extendedTimeOut: '1000',
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut',
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
  async showNewConfirm(title: string, cancleText = 'Mohammad') {
    var deferred = new $.Deferred();
    $.confirm({
      title: this.l(title),
      content: '',
      theme: 'bootstrap',
      type: 'orange',
      // icon: 'fas fa-exclamation-triangle',
      buttons: {
        yes: {
          text: this.l('YES'),
          action: function () {
            deferred.resolve(true);
          },
        },
        no: {
          text: this.l('NO'),
          action: function () {
            deferred.resolve(false);
          },
        },
      },
    });
    return deferred;
  }
}
