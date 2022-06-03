import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService, JwtTokensData, LoginRequest } from "src/app/service-proxies/service-proxies";
import { GlobalModelService } from "./global-model.service";
import { TokenService } from "./token.service";

@Injectable({
    providedIn: 'root'
})
export class LoginService {


    constructor(private accountService: AccountService, private router: Router, private globalModelService : GlobalModelService,
        private tokenService : TokenService,
        ) {

    }
    authenticate(loginRequest: LoginRequest) {
        return this.accountService.login(loginRequest);
    }
    logout()
    {
        let refreshToken=this.tokenService.getRefreshToken();
        this.accountService.signout(refreshToken).subscribe(response=>{
            debugger;
        });
        this.globalModelService=new GlobalModelService();
        this.tokenService.cleareTokens();

        this.router.navigate(['/login']);

    }
}