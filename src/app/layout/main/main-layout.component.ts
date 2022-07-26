import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalModelService } from 'src/app/account/services/global-model.service';
import { TokenService } from 'src/app/account/services/token.service';
import { AppBaseComponent } from 'src/app/app-base.component';
import { AccountService } from 'src/app/service-proxies/service-proxies';
import {
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { SignalRService } from 'src/app/shared/service-proxies/signalr.service';
declare var $: any;
declare var Layout: any;
@Component({
  selector: 'ocs-main-layout',
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent
  extends AppBaseComponent
  implements AfterViewInit, OnInit
{
  initialDataFetched: boolean = false;
  _globalModelService: GlobalModelService;

  constructor(
    globalModelService: GlobalModelService,
    private accountService: AccountService,
    private translateService: TranslateService,
    private signalRService: SignalRService,
    injector: Injector
  ) {
    super(injector);
    this._globalModelService = globalModelService;
    if (this._globalModelService.applicationStarted) {
      this.getInitialData();
    } else {
      this._globalModelService.applicationCanStart.subscribe((response) => {
        if (response) this.getInitialData();
      });
    }
  }
  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.serviceLogDetected();
    this.signalRService.LoadEnginServiceStoped();
    this.signalRService.LoadEnginServiceStarted();
    this.signalRService.addressRecognitionStarted();
    this.signalRService.addressRecognitionSttoped();
    this.signalRService.scanQueueListener();
    this.signalRService.ocrQueueListener();
    this.signalRService.ocrAgentStoped();
    this.signalRService.ocrAgentStarted();
    this.signalRService.addressQueueListener();
    this.signalRService.ocrEngineStarted();
    this.signalRService.ocrEngineStoped();
    this.signalRService.addressRecognitionOutQueueChangeListener();
    this.signalRService.addressEngineStarted();
    this.signalRService.addressEngineStoped();
    this.signalRService.addressEngineQueueChangeListener();
    this.signalRService.sendMailEngineStarted();
    this.signalRService.sendMailEngineStoped();

    this._globalModelService.initialDataFeteched.subscribe({
      next: (data) => (this.initialDataFetched = data),
    });
  }
  getInitialData() {
    if (this.router.url !== '/login') {
      this.spinner.show();
      this.accountService.getUserData().subscribe({
        next: (value) => {
          this._globalModelService.initialDataFeteched.next(true);
          this._globalModelService.userSetting = value.value!;
          this.setLangulagedefaults(value.value?.defaultLanguage);
          this.spinner.hide();
          if (!this.globalModelService.sidebarInitilized) {
            Layout.initialTreeview(this.router.url);
            this.globalModelService.sidebarInitilized = true;
          }
        },
        error: (error) => {},
      });
    }
  }
  ngAfterViewInit(): void {}

  setLangulagedefaults(currentLanguage = 'en') {
    this.translateService.addLangs(['en', 'de']);
    this.translateService.use(currentLanguage);
  }
}
