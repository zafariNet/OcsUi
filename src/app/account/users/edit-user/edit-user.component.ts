import {
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
  DropDownViewModel,
  RoleService,
  RoleSimpleViewModel,
  UserListViewModel,
  UserService,
} from 'src/app/service-proxies/service-proxies';

@Component({
  selector: 'ocs-edit-user',
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent extends AppBaseComponent implements OnInit {
  modalRef: BsModalRef;
  @ViewChild('editUserModal') modal: TemplateRef<any>;
  saving: boolean = false;

  editUserForm: FormGroup;
  userIndex: number | null;
  roleList: RoleSimpleViewModel[] | undefined;
  userList: DropDownViewModel[] | undefined;
  roleIdsControllArray: FormArray;
  editUser: UserListViewModel;
  @Output() userEdited: EventEmitter<boolean> = new EventEmitter<boolean>();

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

  saveData() {
    debugger;
    if (this.editUserForm.valid) {
      this.saving = true;
      this.userService.put(this.editUserForm.value).subscribe({
        next: (response) => {
          debugger;
          this.saving = false;
          this.userEdited.emit(true);
          this.modalService.hide();
        },
        error: () => (this.saving = false),
      });
    } else {
      this.validateAllFields(this.editUserForm);
    }
  }
  showModal(user: UserListViewModel | null) {
    this.editUser = user!;
    this.createForm();
    const config: ModalOptions = { class: 'modal-lg' };
    this.modalRef = this.modalService.show(this.modal, config);
  }

  createForm() {
    this.editUserForm = this.formBuilder.group({
      id: new FormControl(this.editUser.id, [Validators.required]),
      displayName: new FormControl(this.editUser.displayName, [
        Validators.required,
      ]),
      isActive: new FormControl(this.editUser.isActive, [Validators.required]),
      parentUserId: new FormControl(this.editUser.parentUser?.id!),
      version: new FormControl(this.editUser.version, [Validators.required]),
      userSetting: new FormGroup({
        defaultLanguage: new FormControl(
          this.editUser.userSetting?.defaultLanguage,
          [Validators.required]
        ),
      }),
      roleIds: this.formBuilder.array([]),
    });
    this.roleIdsControllArray = this.editUserForm.get('roleIds') as FormArray;
    this.editUser.roles?.forEach((role) => {
      this.roleIdsControllArray.push(new FormControl(role.role!.id));
    });
  }

  showRequiredField(field) {
    return (
      !this.editUserForm.get(field)?.valid &&
      (this.editUserForm.get(field)?.dirty ||
        this.editUserForm.get(field)?.touched)
    );
  }

  rolesChange(event) {
    if (event.target.checked) {
      this.roleIdsControllArray.push(new FormControl(event.target.id));
    } else {
      let i: number = 0;

      this.roleIdsControllArray.controls.forEach((ctrl) => {
        if (ctrl.value == event.target.id) {
          this.roleIdsControllArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }
  hasPermission(roleId) {
    return this.editUser.roles?.filter((item) => item.role?.id == roleId)
      .length;
  }
}
