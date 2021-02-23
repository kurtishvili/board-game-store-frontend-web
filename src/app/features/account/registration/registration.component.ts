import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RegisterUserModel } from 'src/app/models/authenticate-user.model';
import { UserDetails } from 'src/app/models/user-models';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  user: RegisterUserModel = {};

  constructor(
    private readonly accountService: AccountService,
    private readonly messageService: MessageService,
    private readonly router: Router) { }

  ngOnInit(): void {
  }

  registerClick() {
    if (this.user.password != this.user.repeatPassword) {
      this.messageService.add({ severity: 'error', detail: 'Passwords do not match', summary: 'Error' })
      return;
    }

    this.registerUser();
  }

  registerUser() {
    this.accountService.registerUser(this.user).subscribe(
      response => {
        this.router.navigate(['account', 'login']);
      }
    )
  }
}
