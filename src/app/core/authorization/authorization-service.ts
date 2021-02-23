import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticateUserModel } from 'src/app/models/authenticate-user.model';
import { AppConfigurationService } from '../app-configuration/app.configuration.service';
import { Constants } from '../constants';
import { HttpService } from '../http/http.service';
import { AuthUserModel, JsonWebToken } from './authentification-response.model';

@Injectable()
export class AuthorizationService {

    private get apiBaseUri() { return `${this.appConfigService.getAppConfig('apiBaseUri')}/api/account`; }

    isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.cookieService.get(Constants.KEY_AUTH_USER) !== "");

    get authUserData(): AuthUserModel {
        const authUserCookie = this.cookieService.get(Constants.KEY_AUTH_USER);

        if (authUserCookie === "") {
            window.location.reload();

            return <any>{};
        }

        return JSON.parse(authUserCookie);
    }

    constructor(
        private readonly httpService: HttpService,
        private readonly cookieService: CookieService,
        private readonly router: Router,
        private readonly appConfigService: AppConfigurationService) { }

    login(user: AuthenticateUserModel) {
        return this.httpService.get<AuthUserModel>(`${this.apiBaseUri}/login`, user)
            .pipe(map(response => {
                response.jwt.expiresOnClient = new Date((new Date()).getTime() + response.jwt.expiresInMinutes * 30000).getTime();
                response.jwt.expiresOnServer = new Date((new Date()).getTime() + response.jwt.expiresInMinutes * 60000).getTime();

                this.cookieService.set(
                    Constants.KEY_AUTH_USER,
                    JSON.stringify(response),
                    new Date(response.jwt.expiresOnServer),
                    "/"
                );

                this.isAuthenticated.next(true);

                this.router.navigate(['/']);
            }));
    }

    refreshToken() {
        return this.httpService.get<JsonWebToken>(`${this.apiBaseUri}/refreshToken`, null, null, true)
            .pipe(map(response => {
                const authUserCookie = this.cookieService.get(Constants.KEY_AUTH_USER);
                const authUserData = <AuthUserModel>JSON.parse(authUserCookie);

                response.expiresOnClient = new Date((new Date()).getTime() + response.expiresInMinutes * 30000).getTime();
                response.expiresOnServer = new Date((new Date()).getTime() + response.expiresInMinutes * 60000).getTime();

                this.cookieService.set(
                    Constants.KEY_AUTH_USER,
                    JSON.stringify({ ...authUserData, jwt: response }),
                    new Date(response.expiresOnServer),
                    "/"
                );

                return response.accessToken;
            }));
    }

    logout() {
        this.cookieService.delete(Constants.KEY_AUTH_USER, "/");
    }
}