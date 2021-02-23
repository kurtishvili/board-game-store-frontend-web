import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService } from './authorization-service';

@Injectable()
export class AuthorizationGuard implements CanActivate{

    constructor (
        private readonly authorizationService : AuthorizationService,
        private readonly router : Router){}

        async canActivate() {
            if(!this.authorizationService.isAuthenticated.value){
                this.router.navigate(['account', 'login'])

                return false;
            }

            return true;
        }
}

@Injectable()
export class LoginAuthGuard implements CanActivate {

    constructor(
        private readonly authorizationService : AuthorizationService,
        private readonly router : Router ) {}

        canActivate(){
            if(this.authorizationService.isAuthenticated.value){
                this.router.navigate(['/'])

                return false;
            }

            return true;
        }
}