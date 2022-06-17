import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination/public-api';
import { map, switchMap } from 'rxjs';
import { AppBaseComponent } from 'src/app/app-base.component';
import {
  DeleteRequest,
  PagedResultOfRoleListViewModel,
  PagedResultOfUserListViewModel,
  RoleListViewModel,
  RoleService,
} from 'src/app/service-proxies/service-proxies';
import { AddPermissionComponent } from './add-permission/add-permission.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';

@Component({
  selector: '[ocs-rules]',
  templateUrl: './roles.component.html',
})
export class RolesComponent extends AppBaseComponent implements OnInit {
  gettingRuleList: boolean = false;
  roleList: RoleListViewModel[];
  @ViewChild('addRoleModal')
  addRoleModal: AddRoleComponent;
  @ViewChild('editRoleModal')
  editRoleModal: EditRoleComponent;
  @ViewChild('addPermissionModal')
  addPermissionModal: AddPermissionComponent;
  constructor(injector: Injector, private roleService: RoleService) {
    super(injector);
  }
  ngOnInit(): void {
    this.GetAllRoles();
  }
  GetAllRoles() {
    this.gettingRuleList = true;
    this.roleService
      .getList('', this.config.currentPage, this.config.itemsPerPage, '')
      .subscribe({
        next: (response: PagedResultOfRoleListViewModel) => {
          this.roleList = <RoleListViewModel[]>response['value'].itemList!;
          this.config.totalItems = (<PagedResultOfRoleListViewModel>(
            response['value']
          )).totalCount;
          this.gettingRuleList = false;
        },
        error: () => (this.gettingRuleList = false),
      });
  }
  deleteRole(id: string) {
    var request = new DeleteRequest({ id: id });
    this.notificationService
      .showNewConfirm('ARE_YOU_SURE_TO_DELETE_ROLE')
      .then((response) => {
        if (response) {
          this.roleService.delete(request).subscribe({
            next: (deleteResponse) => {
              this.notificationService.showSuccess(deleteResponse.message!);
              this.GetAllRoles();
            },
          });
        }
      });
  }
  pageChanged(data) {
    this.config.currentPage = data;
    this.GetAllRoles();
  }

  config: PaginationInstance = {
    id: 'rolePagination',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0,
  };
  showAddRoleModal() {
    this.addRoleModal.showModal();
  }

  showEditRoleModal(role: RoleListViewModel) {
    this.editRoleModal.showModal(role);
  }
  showAddPermissionModal(roleId: string, name: string): void {
    console.log(this.addPermissionModal);
    this.addPermissionModal.showModal(roleId, name);
  }
}
