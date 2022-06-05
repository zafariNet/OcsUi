import { Component, Injector, OnInit } from '@angular/core';
import { defaultTo } from 'lodash';
import { AppBaseComponent } from 'src/app/app-base.component';
import { AccountService } from 'src/app/service-proxies/service-proxies';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent extends AppBaseComponent implements OnInit {
  constructor(injector: Injector, private accountService: AccountService) {
    super(injector);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.accountService.index().subscribe((response) => {});
    }, 2000);
  }
}
