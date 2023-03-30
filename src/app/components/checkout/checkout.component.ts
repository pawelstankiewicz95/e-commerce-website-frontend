import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.checkoutFormGroup = this.formBuilder.group({
      coustomer: this.formBuilder.group({
        'firstName': new FormControl('', Validators.required),
        'lastName': new FormControl('', Validators.required),
        'phoneNumber': new FormControl('',[Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')]),
        'email': new FormControl('',[Validators.required, Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)])
      }),
      address: this.formBuilder.group({
        'streetAddress': new FormControl('', [Validators.required]),
        'city': new FormControl('',Validators.required),
        'zipCode': new FormControl('',[Validators.required, Validators.pattern('^[0-9]{2}-[0-9]{3}')])
      })
    })
  }
  get firstName(){
    return this.checkoutFormGroup.get('coustomer.firstName');
  }

  get lastName(){
    return this.checkoutFormGroup.get('coustomer.lastName');
  }

  get phoneNumber(){
    return this.checkoutFormGroup.get('coustomer.phoneNumber');
  }

  get email(){
    return this.checkoutFormGroup.get('coustomer.email');
  }

  get streetAddress(){
    return this.checkoutFormGroup.get('address.streetAddress');
  }

  get city(){
    return this.checkoutFormGroup.get('address.city');
  }

  get zipCode(){
    return this.checkoutFormGroup.get('address.zipCode');
  }
}
