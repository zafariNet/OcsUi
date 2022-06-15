import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AppBaseComponent } from 'src/app/app-base.component';
import {
  BaseViewModel,
  CreateUserRequest,
  CreateUserSettingRequest,
  UserListViewModel,
  UserService,
  UserSettingViewModel,
} from 'src/app/service-proxies/service-proxies';

@Component({
  selector: 'ocs-add-user',
  templateUrl: './add-user.component.html',
})
export class AddUserComponent extends AppBaseComponent implements OnInit {
  modalRef: BsModalRef;
  @ViewChild('addUserModal') modal: TemplateRef<any>;
  saving: boolean = false;
  createUserRequest: CreateUserRequest;
  createUserForm: FormGroup;
  userIndex: number | null;
  @Output() userAdded: EventEmitter<UserListViewModel> =
    new EventEmitter<UserListViewModel>();

  constructor(
    injector: Injector,
    private modalService: BsModalService,
    private userService: UserService
  ) {
    super(injector);
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  addUser() {
    if (this.createUserForm.valid) {
      this.saving = true;
      this.userService.create(this.createUserForm.value).subscribe({
        next: (response) => {
          this.saving = false;
          this.userAdded.emit(
            this.createUserListViewModel(
              this.createUserForm.value,
              response.value!
            )
          );
          this.modalService.hide();
        },
        error: () => (this.saving = false),
      });
    } else {
      this.validateAllFields(this.createUserForm);
    }
  }
  showModal() {
    this.createUserRequest = new CreateUserRequest();
    this.createUserRequest.userSetting = new CreateUserSettingRequest();
    this.createForm();
    const config: ModalOptions = { class: 'modal-lg' };
    this.modalRef = this.modalService.show(this.modal, config);
  }

  createForm() {
    this.createUserForm = new FormGroup({
      userName: new FormControl(this.createUserRequest.userName, [
        Validators.required,
      ]),
      displayName: new FormControl(this.createUserRequest.displayName, [
        Validators.required,
      ]),
      password: new FormControl(this.createUserRequest.password, [
        Validators.required,
      ]),
      confirmPassword: new FormControl(this.createUserRequest.confirmPassword, [
        Validators.required,
      ]),
      isActive: new FormControl(this.createUserRequest.isActive ?? true, [
        Validators.required,
      ]),
      userSetting: new FormGroup({
        defaultLanguage: new FormControl(
          this.createUserRequest.userSetting?.defaultLanguage,
          [Validators.required]
        ),
      }),
    });
  }

  showRequiredField(field) {
    return (
      !this.createUserForm.get(field)?.valid &&
      (this.createUserForm.get(field)?.dirty ||
        this.createUserForm.get(field)?.touched)
    );
  }
  private createUserListViewModel(
    createUserRequest: CreateUserRequest,
    baseviewModelData: BaseViewModel
  ): UserListViewModel {
    var user = new UserListViewModel();
    var userSetting = new UserSettingViewModel();
    userSetting.defaultLanguage =
      createUserRequest.userSetting?.defaultLanguage;
    user.displayName = createUserRequest.displayName;
    user.userName = createUserRequest.userName;
    user.id = baseviewModelData.id;
    user.version = baseviewModelData.version;
    user.isActive = createUserRequest.isActive;
    user.lastLoggedIn = undefined;
    user.parentUser = undefined;
    user.userSetting = userSetting;

    return user;
  }
}
