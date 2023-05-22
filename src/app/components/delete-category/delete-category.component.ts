import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategoryUpdateService } from 'src/app/services/product-category-update.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent {
  category!: FormControl;
  defaultValue: string = "defaultValue";
  categories: ProductCategory[] = [];
  categoryName: string = '';

  constructor(private productCategoryService: ProductCategoryService,
    private productCategoryUpdateService: ProductCategoryUpdateService) {
  }
  ngOnInit() {
    this.getCategories();
    this.handleForm();
    this.productCategoryUpdateService.productCategoriesUpdated$.subscribe(
      (productCategories: ProductCategory[]) => {
        this.categories = productCategories;
      }
    );
  }

  handleForm() {
    this.category = new FormControl('');
    this.category.setValue(this.defaultValue);
  }

  getCategories() {
    this.productCategoryService.getProductCategories().subscribe({
      next: (response) => this.categories = response,
      error: (error) => console.log(error)
    });
  }

  deleteCategory() {
    let productCategory = this.category.value;
    this.productCategoryService.deleteProductCategory(productCategory.id).subscribe({
      next: (response) => {
        console.log(response);
        this.updateProductCategories();
      },
      error: (error) => console.log(error)
    });
  }

  onChange() {
    let productCategory = this.category.value;
    this.categoryName = productCategory.categoryName;
    console.log(productCategory.categoryName);
  }

  updateProductCategories(): void {
    this.productCategoryService.getProductCategories().subscribe((response: ProductCategory[]) => {
      this.productCategoryUpdateService.announceProductCategoriesUpdate(response);
    });
  }

}
