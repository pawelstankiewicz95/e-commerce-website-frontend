import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  public product!: Product;
  productId: number = 1;
  hasProductId: boolean = false;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => this.handleShowingProductDetails());
  }

  public handleShowingProductDetails() {
    this.hasProductId = this.route.snapshot.paramMap.has('productId');
    if (this.hasProductId) {
      this.getProductById();
    }
  }

  public getProductById() {
    this.productId = +this.route.snapshot.paramMap.get('productId')!;
    this.productService.getProductById(this.productId).subscribe((response: Product) => this.product = response);
  }

  public addToCart(product: Product){
    this.cartService.addToCart(this.product);
    window.alert('You have added product to the cart!');
  }

}

