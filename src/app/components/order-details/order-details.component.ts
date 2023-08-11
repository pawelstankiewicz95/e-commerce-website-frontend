import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/common/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {

  order!: Order;
  hasOrderId: boolean = false;
  orderId: number = 0;

  constructor(private orderService: OrderService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.handleShowingOrderDetails();
  }


  public handleShowingOrderDetails() {
    this.hasOrderId = this.route.snapshot.paramMap.has('id');
    if (this.hasOrderId) {
      this.getOrderById();
    }
  }
  public getOrderById() {
    this.orderId = +this.route.snapshot.paramMap.get('id')!;
    this.orderService.getOrderById(this.orderId).subscribe((response: Order) => this.order = response);
  }
}
