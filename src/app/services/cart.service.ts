import { Inject, Injectable, OnInit } from '@angular/core';
import { CartProduct } from '../common/cart-product';
import { Product } from '../common/product';
import { BehaviorSubject, Observable, Subject, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../common/cart';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { ProductCategoryService } from './product-category.service';
import { CartProductService } from './cart-product.service';
import { User } from '../common/user';


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
  constructor(private httpClient: HttpClient,
    private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth,
    private cartProductService: CartProductService) {
    this.getFromStorage(this.storageCartProducts);

    this.oktaAuthService.authState$.subscribe((response) => {
      this.isAuthenticated = response.isAuthenticated!;
      if (this.isAuthenticated) {
        this.oktaAuth.getUser().then((result) => this.userEmail = result.email as string)
      }
    })
  }

  addToCart(product: Product) {
    let cartProduct: CartProduct = new CartProduct(product);
    let productInCart = undefined;
    if (this.cartProducts.length > 0) {
      productInCart = this.cartProducts.find(tempCartProduct => tempCartProduct.product.id === product.id);
    }
    if (productInCart != undefined) {
      this.increaseProductQuantity(productInCart);
    } else {
      this.cartProducts.push(cartProduct);
      if (this.isAuthenticated) {
        this.cartProductService.saveCartProductToCart(cartProduct, this.userEmail).subscribe({
          next: (response) => console.log(response),
          error: (error) => console.log(error)
        });
      }
    }
    this.computeCartContent();
  }

  getItems() {
    return this.cartProducts;
  }

  clearCart() {
    this.cartProducts = [];
    if (this.isAuthenticated){
    this.deleteCartByEmail(this.userEmail).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error)
    });
  }
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
    const productIndex = this.cartProducts.findIndex(tempCartProduct => (tempCartProduct.cartProductId === cartProduct.cartProductId));
    if (productIndex > -1) {
      this.cartProducts.splice(productIndex, 1);
      if (this.isAuthenticated) {
        this.cartProductService.deleteCartProduct(this.userEmail, cartProduct.cartProductId).subscribe({
          next: (response) => console.log(response),
          error: (error) => console.log(error)
        });
      }
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

  saveCart(cart: Cart): Observable<Cart> {
    return this.httpClient.post<Cart>(this.apiServerUrl, cart);
  }

  getCartByEmail(email: string): Observable<Cart> {
    return this.httpClient.get<Cart>(`${this.apiServerUrl}/${email}`);
  }

  public deleteCartByEmail(email: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerUrl}/${email}`);
  }

  getCartProducts() {
    this.getFromStorage(this.storageCartProducts);
  }

  async getCartFromDb() {
    const user = await this.oktaAuth.getUser();
    const email = user.email;
    const cart = await lastValueFrom(this.getCartByEmail(email!));
    if (cart != null) {
      this.cartProducts = cart.cartProducts;
      this.computeCartContent();
    } else {
      this.getFromStorage(this.storageCartProducts)
    };
  }

  increaseProductQuantity(cartProduct: CartProduct) {
    cartProduct.quantity++;
    if (this.isAuthenticated) {
      this.cartProductService.increaseCartProductQuantity(this.userEmail, cartProduct.cartProductId).subscribe({
        next: response => console.log(response),
        error: error => console.error(error)
      })
    };
    this.computeCartContent();
  }
  decreaseProductQuantity(cartProduct: CartProduct) {
    cartProduct.quantity--;
    if (this.isAuthenticated) {
      this.cartProductService.decreaseCartProductQuantity(this.userEmail, cartProduct.cartProductId).subscribe({
        next: response => console.log(response),
        error: error => console.error(error)
      })
    };
    this.computeCartContent();
  }

}
