import { Component, Injector } from '@angular/core';
import { AppBaseComponent } from '../app-base.component';

@Component({
  selector: 'ocs-account',
  templateUrl: './account.component.html',
})
export class AccountComponent extends AppBaseComponent {
  constructor(injector: Injector) {
    super(injector);
  }
}
