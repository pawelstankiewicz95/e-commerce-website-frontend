import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { CartProduct } from 'src/app/common/cart-product';

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
    private cartService: CartService) { }

  ngOnInit() {
    this.cartProducts = this.cartService.cartProducts;
    this.handleFormGroup();
    this.getSummaryValues();


  }

  getSummaryValues() {
    this.cartService.totalCartValue.subscribe((response: number) => this.totalCartValue = response);
    this.cartService.totalQuantityOfProducts.subscribe((response: number) => this.totalQuantityOfProducts = response);
  }

  handleFormGroup() {
    this.checkoutFormGroup = this.formBuilder.group({
      coustomer: this.formBuilder.group({
        'firstName': new FormControl('', [Validators.required, this.validateWhiteSpaces]),
        'lastName': new FormControl('', [Validators.required, this.validateWhiteSpaces]),
        'phoneNumber': new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$'), this.validateWhiteSpaces]),
        'email': new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i), this.validateWhiteSpaces])
      }),
      address: this.formBuilder.group({
        'country': new FormControl({ value: 'Poland', disabled: true }),
        'streetAddress': new FormControl('', [Validators.required, this.validateWhiteSpaces]),
        'city': new FormControl('', [Validators.required, this.validateWhiteSpaces]),
        'zipCode': new FormControl('', [Validators.required, Validators.pattern('^[0-9]{2}-[0-9]{3}'), this.validateWhiteSpaces])
      })
    });
  }

  validateWhiteSpaces(formControl: FormControl): ValidationErrors | null {
    if ((formControl.value != null) && (formControl.value.trim().length === 0)) {
      return { 'validateWhiteSpaces': true };
    } else {
      return null;
    }
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
