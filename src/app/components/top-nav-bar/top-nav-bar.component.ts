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
  userName: string = '';
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  firstName = '';

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe((response) => {
      this.isAuthenticated = response.isAuthenticated!;
      this.checkIfIsAdmin().then((response) => this.isAdmin = response);
      this.getUserDetails();
    })
    
  }

  async logout() {
    await this.oktaAuth.signOut();
  }

  getUserDetails(): void {
    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then((result) => {
        this.userEmail = result.email as string;
        const userName = result.name as string;
        const firstName = userName.split(' ')[0];
        this.userName = userName;
        this.firstName = firstName;
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




