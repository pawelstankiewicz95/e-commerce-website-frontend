import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable()
export class ProductService {

  private apiServerUrl = 'http://localhost:8082/api/products';

  constructor(private httpClient: HttpClient) { }

  public getProucts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiServerUrl);
  }

  public saveProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiServerUrl, product);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(this.apiServerUrl, product);
  }

  public deleteProduct(productID: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerUrl}/${productID}`);
  }

  public getProductsByCategoryId(categoryId: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiServerUrl}/products-by-category-id/${categoryId}`);
  }

  public getProductsByNameLikeOrSkuLike(nameOrSku: String): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiServerUrl}/products-by-name-or-sku/${nameOrSku}`)
  }
}
