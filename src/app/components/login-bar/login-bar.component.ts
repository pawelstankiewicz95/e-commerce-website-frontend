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
  userName: string = '';
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
      this.oktaAuth.getUser().then((result) => this.userName = result.name as string)
      this.oktaAuth.getUser().then((result) => this.userEmail = result.email as string);
    }
  }

  saveCart() {
    this.cartProducts = this.cartService.cartProducts;
    this.cartService.computeCartContent();
    let user: User = new User();
    user.email = this.userEmail;
    let cart: Cart = new Cart(user, this.cartProducts);
    console.log(cart);
    return this.cartService.saveCart(cart);
  }

  async logout() {
    try {
      await lastValueFrom(this.cartService.deleteCartByEmail(this.userEmail));
      await lastValueFrom(this.saveCart());

    } catch (e) {
      console.log(e);
    }
    await this.oktaAuth.signOut();
  }
}
