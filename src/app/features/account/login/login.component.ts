import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthorizationService } from 'src/app/core/authorization/authorization-service';
import { AuthenticateUserModel } from 'src/app/models/authenticate-user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: AuthenticateUserModel = {
    email: 'kurtishvilii@gmail.com',
    password: '123'
  };

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly messageService: MessageService,
    private readonly router: Router) { }

  ngOnInit(): void {
  }

  loginClick() {
    if (!this.user.email || !this.user.password) {
      this.messageService.add({ severity: 'error', detail: 'enter all fields', summary: 'Error' })
    }
    this.login();
  }

  private login() {
    this.authorizationService.login(this.user).subscribe(
      response => {
        this.router.navigate(['products'])
      }
    )
  }

}
