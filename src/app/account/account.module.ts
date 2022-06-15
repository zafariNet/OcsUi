import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login.component';
import { AddPermissionComponent } from './roles/add-permission/add-permission.component';
import { TreePermissionComponent } from './roles/add-permission/tree-permission.component';
import { AddRoleComponent } from './roles/add-role/add-role.component';
import { EditRoleComponent } from './roles/edit-role/edit-role.component';

import { RolesComponent } from './roles/roles.component';
import { LoginService } from './services/login.service';
import { AddUserComponent } from './users/add-user/add-user.component';
import { ChangeUserPasswordComponent } from './users/change-user-password/change-user-password.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    LoginComponent,
    UsersComponent,
    ChangeUserPasswordComponent,
    AddUserComponent,
    EditUserComponent,
    RolesComponent,
    AddRoleComponent,
    EditRoleComponent,
    AddPermissionComponent,
    TreePermissionComponent,
    AccountComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule, ReactiveFormsModule],
  exports: [],
  providers: [LoginService],
})
export class AccountModule {}
