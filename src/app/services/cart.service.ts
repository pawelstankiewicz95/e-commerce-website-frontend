import { Injectable } from '@angular/core';
import { CartProduct } from '../common/cart-product';
import { Product } from '../common/product';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  totalCartValue: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantityOfProducts: Subject<number> = new BehaviorSubject<number>(0);
  cartProducts: CartProduct[] = [];
  storage: Storage = localStorage;
  constructor() {
    this.getFromStorage();
   }

  addToCart(product: Product) {
    let cartProduct: CartProduct = new CartProduct(product);
    let productInCart = undefined;
    if (this.cartProducts.length > 0) {
      productInCart = this.cartProducts.find(tempCartProduct => tempCartProduct.id === product.id);

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
      computedTotalCartValue += tempCartProduct.unitPrice * tempCartProduct.quantity;
      computedTotalQuanity += tempCartProduct.quantity;
    }
    this.totalCartValue.next(computedTotalCartValue);
    this.totalQuantityOfProducts.next(computedTotalQuanity);
    this.persistToStorage();
  }

  removeFromCart(cartProduct: CartProduct) {
    const productIndex = this.cartProducts.findIndex(tempCartProduct => (tempCartProduct.id === cartProduct.id));
    if (productIndex > -1) {
      this.cartProducts.splice(productIndex, 1);
    }
    this.computeCartContent();
  }

  persistToStorage(){
    this.storage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  }

  getFromStorage(){
    let cartProductsFromStorage = JSON.parse(this.storage.getItem('cartProducts')!);
    if (cartProductsFromStorage != null){
      this.cartProducts = cartProductsFromStorage;
      this.computeCartContent();
    }
  }
}