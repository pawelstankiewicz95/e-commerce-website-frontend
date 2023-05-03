import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';

import appConfig from '../../config/app-config';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/common/cart';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignin: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {

    this.oktaSignin = new OktaSignIn({
      baseUrl: appConfig.oidc.issuer.split('/oauth2')[0],
      clientId: appConfig.oidc.clientId,
      redirectUri: appConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: appConfig.oidc.issuer,
        scopes: appConfig.oidc.scopes
      },
      features: { registration: true }
    });
  }

  ngOnInit(): void {
    this.oktaSignin.remove();
    this.oktaSignin.renderEl({
      el: '#okta-signin-widget'
    },
      (response: any) => {
        if (response.status === 'SUCCESS') {
          this.signIn();
        }
      },
      (error: any) => {
        throw error;
      }
    );
    //   this.oktaAuth.getUser().then((result) => this.userEmail = result.email as string);
    // this.cartService.getCartByEmail(this.userEmail).subscribe((response: Cart) => this.cart = response);
    //  this.cartService.bindCartProducts(this.cart.cartProducts)
    // this.cartService.computeCartContent();
  }
  public async signIn(): Promise<void> {
    await this.oktaAuth.signInWithRedirect();
  }


}
