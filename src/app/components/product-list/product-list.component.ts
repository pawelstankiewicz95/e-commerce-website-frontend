import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
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
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe((response) => {
      this.isAuthenticated = response.isAuthenticated!;
      this.checkIfIsAdmin().then((response)=> this.isAdmin = response);
    })
    this.route.paramMap.subscribe(() => this.handleShowingProducts());
  }

  async checkIfIsAdmin(): Promise<boolean> {
    if (this.isAuthenticated) {
      const user = await this.oktaAuth.getUser();
      const groups = Array.isArray(user?.['groups']) ? user['groups'] : [user?.['groups']];
      console.log(groups);
      return groups.includes('admin');
    } else {
      return false;
    }
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
    if (!(this.hasSearchParameter) && !(this.hasCategoryId)) {
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

  public addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('You have added product to the cart!');
  }

  public deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error)
    });
  }

}
