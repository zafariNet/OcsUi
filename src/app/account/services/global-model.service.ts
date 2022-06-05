import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  LogedInUserViewModel,
  UserSettingViewModel,
} from 'src/app/service-proxies/service-proxies';

@Injectable({
  providedIn: 'any',
})
export class GlobalModelService {
  constructor() {
    this.initialDataFeteched.subscribe((dataFetched) => {
      this.dataFetched = dataFetched;
    });
  }
  initialDataFeteched: Subject<boolean> = new Subject<boolean>();
  dataFetched: boolean = false;
  logedInUser: LogedInUserViewModel = new LogedInUserViewModel();
  userSetting: UserSettingViewModel = new UserSettingViewModel();
}
