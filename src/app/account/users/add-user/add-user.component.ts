import {
  AfterViewInit,
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AppBaseComponent } from 'src/app/app-base.component';
import {
  BaseViewModel,
  CreateUserRequest,
  CreateUserSettingRequest,
  DropDownViewModel,
  RoleListViewModel,
  RoleService,
  RoleSimpleViewModel,
  UserListViewModel,
  UserService,
  UserSettingViewModel,
  UserSimpleViewModel,
} from 'src/app/service-proxies/service-proxies';

@Component({
  selector: 'ocs-add-user',
  templateUrl: './add-user.component.html',
})
export class AddUserComponent
  extends AppBaseComponent
  implements OnInit, AfterViewInit
{
  modalRef: BsModalRef;
  @ViewChild('addUserModal') modal: TemplateRef<any>;
  saving: boolean = false;
  createUserRequest: CreateUserRequest;
  createUserForm: FormGroup;
  userIndex: number | null;
  roleList: RoleSimpleViewModel[] | undefined;
  userList: DropDownViewModel[] | undefined;
  roleIdsControllArray: FormArray;
  @Output() userAdded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    injector: Injector,
    private modalService: BsModalService,
    private userService: UserService,
    private roleService: RoleService,
    private formBuilder: FormBuilder
  ) {
    super(injector);
  }
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    this.roleService.getDropdownList().subscribe({
      next: (response) => {
        this.roleList = response.itemList;
      },
    });

    this.userService.getDropdownList().subscribe({
      next: (response) => {
        this.userList = response.itemList;
      },
    });
  }
  onSelect(data) {}
  addUser() {
    debugger;
    if (this.createUserForm.valid) {
      this.saving = true;
      this.userService.create(this.createUserForm.value).subscribe({
        next: (response) => {
          this.saving = false;
          this.userAdded.emit(true);
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
    this.createUserForm = this.formBuilder.group({
      userName: new FormControl(null, [Validators.required]),
      displayName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
      isActive: new FormControl(true, [Validators.required]),
      parentUserId: new FormControl(true, [Validators.required]),
      userSetting: new FormGroup({
        defaultLanguage: new FormControl(null, [Validators.required]),
      }),
      roleIds: this.formBuilder.array([]),
    });
  }

  showRequiredField(field) {
    return (
      !this.createUserForm.get(field)?.valid &&
      (this.createUserForm.get(field)?.dirty ||
        this.createUserForm.get(field)?.touched)
    );
  }

  rolesChange(event) {
    this.roleIdsControllArray = this.createUserForm.get('roleIds') as FormArray;
    if (event.target.checked) {
      this.roleIdsControllArray.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;

      this.roleIdsControllArray.controls.forEach((ctrl) => {
        if (ctrl.value == event.target.value) {
          this.roleIdsControllArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }
}
