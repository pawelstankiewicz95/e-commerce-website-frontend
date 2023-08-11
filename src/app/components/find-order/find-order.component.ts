import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-find-order',
  templateUrl: './find-order.component.html',
  styleUrls: ['./find-order.component.css']
})
export class FindOrderComponent {
  searchForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      query: ['', this.getRequiredValidator('byCustomer')], // Corrected this line
      searchType: ['byCustomer']
    });
  }

  onSubmit() {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }
    const searchType = this.searchForm.value.searchType;
    const query = this.searchForm.value.query;
    if (searchType === 'byCustomer') {
      this.findOrderByCustomerLastName(query);
    } else if (searchType === 'byOrderId') {
      this.findOrderByOrderId(query);
    }
    else if (searchType === 'byUser') {
      this.findOrderByUser(query);
    }
  }

  onChange() {
    const searchType = this.searchForm.value.searchType;
    const validators = this.getRequiredValidator(searchType);

    this.query!.setValidators(validators);
    this.query!.reset();
  }

  getRequiredValidator(type: string): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (type === 'byCustomer' || type === 'byUser') {
      validators.push(Validators.required);
    }
    if (type === 'byOrderId') {
      validators.push(Validators.required, this.numberValidator());
    }

    
    return validators;
  }

  numberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^\d+$/.test(control.value);
      return valid ? null : { 'numberInvalid': true };
    };
  }


  findOrderByCustomerLastName(name: string) {
    this.router.navigateByUrl(`/order-dashboard/find-order/by-customer/${name}`)
  }

  findOrderByOrderId(id: number) {
    this.router.navigateByUrl(`/order-dashboard/find-order/by-id/${id}`)
  }

  findOrderByUser(user: string) {
    this.router.navigateByUrl(`/order-dashboard/find-order/by-user/${user}`)
  }

  get query() {
    return this.searchForm.get('query');
  }

}
