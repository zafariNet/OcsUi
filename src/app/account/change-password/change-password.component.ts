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
import { AccountService, ChangePasswordRequest } from 'src/app/service-proxies/service-proxies';
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
  changePasswordRequest:ChangePasswordRequest;
  constructor(
    injector: Injector,
    private modalService: BsModalService,
    private accountService: AccountService
  ) {
    super(injector);
    this.changePasswordRequest=new ChangePasswordRequest();
  }
  ngOnInit(): void {

  }
  public showModal(data: any) {
    this.createForm()
     this.changePasswordForm.reset();
    this.changePasswordRequest=new ChangePasswordRequest();
    const config: ModalOptions = { class: 'modal-md' };
    this.modalRef = this.modalService.show(this.modal, config);
  }
  changePassword() {
    if (this.changePasswordForm.valid) {
      this.gettingData = true;
      this.accountService
        .changePassword(this.changePasswordForm.value)
        .subscribe({
          error: () => {
            this.gettingData = false;
          },
          complete: () => {
            this.gettingData = false;
          },
        });
    } else {
      this.validateAllFields(this.changePasswordForm);
    }
  }

  showRequiredPassword(field) {
    return (
      !this.changePasswordForm.get(field)?.valid &&
      (this.changePasswordForm.get(field)?.dirty ||
        this.changePasswordForm.get(field)?.touched)
    );
  }
  createForm(){
    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl(this.changePasswordRequest.currentPassword, [Validators.required]),
      newPassword: new FormControl(this.changePasswordRequest.newPassword, [Validators.required]),
      confirmPassword: new FormControl(this.changePasswordRequest.confirmPassword, [Validators.required]),
    });
  }
}
