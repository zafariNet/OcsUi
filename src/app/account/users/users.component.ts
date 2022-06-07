import { Component, Injector, OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/app-base.component';
import {
  PagedResultOfUserCompleteViewModel,
  UserCompleteViewModel,
  UserService,
} from 'src/app/service-proxies/service-proxies';

@Component({
  selector: 'ocs-users',
  templateUrl: './users.component.html',
})
export class UsersComponent extends AppBaseComponent implements OnInit {
  userList: UserCompleteViewModel[] | undefined;
  constructor(injector: Injector, private userService: UserService) {
    super(injector);
  }
  ngOnInit(): void {
    this.userService.getAllUsers('', 1, 10, '').subscribe({
      next: (response: PagedResultOfUserCompleteViewModel) => {
        debugger;
        this.userList = (<PagedResultOfUserCompleteViewModel>(
          response['value']
        )).itemList;
      },
    });
  }
}
