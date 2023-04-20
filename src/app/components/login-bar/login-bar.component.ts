import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import {OktaAuth} from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-bar',
  templateUrl: './login-bar.component.html',
  styleUrls: ['./login-bar.component.css']
})
export class LoginBarComponent implements OnInit {

  isAuthenticated: boolean = false;
  userName: string = '';

  constructor(private oktaAuthService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {

  }

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe((response) => {
      this.isAuthenticated = response.isAuthenticated!;
      this.getUserDetails();
    })
  }

  getUserDetails(): void {
    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then((result) => this.userName = result.name as string)
    }
  }

  logout(): void {
      this.oktaAuth.signOut();
  }
}
