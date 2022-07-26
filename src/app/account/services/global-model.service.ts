import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  LogedInUserViewModel,
  QueueMonitorFileListViewModel,
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
  sidebarInitilized: boolean;
  scanToFile: any[] = [];
  scanWork: any[] = [];
  ocrWork: any[] = [];
  scanQueue: any[] = [];
  addressReqognitionOutQueue: any[] = [];
  addressEngineQueue: any[] = [];
  sendMailQueue: any[] = [];
  ocrQueue: any[] = [];
  addressQueue: any[] = [];
  logs: any[] = [];
  loadEnginStarted: boolean = false;
  ocrAgentStarted: boolean = false;
  ocrEngineStarted: boolean = false;
  addressEngineStarted: boolean = false;
  sendMailEngineStarted: boolean = false;
  addressRecognitionEngineStarted: boolean = false;
}
