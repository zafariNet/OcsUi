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
import {
  AccountService,
  ChangePasswordRequest,
  ChangeUserPasswordRequest,
  UserService,
} from 'src/app/service-proxies/service-proxies';
@Component({
  selector: 'ocs-change-user-password',
  templateUrl: './change-user-password.component.html',
})
export class ChangeUserPasswordComponent
  extends AppBaseComponent
  implements OnInit
{
  @ViewChild('changeUserPasswordModal') modal: TemplateRef<any>;
  gettingData: boolean = false;
  modalRef: BsModalRef;
  changeUserPasswordForm: FormGroup;
  changePasswordRequest: ChangeUserPasswordRequest;
  displayName: string;
  id: string;
  version: string;
  constructor(
    injector: Injector,
    private modalService: BsModalService,
    private userService: UserService
  ) {
    super(injector);
    this.changePasswordRequest = new ChangePasswordRequest();
  }
  ngOnInit(): void {}

  public showModal(id: string, displayName: string, version: string) {
    this.id = id;
    this.displayName = displayName;
    this.version = version;
    this.createForm();
    this.changeUserPasswordForm.reset();
    this.changeUserPasswordForm.controls['version'].setValue(version);
    this.changeUserPasswordForm.controls['id'].setValue(id); 
    const config: ModalOptions = { class: 'modal-md' };
    this.modalRef = this.modalService.show(this.modal, config);
  }
  public changeUserPassword() {
    debugger;
    if (this.changeUserPasswordForm.valid) {
      this.gettingData = true;
      this.userService
        .changePassword(this.changeUserPasswordForm.value)
        .subscribe({
          next: (response) => {
            this.gettingData = false;
            this.modalService.hide();
            debugger;
            this.notificationService.showSuccess(this.l(response.message));
          },
          error: () => {
            this.gettingData = false;
          },
        });
    } else {
      this.validateAllFields(this.changeUserPasswordForm);
    }
  }

  showRequiredPassword(field) {
    return (
      !this.changeUserPasswordForm.get(field)?.valid &&
      (this.changeUserPasswordForm.get(field)?.dirty ||
        this.changeUserPasswordForm.get(field)?.touched)
    );
  }
  private createForm() {
    this.changeUserPasswordForm = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
      version: new FormControl(null, [Validators.required]),
    });
  }
}
