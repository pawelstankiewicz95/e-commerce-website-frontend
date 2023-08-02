import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-find-order',
  templateUrl: './find-order.component.html',
  styleUrls: ['./find-order.component.css']
})
export class FindOrderComponent {
  searchForm!: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      query: ['', Validators.required],
      searchType: ['option1']
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.searchForm.value.searchType === 'byCustomer') {
      this.findOrderByCustomerLastName(this.searchForm.value.query);
    } else if (this.searchForm.value.searchType === 'byOrderId') {
      this.findOrderByOrderId(this.searchForm.value.query);
    }
    else if (this.searchForm.value.searchType === 'byUser') {
      this.findOrderByUser(this.searchForm.value.query);
    }
  }


  findOrderByCustomerLastName(name: string) {
    this.router.navigateByUrl(`/find-order/by-customer/${name}`)
  }

  findOrderByOrderId(id: number) {
    this.router.navigateByUrl(`/order-dashboard/find-order/by-id/${id}`)
  }

  findOrderByUser(user: string) {
    this.router.navigateByUrl(`/order-dashboard/find-order/by-user/${user}`)
  }

}
