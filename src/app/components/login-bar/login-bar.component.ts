import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Cart } from 'src/app/common/cart';
import { CartProduct } from 'src/app/common/cart-product';
import { User } from 'src/app/common/user';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login-bar',
  templateUrl: './login-bar.component.html',
  styleUrls: ['./login-bar.component.css']
})
export class LoginBarComponent implements OnInit {

  isAuthenticated: boolean = false;
  firstName: string = '';
  userEmail: string = '';
  cartProducts: CartProduct[] = [];
  storage: Storage = localStorage;

  constructor(private oktaAuthService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private cartService: CartService) {

  }

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe((response) => {
      this.isAuthenticated = response.isAuthenticated!;
      this.getUserDetails();
    })
  }

  getUserDetails(): void {
    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then((result) => {
        const fullName = result.name as string;
        const firstName = fullName.split(' ')[0];
        this.firstName = firstName;
        this.userEmail = result.email as string;
      });
    }
  }

  async logout() {
    await this.oktaAuth.signOut();
  }
}
