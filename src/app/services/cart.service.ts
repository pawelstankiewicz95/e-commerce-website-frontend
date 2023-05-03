import { Inject, Injectable, OnInit } from '@angular/core';
import { CartProduct } from '../common/cart-product';
import { Product } from '../common/product';
import { BehaviorSubject, Observable, Subject, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../common/cart';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  totalCartValue: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantityOfProducts: Subject<number> = new BehaviorSubject<number>(0);
  cartProducts: CartProduct[] = [];
  storage: Storage = localStorage;
  userEmail: string = '';
  isAuthenticated: boolean = false;
  storageCartProducts: string = 'storageCartProducts';

  private apiServerUrl = 'http://localhost:8082/api/cart'
  constructor(private httpClient: HttpClient, private oktaAuthService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.getFromStorage(this.storageCartProducts);
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
    this.persistToStorage(this.cartProducts, this.storageCartProducts);
  }

  removeFromCart(cartProduct: CartProduct) {
    const productIndex = this.cartProducts.findIndex(tempCartProduct => (tempCartProduct.id === cartProduct.id));
    if (productIndex > -1) {
      this.cartProducts.splice(productIndex, 1);
    }
    this.computeCartContent();
  }

  persistToStorage(cartProducts: CartProduct[], itemName: string) {
    this.storage.setItem(itemName, JSON.stringify(cartProducts));
  }

  getFromStorage(storageItem: string) {

    let cartProductsFromStorage = JSON.parse(this.storage.getItem(storageItem)!);
    if (cartProductsFromStorage != null) {
      this.cartProducts = cartProductsFromStorage;
      this.computeCartContent();
    }
  }

  clearStorage() {
    this.storage.clear();
  }

  saveCart(cart: Cart): Observable<any> {
    return this.httpClient.post<Cart>(this.apiServerUrl, cart);
  }

  getCartByEmail(email: string): Observable<Cart> {
    return this.httpClient.get<Cart>(`${this.apiServerUrl}/${email}`);
  }

  getCartProducts() {
    this.getFromStorage(this.storageCartProducts);
  }

  async getCartFromDb() {
    const user = await this.oktaAuth.getUser();
    const email = user.email;
    const cart = await lastValueFrom(this.getCartByEmail(email!));
    this.cartProducts = cart.cartProducts;
    this.computeCartContent();
    this.getFromStorage(this.storageCartProducts);
  }

}
