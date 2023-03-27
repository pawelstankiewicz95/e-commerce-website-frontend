import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  chechkoutFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.chechkoutFormGroup = this.formBuilder.group({
      coustomer: this.formBuilder.group({
        'firstName': new FormControl('', [Validators.required]),
        'lastName': new FormControl('',Validators.required),
        'phoneNumber': new FormControl('',[Validators.required, Validators.minLength(9)]),
        'email': new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')])
      }),
      address: this.formBuilder.group({
        'streetAddress': new FormControl('', [Validators.required]),
        'city': new FormControl('',Validators.required),
        'zipCode': new FormControl('',[Validators.required, Validators.pattern('^[0-9]{2}-[0-9]{3}')])
      })
    })
  }

}
