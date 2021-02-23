import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfigurationService } from '../app-configuration/app.configuration.service';
import { Constants } from '../constants';

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {

    constructor(
        private readonly messageService: MessageService,
        private readonly cookieService: CookieService,
        private readonly router: Router,
        private readonly appConfigService: AppConfigurationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status == 400) {
                        const errorMessage =
                            error.error.errorCode ? this.appConfigService.getErrorMessage(error.error.errorCode)
                                : error.error.errors ? error.error.title : 'Something went wrong';

                        this.messageService.add({ severity: 'error', detail: errorMessage })
                    }
                    else if (error.status == 401) {
                        this.cookieService.delete(Constants.KEY_AUTH_USER, "/");
                        this.router.navigate(['account', 'login']);
                    }
                    else if (error.status == 403) {
                        this.messageService.add({ severity: 'error', detail: 'Not authorized' })
                    }
                    else {
                        this.messageService.add({ severity: 'error', detail: 'Something went wrong' })
                    }
                }
                return throwError(error);
            }));
    }
}