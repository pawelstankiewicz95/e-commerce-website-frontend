import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategoryUpdateService } from 'src/app/services/product-category-update.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {
  categoryNameForm!: FormControl;
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
    this.categoryNameForm = new FormControl('');
    this.category = new FormControl('');
    this.category.setValue(this.defaultValue);
  }

  getCategories() {
    this.productCategoryService.getProductCategories().subscribe({
      next: (response) => this.categories = response,
      error: (error) => console.log(error)
    });
  }

  updateCategory() {
    let categoryName = this.categoryNameForm.value;
    let productCategory = this.category.value;
    const newProductCategory = new ProductCategory(productCategory.id, categoryName);
    this.productCategoryService.updateProductCategory(newProductCategory).subscribe({
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
    this.categoryNameForm.setValue(this.categoryName);
    console.log(productCategory.categoryName);
  }

  updateProductCategories(): void {
    this.productCategoryService.getProductCategories().subscribe((response: ProductCategory[]) => {
      this.productCategoryUpdateService.announceProductCategoriesUpdate(response);
    });
  }

}
