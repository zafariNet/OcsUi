import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalModelService } from 'src/app/account/services/global-model.service';
import { AccountService } from 'src/app/service-proxies/service-proxies';
declare var $: any;
@Component({
  selector: 'ocs-main-layout',
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements AfterViewInit, OnInit {
  initialDataFetched: boolean = false;
  _globalModelService: GlobalModelService;
  constructor(
    private spinner: NgxSpinnerService,
    private globalModelService: GlobalModelService,
    private accountService: AccountService,
    private translateService: TranslateService
  ) {
    this._globalModelService = globalModelService;
  }
  ngOnInit(): void {
    /** spinner starts on init */
    this.spinner.show();
    debugger;
    this.accountService.getUserData().subscribe({
      next: (value) => {
        this._globalModelService.userSetting = value.value!;
        this.setLangulagedefaults(value.value?.defaultLanguage);

        setTimeout(() => {
          this.initialDataFetched = true;
          this.spinner.hide();
        }, 1000);
      },
      error: (error) => {},
    });
  }
  ngAfterViewInit(): void {}

  setLangulagedefaults(currentLanguage = 'en') {
    this.translateService.addLangs(['en', 'de']);
    this.translateService.use(currentLanguage);
  }
}
