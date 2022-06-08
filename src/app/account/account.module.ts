import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { LoginService } from './services/login.service';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [LoginComponent, UsersComponent],
  imports: [CommonModule, RouterModule, SharedModule, ReactiveFormsModule],
  exports: [],
  providers: [LoginService],
})
export class AccountModule {}
