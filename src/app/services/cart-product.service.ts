import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartProduct } from '../common/cart-product';

@Injectable({
  providedIn: 'root'
}
)
export class CartProductService {

  private apiServerUrl = 'http://localhost:8082/api/cart-products';

  constructor(private httpClient: HttpClient) { }

  public getCartProducts(): Observable<CartProduct[]> {
    return this.httpClient.get<CartProduct[]>(this.apiServerUrl);
  }

  public saveCartProduct(cartProduct: CartProduct): Observable<CartProduct> {
    return this.httpClient.post<CartProduct>(this.apiServerUrl, cartProduct);
  }

  public increaseCartProductQuantity(userEmail: String, productId: number): Observable<any> {
    return this.httpClient.put(`${this.apiServerUrl}/increase/${userEmail}/${productId}`, {});
  }

  public decreaseCartProductQuantity(userEmail: String, productId: number): Observable<any> {
    return this.httpClient.put(`${this.apiServerUrl}/decrease/${userEmail}/${productId}`, {});
  }

  public deleteCartProduct(userEmail: string, productId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerUrl}/${userEmail}/${productId}`);
  }

  public getCartProductById(cartProductId: number): Observable<CartProduct> {
    return this.httpClient.get<CartProduct>(`${this.apiServerUrl}/${cartProductId}`);
  }
  public getCartProductsByUserEmail(userEmail: string): Observable<CartProduct[]> {
    return this.httpClient.get<CartProduct[]>(`${this.apiServerUrl}/${userEmail}`);
  }
}
