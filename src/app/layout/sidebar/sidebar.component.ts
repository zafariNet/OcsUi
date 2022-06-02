import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GlobalModelService } from "src/app/login/services/global-model.service";
import { LoginService } from "src/app/login/services/login.service";
@Component({
    selector: 'ocs-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    currentUrl: string = '';
    _globalMpodelService: GlobalModelService
    constructor(private router: Router, globalModelService: GlobalModelService,private loginService : LoginService) {
        this._globalMpodelService = globalModelService;
        
    }
    ngOnInit(): void {
    }
    isActiveRoute(route: string) {
        return this.router.url.startsWith(route)
    }

}