import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  productFormGroup!: FormGroup;
  categories: ProductCategory[] = [];
  product!: Product;
  productCategory!: ProductCategory;
  productCategoryName: string = '';

  constructor(private formBuilder: FormBuilder, private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.handleFormGroup();
    this.getProductById();
    this.getCategories();
  }

  handleFormGroup() {
    this.productFormGroup = this.formBuilder.group({
      product: this.formBuilder.group({
        'id': new FormControl(''),
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
    this.product = this.productFormGroup.controls['product'].value;
    console.log(this.product);
    this.productService.updateProduct(this.product).subscribe({
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

  getProductById() {
    if (this.route.snapshot.paramMap.has('productId')) {
      let productId = +this.route.snapshot.paramMap.get('productId')!;
      this.productService.getProductById(productId).subscribe({
        next: (response) => { this.product = response, console.log(response), this.bindProductForm() },
        error: (error) => console.log(error)
      })
    }
  }

  bindProductForm() {
    setTimeout(() => {
      this.productFormGroup.get('product')?.patchValue({
        id: this.product.id,
        sku: this.product.sku,
        name: this.product.name,
        description: this.product.description,
        unitPrice: this.product.unitPrice,
        imageUrl: this.product.imageUrl,
        active: this.product.active,
        unitsInStock: this.product.unitsInStock,
        productCategory: this.product.productCategory
      });
    });
  }
}
