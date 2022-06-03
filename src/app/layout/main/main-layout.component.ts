import { AfterViewInit, Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { GlobalModelService } from "src/app/login/services/global-model.service";
declare var $: any;
@Component({
    selector: 'ocs-main-layout',
    templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements AfterViewInit,OnInit {
    initialDataFetched: boolean =false;
    _globalModelService:GlobalModelService;
    constructor(private spinner: NgxSpinnerService,private globalModelService: GlobalModelService) {
        this._globalModelService=globalModelService;
    }
    ngOnInit(): void {

    }
    ngAfterViewInit(): void {     
        /** spinner starts on init */
        this.spinner.show();

        setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
        }, 1000);
    }

}