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

  public productsByCategoryId: Product[] = [];

  categoryId: number = 1;

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getId();
    this.getProducts();
    this.getProductsByCategoryId(this.categoryId);
  }

  public getProducts(): void {
    this.productService.getProucts().subscribe((response: Product[]) => this.products = response);
  }

  public getProductsByCategoryId(id: number) {
    this.productService.getProductsByCategoryId(id).subscribe((response: Product[]) => this.productsByCategoryId = response);
  }

  public getId():void{
    const hasCategoryId = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.categoryId = +this.route.snapshot.paramMap.get('id')!;
    }
  }

}
