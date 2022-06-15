import {
  Component,
  Injector,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AppBaseComponent } from 'src/app/app-base.component';

import {
  AddPermissionsToRoleRequest,
  PermissionCompleteViewModel,
  RoleService,
} from 'src/app/service-proxies/service-proxies';

@Component({
  selector: 'ocs-add-permission',
  templateUrl: './add-permission.component.html',
})
export class AddPermissionComponent extends AppBaseComponent implements OnInit {
  @ViewChild('addPermissionModal') modal: TemplateRef<any>;
  modalRef: BsModalRef;
  addPermissionForm: FormGroup;
  saving: boolean = false;
  roleName: string;
  permissionList: PermissionCompleteViewModel[];
  addPermissionsToRoleRequest: AddPermissionsToRoleRequest;

  constructor(
    injector: Injector,
    private modalService: BsModalService,
    private roleService: RoleService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.createForm();
  }

  public showModal(roleId: string, name: string): void {
    this.roleName = name;
    this.addPermissionsToRoleRequest = new AddPermissionsToRoleRequest();
    this.addPermissionsToRoleRequest.roleId = roleId;
    this.addPermissionForm.reset();
    const config: ModalOptions = { class: 'modal-md' };
    this.modalRef = this.modalService.show(this.modal, config);
    this.roleService.getPermissions(roleId).subscribe({
      next: (response) => {
        this.permissionList = response.itemList!;
        this.retriveGrantedPermissions(response.itemList!);
      },
    });
  }
  addPermission() {
    this.saving = true;
    this.roleService
      .setRolePermission(this.addPermissionsToRoleRequest)
      .subscribe({
        next: () => {
          this.saving = false;
          this.modalService.hide();
          this.notificationService.showSuccess(
            'PERMISSIONS_CHANGED_SUCCESSFULLY'
          );
        },
        error: () => (this.saving = false),
      });
  }

  permissionChanged(data) {
    if (!data.checked) {
      let index: number =
        this.addPermissionsToRoleRequest.permissionIds?.indexOf(
          data.permissionId
        )!;
      if (index! > -1) {
        this.addPermissionsToRoleRequest.permissionIds!.splice(index!, 1);
      }
    } else {
      this.addPermissionsToRoleRequest.permissionIds?.push(data.permissionId);
    }
  }

  private retriveGrantedPermissions(
    rolePermissions: PermissionCompleteViewModel[]
  ) {
    this.addPermissionsToRoleRequest.permissionIds = [];

    rolePermissions.forEach((root) => {
      root.children?.forEach((leaf) => {
        if (leaf.isGranted)
          this.addPermissionsToRoleRequest.permissionIds?.push(leaf.id!);
      });
    });
  }

  private createForm(): void {
    this.addPermissionForm = new FormGroup({});
  }
}
