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

  ngOnInit(): void {}

  public showModal(roleId: string, name: string): void {
    this.roleName = name;
    this.addPermissionsToRoleRequest = new AddPermissionsToRoleRequest();
    this.addPermissionsToRoleRequest.permissionIds = [];
    this.addPermissionsToRoleRequest.roleId = roleId;
    const config: ModalOptions = { class: 'modal-lg' };
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
    rolePermissions.forEach((element) => {
      if (element.children?.length! > 0) {
        this.retriveGrantedPermissions(element.children!);
      } else {
        if (element.isGranted)
          this.addPermissionsToRoleRequest.permissionIds?.push(element.id!);
      }
    });
  }
}
