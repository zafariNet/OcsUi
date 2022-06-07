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
export class NotifyService {
  constructor(private translate: TranslateService) {}

  showError(title?: string, body: string = '') {
    Swal.fire({
      icon: 'error',
      title: this.l(title),
      text: this.l(body),
    });
  }

  async showMessageWithCheckBox(title?: string, body: string = '',chechBoxMessage : string ='',YesButtonText : string = '',cancleButtonText : string = '')
  {
    return  Swal.fire({
      icon: 'error',
      title: this.l(title),
      text: this.l(body),
      showCancelButton: true,
      input: 'checkbox',
      inputValue: 1,
      inputPlaceholder:
      chechBoxMessage,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-success button-in-notification',
        cancelButton:'btn btn-info button-in-notification'
        
      },
      confirmButtonText:
      '<i  class="fa fa-check"></i><span class="button-text">' + YesButtonText  + '</span>',
      cancelButtonText :  
      '<i  class="fa fa-share"></i><span class="button-text">' + cancleButtonText  + '</span>'
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
