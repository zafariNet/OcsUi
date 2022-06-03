import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpResponse,
    HttpHeaders,
} from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage.service';
import { NotifyServiceService } from 'src/app/services/notify-service.service';
import { TokenService } from 'src/app/login/services/token.service';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root',
})
export class HttpConfigInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    defaultError = {
        message: 'An error has occurred!',
        details: 'Error details were not sent by server.'
    };
    defaultError401 = {
        message: 'You are not authenticated!',
        details: 'You should be authenticated (sign in) in order to perform this operation.'
    };
    defaultError403 = {
        message: 'You are not authorized!',
        details: 'You are not allowed to perform this operation.'
    };
    defaultError404 = {
        message: 'Resource not found!',
        details: 'The resource requested could not be found on the server.'
    };
    constructor(private notyfiService: NotifyServiceService, private tokenService: TokenService, private router: Router) {

    }
    intercept(req, next) {
        var _this = this;

        var modifiedRequest = this.normalizeRequestHeaders(req);
        return next.handle(modifiedRequest)
            .pipe(catchError(function (error) {

                if (error instanceof HttpErrorResponse && error.status === 401) {
                    return _this.tryAuthWithRefreshToken(modifiedRequest, next, error);
                }
                else {
                    return _this.handleErrorResponse(error);
                }
            }), switchMap(function (event) {
                return _this.handleSuccessResponse(event);
            }));

    }
    tryGetRefreshTokenService() {
        return this.tokenService.refreshToken();
    }

    private tryAuthWithRefreshToken(request: HttpRequest<any>, next: HttpHandler, error: any) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.tryGetRefreshTokenService().pipe(
                switchMap((authResult: any) => {
                    this.isRefreshing = false;
                    if (authResult) {
                        this.tokenService.setLogedInUserData(authResult.value)
                        this.refreshTokenSubject.next(authResult.value);
                        let modifiedRequest = this.normalizeRequestHeaders(request);
                        return next.handle(modifiedRequest);
                    } else {
                        return this.handleErrorResponse(error);
                    }
                }));
        } else {
            return this.refreshTokenSubject.pipe(
                filter(authResult => authResult != null),
                take(1),
                switchMap(authResult => {
                    let modifiedRequest = this.normalizeRequestHeaders(request);
                    return next.handle(modifiedRequest);
                }));
        }
    }
    logError(error) {
        console.log(error);
    };

    showError(title,body='') {
            return this.notyfiService.showError(title??this.defaultError.message, body);

    }

    handleTargetUrl(targetUrl) {
        if (!targetUrl) {
            location.href = '/';
        }
        else {
            location.href = targetUrl;
        }
    }

    handleOcsResponse(response, ajaxResponse) {
        var newResponse;
        if (!ajaxResponse.failed) {
            newResponse = response.clone({
                body: ajaxResponse.result
            });
            if (ajaxResponse.targetUrl) {
                this.handleTargetUrl(ajaxResponse.targetUrl);
                ;
            }
        }
        else {
            newResponse = response.clone({
                body: ajaxResponse.result
            });
            if (!ajaxResponse.message) {
                ajaxResponse.message = this.defaultError;
            }
            this.logError(ajaxResponse.message);
            this.showError(ajaxResponse.message);
            if (response.status === 401) {
                this.router.navigate(['/login']);
            }
        }
        return newResponse;
    }

    getOcsAjaxResponseOrNull = function (response) {
        if (!response || !response.headers) {
            return null;
        }
        var contentType = response.headers.get('Content-Type');
        if (!contentType) {
            this._logService.warn('Content-Type is not sent!');
            return null;
        }
        if (contentType.indexOf("application/json") < 0) {
            this._logService.warn('Content-Type is not application/json: ' + contentType);
            return null;
        }
        var responseObj = JSON.parse(JSON.stringify(response.body));
        return responseObj;
    }

    handleResponse(response) {

        var ajaxResponse = this.getOcsAjaxResponseOrNull(response);
        if (ajaxResponse == null) {
            return response;
        }
        return this.handleOcsResponse(response, ajaxResponse);
    };

    blobToText(blob) {
        return new Observable(function (observer) {
            if (!blob) {
                observer.next("");
                observer.complete();
            }
            else {
                var reader = new FileReader();
                reader.onload = function () {
                    observer.next(this.result);
                    observer.complete();
                };
                reader.readAsText(blob);
            }
        });
    }

    normalizeRequestHeaders(request) {
        // add heir additional headers
        // Example
        var modifiedHeaders = new HttpHeaders();
        modifiedHeaders = request.headers.set("Pragma", "no-cache")
            .set("Cache-Control", "no-cache")
            .set("Expires", "Sat, 01 Jan 2000 00:00:00 GMT")
            
        modifiedHeaders = this.addXRequestedWithHeader(modifiedHeaders);
        modifiedHeaders = this.addAuthorizationHeaders(modifiedHeaders);
        return request.clone({
            headers: modifiedHeaders
        });
    }

    handleSuccessResponse = function (event) {
        let self = this;
        if (event instanceof HttpResponse) {
            if (event.body instanceof Blob && event.body.type && event.body.type.indexOf("application/json") >= 0) {
                return self.blobToText(event.body).pipe(map((json: string) => {
                    var responseBody = json == "null" ? {} : JSON.parse(json);
                    var modifiedResponse = self.handleResponse(event.clone({
                        body: responseBody
                    }));

                    return modifiedResponse.clone({
                        body: new Blob([JSON.stringify(modifiedResponse.body)], { type: 'application/json' })
                    });
                }));
            }
        }
        return of(event);
    }

    handleErrorResponse(error) {
        var _this = this;
        if (!(error.error instanceof Blob)) {
            _this.notyfiService.showError(this.defaultError.message);
        }
        return this.blobToText(error.error).pipe(switchMap((json: any) => {
            var errorBody = (json == "" || json == "null") ? {} : JSON.parse(json);
            var errorResponse = new HttpResponse({
                headers: error.headers,
                status: error.status,
                body: errorBody
            });
            var ajaxResponse = _this.getOcsAjaxResponseOrNull(errorResponse);
            if (ajaxResponse != null) {
                _this.handleOcsResponse(errorResponse, ajaxResponse);
            }
            else {
                _this.notyfiService.showError(errorBody.message);
            }
            return throwError(error);
        }));
    };

    protected addAuthorizationHeaders(headers: HttpHeaders): HttpHeaders {
        let authorizationHeaders = headers ? headers.getAll('Authorization') : null;
        if (!authorizationHeaders) {
            authorizationHeaders = [];
        }

        if (!this.itemExists(authorizationHeaders, (item: string) => item.indexOf('Bearer ') == 0)) {
            let token = this.tokenService.getToken();
            if (headers && token) {
                headers = headers.set('Authorization', 'Bearer ' + token);
            }
        }
        if(authorizationHeaders[0])
        {
            headers = headers.set('Authorization', 'Bearer ' + this.tokenService.getToken());
        }
        return headers;
    }

    protected addXRequestedWithHeader(headers: HttpHeaders): HttpHeaders {
        if (headers) {
            headers = headers.set('X-Requested-With', 'XMLHttpRequest');
        }

        return headers;
    }

    private itemExists<T>(items: T[], predicate: (item: T) => boolean): boolean {
        for (let i = 0; i < items.length; i++) {
            if (predicate(items[i])) {
                return true;
            }
        }

        return false;
    }
}