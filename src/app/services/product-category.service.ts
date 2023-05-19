import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private apiServerUrl = 'http://localhost:8082/api/product-categories';

  constructor(private httpClient: HttpClient) { }

  public getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(this.apiServerUrl);
  }

  public saveProductCategory(productCategory: ProductCategory): Observable<ProductCategory> {
    return this.httpClient.post<ProductCategory>(this.apiServerUrl, productCategory);
  }

  public updateProductCategory(productCategory: ProductCategory): Observable<ProductCategory> {
    return this.httpClient.put<ProductCategory>(this.apiServerUrl, productCategory);
  }
}
