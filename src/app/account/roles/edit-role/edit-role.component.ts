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
  RoleListViewModel,
  RoleService,
} from 'src/app/service-proxies/service-proxies';

@Component({
  selector: 'ocs-edit-role',
  templateUrl: './edit-role.component.html',
})
export class EditRoleComponent extends AppBaseComponent implements OnInit {
  @ViewChild('editRoleModal') modal: TemplateRef<any>;
  modalRef: BsModalRef;
  @Output() roleEdited: EventEmitter<boolean> = new EventEmitter<boolean>();
  saving: boolean = false;
  editRoleForm: FormGroup;
  constructor(
    injector: Injector,
    private modalService: BsModalService,
    private roleService: RoleService
  ) {
    super(injector);
  }
  public showModal(role: RoleListViewModel) {
    this.createFom(role);
    const config: ModalOptions = { class: 'modal-md' };
    this.modalRef = this.modalService.show(this.modal, config);
  }
  ngOnInit(): void {}
  addRole() {
    if (this.editRoleForm.valid) {
      this.saving = true;
      this.roleService.put(this.editRoleForm.value).subscribe({
        next: (response) => {
          this.saving = false;
          this.roleEdited.emit(true);
          this.modalService.hide();
          this.notificationService.showSuccess('ROLE_EDITED_SUCCESSFULLY');
        },
        error: () => (this.saving = false),
      });
    } else {
      this.validateAllFields(this.editRoleForm);
      this.saving = false;
    }
  }
  private createFom(role: RoleListViewModel) {
    this.editRoleForm = new FormGroup({
      id: new FormControl(role.id, [Validators.required]),
      name: new FormControl(role.name, [Validators.required]),
      description: new FormControl(role.description, [Validators.required]),
    });
  }
  showRequiredField(field: string): boolean | undefined {
    return (
      !this.editRoleForm.get(field)?.valid &&
      (this.editRoleForm.get(field)?.dirty ||
        this.editRoleForm.get(field)?.touched)
    );
  }
}
