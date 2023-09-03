import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.css']
})
export class AddNewCategoryComponent {
  categoryNameForm!: FormControl;

  constructor(private productCategoryService: ProductCategoryService) {

  }
  ngOnInit() {
    this.handleForm();
  }

  handleForm() {
    this.categoryNameForm = new FormControl('');
  }

  saveCategory() {
    let categoryName = this.categoryNameForm.value;
    const productCategory = new ProductCategory(0, categoryName);
    this.productCategoryService.saveProductCategory(productCategory).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error)
    });
  }
}
