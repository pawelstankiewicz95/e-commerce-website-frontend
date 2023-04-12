import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http'
import { ProductService } from './services/product.service';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CartBarComponent } from './components/cart-bar/cart-bar.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { OrderInfoComponent } from './components/order-info/order-info.component';
const routes: Routes = [
  { path: 'search/', redirectTo: '/products', pathMatch: 'full' },
  { path: 'search/:searchParam', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'product-details/:productId', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent},
  { path: 'products', component: ProductListComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-info', component: OrderInfoComponent },
  { path: '', component: ProductListComponent },
  { path: '**', component: ProductListComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartComponent,
    CartBarComponent,
    CheckoutComponent,
    TopNavBarComponent,
    OrderInfoComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
