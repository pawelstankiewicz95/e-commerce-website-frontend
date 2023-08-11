import { Component, Inject } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent {
  constructor(private oktaAuthService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  userEmail: string = '';
  userName: string ='';
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe((response) => {
      this.isAuthenticated = response.isAuthenticated!;
      this.getUserDetails();
      this.checkIfIsAdmin().then((response) => this.isAdmin = response);
    })
  }

  getUserDetails(): void {
    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then((result) => {
        this.userEmail = result.email as string;
        this.userName = result.name as string;
      });
    }
  }

  async checkIfIsAdmin(): Promise<boolean> {
    if (this.isAuthenticated) {
      const user = await this.oktaAuth.getUser();
      const groups = Array.isArray(user?.['groups']) ? user['groups'] : [user?.['groups']];
      console.log(groups);
      return groups.includes('admin');
    } else {
      return false;
    }
  }
}




