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
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG,
  OktaAuthGuard
} from '@okta/okta-angular';

import { OktaAuth } from '@okta/okta-auth-js';

import appConfig from './config/app-config';
import { CustomLoingCallbackComponent } from './components/custom-login-callback-component/custom-login-callback.component';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { CartProductService } from './services/cart-product.service';
import { ProductCategoryCrudComponent } from './components/product-category-crud/product-category-crud.component';
import { AddNewCategoryComponent } from './components/add-new-category/add-new-category.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { ProductCategoryUpdateService } from './services/product-category-update.service';
import { DeleteCategoryComponent } from './components/delete-category/delete-category.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductSettingsComponent } from './components/product-settings/product-settings.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { ProductCategoryService } from './services/product-category.service';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderDashboardComponent } from './components/order-dashboard/order-dashboard.component';
import { FindOrderComponent } from './components/find-order/find-order.component';
import { HomePageComponent } from './components/home-page/home-page.component';

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
  {
    path: 'update-product/:productId', component: UpdateProductComponent,
    canActivate: [OktaAuthGuard], data: { oktaGuardConfig: { groups: ['admin'] } }
  },
  {
    path: 'product-category-crud', component: ProductCategoryCrudComponent, canActivate: [OktaAuthGuard],
    data: { oktaGuardConfig: { groups: ['admin'] } },
    children: [
      { path: 'add-category', component: AddNewCategoryComponent },
      { path: 'update-category', component: UpdateCategoryComponent },
      { path: 'delete-category', component: DeleteCategoryComponent }]
  },
  {
    path: 'product-settings', component: ProductSettingsComponent,
    data: { oktaGuardConfig: { groups: ['admin'] } },
    children: [
      { path: 'add-product', component: AddProductComponent },
    ]
  },
  {
    path: 'order-dashboard', component: OrderDashboardComponent, canActivate: [OktaAuthGuard],
    data: { oktaGuardConfig: { groups: ['admin'] } },
    children: [{
      path: 'all-orders', component: AllOrdersComponent, canActivate: [OktaAuthGuard],
      data: { oktaGuardConfig: { groups: ['admin'] } }
    },
    {
      path: 'find-order', component: FindOrderComponent, canActivate: [OktaAuthGuard],
      data: { oktaGuardConfig: { groups: ['admin'] } }
    },
    {
      path: 'order-details/:id', component: OrderDetailsComponent, canActivate: [OktaAuthGuard],
      data: { oktaGuardConfig: { groups: ['admin'] } }
    },
    {
      path: `find-order/by-user/:userName`, component: AllOrdersComponent, canActivate: [OktaAuthGuard],
      data: { oktaGuardConfig: { groups: ['admin'] } }
    },
    {
      path: `find-order/by-id/:orderId`, component: AllOrdersComponent, canActivate: [OktaAuthGuard],
      data: { oktaGuardConfig: { groups: ['admin'] } }
    },
    {
      path: `find-order/by-customer/:customerEmail`, component: AllOrdersComponent, canActivate: [OktaAuthGuard],
      data: { oktaGuardConfig: { groups: ['admin'] } }
    }
    ]
  },

  {
    path: `find-order/by-user/:userName`, component: AllOrdersComponent, canActivate: [OktaAuthGuard],
    data: { oktaGuardConfig: { groups: ['admin', 'user'] } }
  },

  { path: 'order-details/:id', component: OrderDetailsComponent },

  {
    path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [OktaAuthGuard],
    data: {
      oktaGuardConfig: {
        groups: ['admin'],
      },
    }
  },
  { path: '', component: HomePageComponent },
  { path: '**', component: HomePageComponent },

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
    AdminDashboardComponent,
    ProductCategoryCrudComponent,
    AddNewCategoryComponent,
    UpdateCategoryComponent,
    DeleteCategoryComponent,
    AddProductComponent,
    ProductSettingsComponent,
    UpdateProductComponent,
    AllOrdersComponent,
    OrderDetailsComponent,
    OrderDashboardComponent,
    FindOrderComponent,
    HomePageComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      onSameUrlNavigation: 'reload'
    }),
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [
    ProductService,
    { provide: OKTA_CONFIG, useValue: { oktaAuth } },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    CartProductService,
    ProductCategoryUpdateService,
    ProductCategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
