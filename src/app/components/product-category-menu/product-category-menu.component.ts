import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent {

  public productCategories: ProductCategory[] = [];

  constructor(private productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    this.getProductCategories();
  }

  public getProductCategories(): void {
    this.productCategoryService.getProductCategories().subscribe((response: ProductCategory[]) => this.productCategories = response);
  }

}
