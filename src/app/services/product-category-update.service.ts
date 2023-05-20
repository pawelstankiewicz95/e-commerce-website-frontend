import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable()
export class ProductCategoryUpdateService {
  private productCategoriesUpdatedSource = new Subject<ProductCategory[]>();
  productCategoriesUpdated$ = this.productCategoriesUpdatedSource.asObservable();

  announceProductCategoriesUpdate(productCategories: ProductCategory[]): void {
    this.productCategoriesUpdatedSource.next(productCategories);
  }
}