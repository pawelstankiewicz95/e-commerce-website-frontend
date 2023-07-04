import { Component } from '@angular/core';
import { Order } from 'src/app/common/order';
import { ShippingAddress } from 'src/app/common/shipping-address';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent {

  orders: Order[] = [];

  constructor(private orderService: OrderService){}

  ngOnInit(){
    this.getOrders();
  }


  getOrders() {
    this.orderService.getOrders().subscribe({
      next: (response) => this.orders = response,
      error: (error) => console.log(error)
    });
  }

  getDetails(){
   
  }
}
