import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalModelService } from 'src/app/account/services/global-model.service';
import { TokenService } from 'src/app/account/services/token.service';
import { AppBaseComponent } from 'src/app/app-base.component';
import { AccountService } from 'src/app/service-proxies/service-proxies';
declare var $: any;
@Component({
  selector: 'ocs-main-layout',
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent extends AppBaseComponent implements AfterViewInit, OnInit {
  initialDataFetched: boolean = false;
  _globalModelService: GlobalModelService;
  constructor(
    globalModelService: GlobalModelService,
    private accountService: AccountService,
    private translateService: TranslateService,
    injector : Injector
  ) {
    super(injector)
    this._globalModelService = globalModelService;
    if (this._globalModelService.applicationStarted) {
      this.getInitialData();
    } else {
      this._globalModelService.applicationCanStart.subscribe((response) => {
        if(response)
        this.getInitialData();
      });
    }
  }
  ngOnInit(): void {
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
            setTimeout(() => {
              this.spinner.hide();
            }, 1000);
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
