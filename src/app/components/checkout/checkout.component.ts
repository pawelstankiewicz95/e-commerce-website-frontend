import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { CartProduct } from 'src/app/common/cart-product';
import { Router } from '@angular/router';
import { Customer } from 'src/app/common/customer';
import { ShippingAddress } from 'src/app/common/shipping-address';
import { OrderProduct } from 'src/app/common/order-product';
import { Summary } from 'src/app/common/summary';
import { Order } from 'src/app/common/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartProducts: CartProduct[] = [];
  totalCartValue: number = 0;
  totalQuantityOfProducts: number = 0;
  shippingPrice: number = 0;
  checkoutFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService) { };

  ngOnInit() {
    this.cartProducts = this.cartService.cartProducts;
    this.handleFormGroup();
    this.getSummaryValues();


  }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    let customer = new Customer();
    customer = this.checkoutFormGroup.controls['customer'].value;

    let shippingAddress = new ShippingAddress();
    shippingAddress = this.checkoutFormGroup.controls['address'].value;

    let orderProducts: OrderProduct[] = this.cartProducts.map(cartProduct => new OrderProduct(cartProduct));
    console.log(orderProducts);

    let summary = new Summary();
    summary.totalCartValue = this.totalCartValue;
    summary.totalQuantityOfProducts = this.totalQuantityOfProducts;

    let order = new Order(customer, shippingAddress, summary, orderProducts);

    this.orderService.saveOrder(order).subscribe({
      next: response => {
        console.log(response),
          this.clearCart(),
          this.router.navigateByUrl("/order-info")
      },
      error: error => { alert(`There was an error: ${error.message}`) }
    });
  }

  getSummaryValues() {
    this.cartService.totalCartValue.subscribe((response: number) => this.totalCartValue = response);
    this.cartService.totalQuantityOfProducts.subscribe((response: number) => this.totalQuantityOfProducts = response);
  }

  handleFormGroup() {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        'firstName': new FormControl('', Validators.required),
        'lastName': new FormControl('', Validators.required),
        'phoneNumber': new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')]),
        'email': new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)])
      }),
      address: this.formBuilder.group({
        'country': new FormControl({ value: 'Poland', disabled: true }),
        'streetAddress': new FormControl('', [Validators.required]),
        'city': new FormControl('', Validators.required),
        'zipCode': new FormControl('', [Validators.required, Validators.pattern('^[0-9]{2}-[0-9]{3}')])
      })
    });
  }
  computeTotalProductPrice(cartProduct: CartProduct): number {
    return cartProduct.quantity * cartProduct.unitPrice;
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartProducts = this.cartService.cartProducts;
    this.cartService.computeCartContent();
  }

  get firstName() {
    return this.checkoutFormGroup.get('coustomer.firstName');
  }

  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get phoneNumber() {
    return this.checkoutFormGroup.get('customer.phoneNumber');
  }

  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  get country() {
    return this.checkoutFormGroup.get('address.country');
  }

  get streetAddress() {
    return this.checkoutFormGroup.get('address.streetAddress');
  }

  get city() {
    return this.checkoutFormGroup.get('address.city');
  }

  get zipCode() {
    return this.checkoutFormGroup.get('address.zipCode');
  }

}
