import { Injectable } from '@angular/core';
import { CartProduct } from '../common/cart-product';
import { Product } from '../common/product';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  totalCartValue: Subject<number> = new Subject<number>();
  totalQuantityOfProducts: Subject<number> = new Subject<number>();

  cartProducts: CartProduct[] = [];

  constructor() { }

  addToCart(product: Product) {
    let cartProduct: CartProduct = new CartProduct(product);
    let productInCart = undefined;
    if (this.cartProducts.length > 0) {
      productInCart = this.cartProducts.find(tempCartProduct => tempCartProduct.product.id === product.id);

    }
    if (productInCart != undefined) {
      productInCart.quantity++;
    } else {
      this.cartProducts.push(cartProduct);
    }

    this.computeCartContent();
  }

  getItems() {
    return this.cartProducts;
  }

  clearCart() {
    this.cartProducts = [];
  }

  computeCartContent() {
    let computedTotalCartValue = 0;
    let computedTotalQuanity = 0;
    for (let tempCartProduct of this.cartProducts) {
      computedTotalCartValue += tempCartProduct.product.unitPrice * tempCartProduct.quantity;
      computedTotalQuanity += tempCartProduct.quantity;
    }
    this.totalCartValue.next(computedTotalCartValue);
    this.totalQuantityOfProducts.next(computedTotalQuanity);
  }
}