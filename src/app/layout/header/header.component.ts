import { Component } from "@angular/core";
import { LoginService } from "src/app/login/services/login.service";

@Component({
    selector: 'ocs-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    constructor(private loginService : LoginService) {
        
    }
    logout()
    {
        this.loginService.logout();
    }
}