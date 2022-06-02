import { Injectable } from '@angular/core';
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
  constructor() {

  }

  showError(title?: string,body:string='') {
    Swal.fire({
        icon: 'error',
        title: title,
        text: body,
      })
  }
  showSuccess(message : string)
  {
      toastr.options = {
          "debug": false,
          "positionClass": "toast-bottom-right",
          "onclick": null,
          "fadeIn": 300,
          "fadeOut": 1000,
          "timeOut": 1000,
          "extendedTimeOut": 1000
        }
      toastr.success(message)
  }
}
