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
const routes: Routes = [
  { path: 'search/', redirectTo: '/products', pathMatch: 'full' },
  { path: 'search/:searchParam', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'product-details/:productId', component: ProductDetailsComponent }
  { path: 'products', component: ProductListComponent },
  { path: '', component: ProductListComponent },
  { path: '**', component: ProductListComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
