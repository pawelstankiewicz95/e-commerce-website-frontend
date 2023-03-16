import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products: Product[] = [];
  hasSearchParameter: boolean = false;
  hasCategoryId: boolean = false;
  categoryId: number = 1;
  searchValue: string = "";

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.handleShowingProducts());
  }

  public handleShowingProducts() {
    this.hasCategoryId = this.route.snapshot.paramMap.has('id');
    this.hasSearchParameter = this.route.snapshot.paramMap.has('searchParam');
    if (this.hasSearchParameter) {
      this.searchProductsByNameOrSku();
    }
    if (this.hasCategoryId) {
      this.getProductsByCategoryId();
    }
    if (!(this.hasSearchParameter) && !(this.hasCategoryId)){
      this.getProducts();
    }
  }

  public getProducts(): void {
    this.productService.getProucts().subscribe((response: Product[]) => this.products = response);
  }

  public getProductsByCategoryId() {
    this.categoryId = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductsByCategoryId(this.categoryId).subscribe((response: Product[]) => this.products = response);
  }

  public searchProductsByNameOrSku() {
    this.searchValue = this.route.snapshot.paramMap.get('searchParam')!;
    this.productService.getProductsByNameLikeOrSkuLike(this.searchValue).subscribe((response: Product[]) => this.products = response);
  }

}
