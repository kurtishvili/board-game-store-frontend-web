import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/core/authorization/authorization-service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  get firstname() {
    return this.authorizationService.authUserData.firstname;
  }

  showMenu: boolean = false;

  constructor(
    private readonly authorizationService: AuthorizationService) { }

  ngOnInit(): void {
  }

  profileClick() {
    this.showMenu = !this.showMenu
  }

  signOut() {
    this.authorizationService.logout();

    window.location.reload();
  }

}
