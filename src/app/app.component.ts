import { Component } from '@angular/core';
import { AuthorizationService } from './core/authorization/authorization-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  get isAuthenticated() {
    return this.authorizationService.isAuthenticated.value;
  }

  constructor(private readonly authorizationService: AuthorizationService) { }
}
