import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  productFormGroup!: FormGroup;
  categories: ProductCategory[] = [];

  constructor(private formBuilder: FormBuilder, private productCategoryService: ProductCategoryService, private productService: ProductService) { }

  ngOnInit() {
    this.handleFormGroup();
    this.getCategories();
  }

  handleFormGroup() {
    this.productFormGroup = this.formBuilder.group({
      product: this.formBuilder.group({
        'sku': new FormControl(''),
        'name': new FormControl(''),
        'description': new FormControl(''),
        'unitPrice': new FormControl(''),
        'imageUrl': new FormControl(''),
        'active': new FormControl(''),
        'unitsInStock': new FormControl(''),
        'productCategory': new FormControl('')
      })
    });
  }

  onSubmit() {
    let product = new Product();
    product = this.productFormGroup.controls['product'].value;
    console.log(product);
    this.productService.saveProduct(product).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error)
    });
  }


  getCategories() {
    this.productCategoryService.getProductCategories().subscribe({
      next: (response) => this.categories = response,
      error: (error) => console.log(error)
    });
  }
}
