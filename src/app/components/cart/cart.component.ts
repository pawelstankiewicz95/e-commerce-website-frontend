import { Component, Inject } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { Observable } from 'rxjs';
import { CartProduct } from 'src/app/common/cart-product';
import { CartProductService } from 'src/app/services/cart-product.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartProducts: CartProduct[] = [];
  totalCartValue: number = 0;
  totalQuantityOfProducts: number = 0;
  shippingPrice: number = 0;

  constructor(private cartService: CartService) { };

  ngOnInit() {
    this.showCart();
  }

  showCart() {
    this.cartProducts = this.cartService.cartProducts;
    this.cartService.totalCartValue.subscribe((response: number) => this.totalCartValue = response);
    this.cartService.totalQuantityOfProducts.subscribe((response: number) => this.totalQuantityOfProducts = response);
    this.cartService.computeCartContent();
  }

  increaseProductQuantity(cartProduct: CartProduct) {
    this.cartService.increaseProductQuantity(cartProduct);
  }

  decreaseProductQuantity(cartProduct: CartProduct) {
    this.cartService.decreaseProductQuantity(cartProduct);
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartProducts = this.cartService.cartProducts;
    this.cartService.computeCartContent();
  }
  removeFromCart(cartProduct: CartProduct) {
    this.cartService.removeFromCart(cartProduct);
    this.cartProducts = this.cartService.cartProducts;
    this.cartService.computeCartContent();
  }

  computeTotalProductPrice(cartProduct: CartProduct): number {
    return cartProduct.quantity * cartProduct.unitPrice;
  }
}
