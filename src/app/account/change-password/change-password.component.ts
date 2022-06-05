import {
  Component,
  Injector,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { animate, style, transition, trigger } from '@angular/animations';
import { AppBaseComponent } from 'src/app/app-base.component';
@Component({
  selector: 'ocs-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent
  extends AppBaseComponent
  implements OnInit
{
  @ViewChild('changePasswordModal') modal: TemplateRef<any>;
  gettingData: boolean = false;
  modalRef: BsModalRef;
  changePasswordForm: FormGroup;
  constructor(injector: Injector, private modalService: BsModalService) {
    super(injector);
  }
  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmNewPassword: new FormControl('', [Validators.required]),
    });
  }
  public showModal(data: any) {
    const config: ModalOptions = { class: 'modal-md' };

    this.modalRef = this.modalService.show(this.modal, config);
  }
  changePassword() {
    this.gettingData = true;
    setTimeout(() => {
      this.gettingData = false;
    }, 1000);
  }

  showRequiredPassword(field) {
    return (
      !this.changePasswordForm.get(field)?.valid &&
      (this.changePasswordForm.get(field)?.dirty ||
        this.changePasswordForm.get(field)?.touched)
    );
  }
}
