import { Injectable } from '@angular/core';
import { AuthUserModel } from 'src/app/core/authorization/authentification-response.model';
import { HttpService } from 'src/app/core/http/http.service';
import { AuthenticateUserModel, RegisterUserModel } from 'src/app/models/authenticate-user.model';

const apiBaseUrl = "http://localhost:56902/api/account";

@Injectable()
export class AccountService {

    constructor(private readonly httpService: HttpService) { }

    registerUser(user: RegisterUserModel) {
        return this.httpService.post<RegisterUserModel>(`${apiBaseUrl}/register`, user, true)
    }

    login(user: AuthenticateUserModel){
        return this.httpService.get<AuthUserModel>(`${apiBaseUrl}/login`, user)
    }
}