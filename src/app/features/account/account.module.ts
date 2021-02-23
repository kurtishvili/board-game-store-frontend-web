import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AccountRoutingModule } from './account-routing.module';
import { BgsSharedModule } from 'src/app/shared/bgs-shared.module';
import { AccountService } from './account.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    AccountRoutingModule,
    BgsSharedModule
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule { }