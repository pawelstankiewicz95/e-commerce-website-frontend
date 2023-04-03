import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { CartProduct } from 'src/app/common/cart-product';
import { Router } from '@angular/router';

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
    private router: Router) { };

  ngOnInit() {
    this.cartProducts = this.cartService.cartProducts;
    this.handleFormGroup();
    this.getSummaryValues();


  }

  onSubmit() {
    this.clearCart();
    this.router.navigateByUrl("/order-info");

  }

  getSummaryValues() {
    this.cartService.totalCartValue.subscribe((response: number) => this.totalCartValue = response);
    this.cartService.totalQuantityOfProducts.subscribe((response: number) => this.totalQuantityOfProducts = response);
  }

  handleFormGroup() {
    this.checkoutFormGroup = this.formBuilder.group({
      coustomer: this.formBuilder.group({
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

  clearCart() {
    this.cartService.clearCart();
    this.cartProducts = this.cartService.cartProducts;
    this.cartService.computeCartContent();
  }

  get firstName() {
    return this.checkoutFormGroup.get('coustomer.firstName');
  }

  get lastName() {
    return this.checkoutFormGroup.get('coustomer.lastName');
  }

  get phoneNumber() {
    return this.checkoutFormGroup.get('coustomer.phoneNumber');
  }

  get email() {
    return this.checkoutFormGroup.get('coustomer.email');
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
