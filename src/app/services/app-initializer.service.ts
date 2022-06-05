import { HttpClient } from "@angular/common/http";
import { Injector } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { ajax, AjaxError, AjaxResponse } from "rxjs/ajax";
import { GlobalModelService } from "../account/services/global-model.service";
import { TokenService } from "../account/services/token.service";
import { API_BASE_URL, ResultOfJwtTokensData } from "../service-proxies/service-proxies";
declare var $: any;

export function initializeAppFactory(injector: Injector, tokenService: TokenService, router: Router, globalModelService: GlobalModelService) {
    var baseUrl = injector.get(API_BASE_URL);
    var _tokenService = tokenService;
    var _router = router;

    return () =>
        ajax({
            createXHR, // <--- here
            url: baseUrl + '/api/account/refreshToken',
            crossDomain: true,
            withCredentials: false,
            method: 'POST',
            body: { refreshToken: _tokenService.getRefreshToken() },
        }).subscribe({
            next: (value) => {
                globalModelService.initialDataFeteched.next(true)
                let tokenResult : ResultOfJwtTokensData = <ResultOfJwtTokensData>value.response;
                _tokenService.setLogedInUserData(tokenResult.value!);
                globalModelService.logedInUser = tokenResult.value?.user!
                if (_router.url == '/login') {
                    _tokenService.cleareTokens();
                }
            },
            error: (error: AjaxError) => {
                if (error.status == 400) {
                    _router.navigate(['/login']);
                }
                if (error.status == 0) {
                    _router.navigate(['/error']);
                }
            }
        });
}
function createXHR() {
    return new XMLHttpRequest();
}