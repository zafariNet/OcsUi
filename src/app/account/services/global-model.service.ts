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
    this.applicationCanStart.subscribe((applicationStarted) => {
      this.applicationStarted = applicationStarted;
    });
  }
  initialDataFeteched: Subject<boolean> = new Subject<boolean>();
  applicationCanStart: Subject<boolean> = new Subject<boolean>();
  dataFetched: boolean = false;
  applicationStarted: boolean = false;
  logedInUser: LogedInUserViewModel = new LogedInUserViewModel();
  userSetting: UserSettingViewModel = new UserSettingViewModel();
}
