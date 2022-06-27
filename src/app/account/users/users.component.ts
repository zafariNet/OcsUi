import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { data } from 'jquery';
import { PaginationInstance } from 'ngx-pagination';
import { AppBaseComponent } from 'src/app/app-base.component';
import {
  DeleteRequest,
  PagedResultOfUserListViewModel,
  UserListViewModel,
  UserService,
} from 'src/app/service-proxies/service-proxies';
import { AddUserComponent } from './add-user/add-user.component';

import { ChangeUserPasswordComponent } from './change-user-password/change-user-password.component';
import { EditUserComponent } from './edit-user/edit-user.component';
declare var $: any;
@Component({
  selector: '[ocs-users]',
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class UsersComponent extends AppBaseComponent implements OnInit {
  userList: UserListViewModel[];
  @ViewChild('changeUserPasswordModal')
  changeUserPasswordModal: ChangeUserPasswordComponent;
  @ViewChild('addUserModal') addUserModal: AddUserComponent;
  @ViewChild('editUserModal') editUserModal: EditUserComponent;
  gettingUserList: boolean = false;
  constructor(injector: Injector, private userService: UserService) {
    super(injector);
  }
  ngOnInit(): void {
    this.getAllUser();
    $('.select2').select2();
  }
  openChangePasswordModal(
    userId: string,
    displayName: string,
    version: string
  ) {
    this.changeUserPasswordModal.showModal(userId, displayName, version);
  }
  openEditUserModal(user: UserListViewModel | null, index: number | null) {
    this.editUserModal.showModal(user);
  }
  openAddUserModal() {
    this.addUserModal.showModal();
  }
  userAddedEventHandler(addedUser: UserListViewModel) {
    this.getAllUser();
  }
  deleteUser(id: string, index: number) {
    var request = new DeleteRequest({ id: id });
    this.notificationService
      .showNewConfirm('ARE_YOU_SURE_TO_DELETE_USER')
      .then((response) => {
        if (response) {
          this.userService.delete(request).subscribe({
            next: (deleteResponye) => {
              this.notificationService.showSuccess('USER_DELETED_SUCCESSFULLY');
              this.getAllUser();
            },
          });
        }
      });
  }
  getAllUser() {
    this.gettingUserList = true;
    this.userService
      .get('', this.config.currentPage, this.config.itemsPerPage, '')
      .subscribe({
        next: (response: PagedResultOfUserListViewModel) => {
          this.userList = <UserListViewModel[]>response['value'].itemList!;
          this.config.totalItems = (<PagedResultOfUserListViewModel>(
            response['value']
          )).totalCount;

          this.gettingUserList = false;
        },
        error: () => (this.gettingUserList = false),
      });
  }
  pageChanged(data) {
    this.config.currentPage = data;
    this.getAllUser();
  }

  public config: PaginationInstance = {
    id: 'userPagination',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0,
  };
  getCurrentLanguageFlag(language: string) {
    if (language == 'en') {
      return 'us';
    }
    return language;
  }
}
