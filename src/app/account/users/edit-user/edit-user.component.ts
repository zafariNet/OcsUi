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
  selector: 'ocs-edit-user',
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent extends AppBaseComponent implements OnInit {
  modalRef: BsModalRef;
  @ViewChild('editUserModal') modal: TemplateRef<any>;
  saving: boolean = false;
  editUserRequest: CreateUserRequest;
  editUserForm: FormGroup;
  userIndex: number | null;
  @Output() userEdited: EventEmitter<UserListViewModel> =
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
    if (this.editUserForm.valid) {
      this.saving = true;
      this.userService.create(this.editUserForm.value).subscribe({
        next: (response) => {
          this.saving = false;
          this.userEdited.emit(
            this.createUserListViewModel(
              this.editUserForm.value,
              response.value!
            )
          );
          this.modalService.hide();
        },
        error: () => (this.saving = false),
      });
    } else {
      this.validateAllFields(this.editUserForm);
    }
  }
  showModal(user: UserListViewModel | null) {
    this.editUserRequest = new CreateUserRequest();
    this.editUserRequest.userSetting = new CreateUserSettingRequest();
    this.createForm(user);
    const config: ModalOptions = { class: 'modal-lg' };
    this.modalRef = this.modalService.show(this.modal, config);
  }

  createForm(user: UserListViewModel | null) {
    this.editUserForm = new FormGroup({
      displayName: new FormControl(user?.displayName, [Validators.required]),
      isActive: new FormControl(user?.isActive ?? true, [Validators.required]),
      userSetting: new FormGroup({
        defaultLanguage: new FormControl(user?.userSetting?.defaultLanguage, [
          Validators.required,
        ]),
      }),
    });
  }

  showRequiredField(field) {
    return (
      !this.editUserForm.get(field)?.valid &&
      (this.editUserForm.get(field)?.dirty ||
        this.editUserForm.get(field)?.touched)
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
