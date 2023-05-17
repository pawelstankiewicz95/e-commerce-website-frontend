import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
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
import { LoginComponent } from './components/login/login.component';
import { LoginBarComponent } from './components/login-bar/login-bar.component';

import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG
} from '@okta/okta-angular';

import { OktaAuth } from '@okta/okta-auth-js';

import appConfig from './config/app-config';
import { CustomLoingCallbackComponent } from './components/custom-login-callback-component/custom-login-callback.component';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { CartProductService } from './services/cart-product.service';
import { ProductCrudComponent } from './components/product-crud/product-crud.component';

const oktaConfig = appConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

const routes: Routes = [
  { path: 'search/', redirectTo: '/products', pathMatch: 'full' },
  { path: 'search/:searchParam', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'product-details/:productId', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-info', component: OrderInfoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/callback', component: CustomLoingCallbackComponent },
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
    OrderInfoComponent,
    LoginComponent,
    LoginBarComponent,
    CustomLoingCallbackComponent,
    ProductCrudComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService, { provide: OKTA_CONFIG, useValue: { oktaAuth } }, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, CartProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
