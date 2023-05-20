import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategoryUpdateService } from 'src/app/services/product-category-update.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent {

  public productCategories: ProductCategory[] = [];

  constructor(private productCategoryService: ProductCategoryService, private productCategoryUpdateService: ProductCategoryUpdateService) { }

  ngOnInit(): void {
    this.getProductCategories();
    this.productCategoryUpdateService.productCategoriesUpdated$.subscribe(
      (productCategories: ProductCategory[]) => {
        // Update the component with the new product categories
        this.productCategories = productCategories;
      }
    );
  }

  public getProductCategories(): void {
    this.productCategoryService.getProductCategories().subscribe((response: ProductCategory[]) => this.productCategories = response);
  }

}
