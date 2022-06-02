import { Inject, Injectable } from "@angular/core";
import { of } from "rxjs";
import { AccountService, API_BASE_URL, JwtTokensData, RefreshTokenRequest } from "src/app/service-proxies/service-proxies";
import { LocalStorageService } from "src/app/shared/local-storage.service";
declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    app_base_url: string;
    constructor(private accountService: AccountService, private localStorageService: LocalStorageService, @Inject(API_BASE_URL) app_base_url) {
        this.app_base_url = app_base_url;
    }

    setLogedInUserData(tokenData: JwtTokensData): void {
        this.localStorageService.saveToken(tokenData.accessToken!)
        this.localStorageService.saveRefreshToken(tokenData.refreshToken!);
    }
    getToken(): string {
        return localStorage.getItem('token')!
    }
    getRefreshToken(): string {
        return this.localStorageService.getRefreshToken()!
    }
    refreshToken() {
        var refreshTkenRequest = new RefreshTokenRequest();
        refreshTkenRequest.refreshToken = this.localStorageService.getRefreshToken()!;
        return this.accountService.refreshToken(refreshTkenRequest)
    }
    cleareTokens()
    {
        this.localStorageService.removeToken();
        this.localStorageService.removeRefreshToken();
    }
}