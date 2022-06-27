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
import { RoleService } from 'src/app/service-proxies/service-proxies';

@Component({
  selector: 'ocs-add-role',
  templateUrl: './add-role.component.html',
})
export class AddRoleComponent extends AppBaseComponent implements OnInit {
  @ViewChild('addRoleModal') modal: TemplateRef<any>;
  modalRef: BsModalRef;
  @Output() roleAdded: EventEmitter<boolean> = new EventEmitter<boolean>();
  saving: boolean = false;
  addRoleForm: FormGroup;
  constructor(
    injector: Injector,
    private modalService: BsModalService,
    private roleService: RoleService
  ) {
    super(injector);
  }
  public showModal() {
    this.addRoleForm.reset();
    const config: ModalOptions = { class: 'modal-md' };
    this.modalRef = this.modalService.show(this.modal, config);
  }
  ngOnInit(): void {
    this.createFom();
  }
  addRole() {
    if (this.addRoleForm.valid) {
      this.saving = true;
      this.roleService.post(this.addRoleForm.value).subscribe({
        next: (response) => {
          this.saving = false;
          this.roleAdded.emit(true);
          this.modalService.hide();
        },
        error: () => {
          this.saving = false;
        },
      });
    } else {
      this.validateAllFields(this.addRoleForm);
      this.saving = false;
    }
  }
  private createFom() {
    this.addRoleForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }
  showRequiredField(field: string): boolean | undefined {
    return (
      !this.addRoleForm.get(field)?.valid &&
      (this.addRoleForm.get(field)?.dirty ||
        this.addRoleForm.get(field)?.touched)
    );
  }
}
