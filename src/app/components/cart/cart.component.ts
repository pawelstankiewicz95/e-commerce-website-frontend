import { Component } from '@angular/core';
import { CartProduct } from 'src/app/common/cart-product';
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
    cartProduct.quantity++;
    this.cartService.computeCartContent();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartProducts = this.cartService.cartProducts;
    this.cartService.computeCartContent();
  }
}
