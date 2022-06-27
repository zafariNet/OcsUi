import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { ajax, AjaxError, AjaxResponse } from 'rxjs/ajax';
import { GlobalModelService } from '../account/services/global-model.service';
import { TokenService } from '../account/services/token.service';
import {
  API_BASE_URL,
  JwtTokensData,
  RefreshTokenRequest,
  Result,
  ResultOfBoolean,
  ResultOfJwtTokensData,
} from '../service-proxies/service-proxies';
declare var $: any;

export function initializeAppFactory(
  injector: Injector,
  tokenService: TokenService,
  router: Router,
  globalModelService: GlobalModelService
) {
  var baseUrl = injector.get(API_BASE_URL);
  var _tokenService = tokenService;
  var _router = router;
  var _tokenService = tokenService;

  return () => {
    let token = _tokenService.getToken();

    if (token || token === 'undefined') {
      return ajax({
        createXHR,
        url: baseUrl + '/api/account/IsTokenValid/' + token,
        crossDomain: true,
        withCredentials: false,
        method: 'GET',
      }).subscribe({
        next: (response) => {
          if (!response.response) {
            _tokenService.cleareTokens();
            _router.navigate(['/login']);
          } else {
            let refreshTokenRequest = new RefreshTokenRequest();
            refreshTokenRequest.refreshToken = _tokenService.getRefreshToken();
            ajax<ResultOfJwtTokensData>({
              createXHR,
              url: baseUrl + '/api/account/RefreshToken',
              crossDomain: true,
              withCredentials: false,
              method: 'Post',
              body: refreshTokenRequest,
            }).subscribe({
              next: (response: AjaxResponse<ResultOfJwtTokensData>) => {
                var result = <JwtTokensData>response.response.value;
                _tokenService.setLogedInUserData(result);
                globalModelService.logedInUser = result.user!;
                globalModelService.initialDataFeteched.next(true);
                globalModelService.applicationCanStart.next(true);
                if (_router.url == '/login') {
                  _router.navigate(['/main']);
                }
              },
              error: (error: AjaxResponse<ResultOfJwtTokensData>) => {
                if (error.status == 400) {
                  router.navigate(['/login']);
                }
              },
            });
          }
        },
        error: (error) => {},
      });
    } else {
      _tokenService.cleareTokens();
      _router.navigate(['/login']);
    }
    return of(false);
  };
  ajax({
    createXHR,
    url: baseUrl + '/api/account/refreshToken',
    crossDomain: true,
    withCredentials: false,
    method: 'POST',
    body: { refreshToken: _tokenService.getRefreshToken() },
  }).subscribe({
    next: (value) => {
      if (_router.url == '/login') {
        _tokenService.cleareTokens();
      }
      globalModelService.initialDataFeteched.next(true);
      let tokenResult: ResultOfJwtTokensData = <ResultOfJwtTokensData>(
        value.response
      );
      _tokenService.setLogedInUserData(tokenResult.value!);
      globalModelService.logedInUser = tokenResult.value?.user!;
    },
    error: (error: AjaxError) => {
      if (error.status == 400) {
        _router.navigate(['/login']);
      }
      if (error.status == 0) {
        _router.navigate(['/error']);
      }
    },
  });
}
function createXHR() {
  return new XMLHttpRequest();
}
