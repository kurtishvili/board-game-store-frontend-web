import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthUserModel } from '../authorization/authentification-response.model';
import { AuthorizationService } from '../authorization/authorization-service';
import { Constants } from '../constants';

@Injectable()
export class HttpJwtHandlerInterceptor implements HttpInterceptor {

    constructor(
        private readonly cookieService: CookieService,
        private readonly authorizationService: AuthorizationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authUserCookie = this.cookieService.get(Constants.KEY_AUTH_USER);

        if (authUserCookie) {
            const authUserData = <AuthUserModel>JSON.parse(authUserCookie);

            if (new Date(authUserData.jwt.expiresOnClient) <= new Date() && request.headers.get("skipJwtInterceptor") != 'true') {
                return this.authorizationService.refreshToken().pipe(mergeMap(
                    accessToken => {
                        request = request.clone({
                            headers: request.headers.set("Authorization", "Bearer " + accessToken)
                        });

                        return next.handle(request);
                    }));
            } else {
                request = request.clone({
                    headers: request.headers.set("Authorization", "Bearer " + authUserData.jwt.accessToken)
                });

                return next.handle(request);
            }
        } else {
            return next.handle(request);
        }
    }
}