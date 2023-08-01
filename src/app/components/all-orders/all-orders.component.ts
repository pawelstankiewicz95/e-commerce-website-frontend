import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  hasUserName: boolean = false;
  userName: string = '';

  constructor(private orderService: OrderService,
    private route: ActivatedRoute) { }

  ngOnInit() {
  //  this.getOrders();
    this.route.paramMap.subscribe(() => this.handleShowingOrders());
  }

  getOrders() {
    this.orderService.getOrders().subscribe({
      next: (response) => this.orders = response,
      error: (error) => console.log(error)
    });
  }

  public handleShowingOrders() {
    this.hasUserName = this.route.snapshot.paramMap.has('userName');
    if (this.hasUserName) {
      this.getOrdersByUser();
    }
   // if (!(this.hasSearchParameter) && !(this.hasCategoryId)) {
   //   this.getProducts();
  //  }
  }

  public getOrdersByUser() {
    this.userName = this.route.snapshot.paramMap.get('userName')!;
    this.orderService.getOrderByUser(this.userName).subscribe({
      next: (response) => {this.orders = response, console.log(this.userName);
      },
      error: (error) => console.log(error)
    });
  }
}
