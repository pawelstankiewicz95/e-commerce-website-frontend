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
  order!: Order;
  hasUserName: boolean = false;
  hasOrderId: boolean = false;
  hasCustomerEmail: boolean = false;
  orderId!: number;
  userName: string = '';
  customerEmail: string = '';
  isNoSuchElementException: boolean = false;


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
    this.hasOrderId = this.route.snapshot.paramMap.has('orderId');
    this.hasCustomerEmail = this.route.snapshot.paramMap.has('customerEmail');
    if (this.hasUserName) {
      this.getOrdersByUser();
    }
    if (this.hasOrderId) {
      this.getOrderById();
    }

    if (this.hasCustomerEmail) {
      this.getOrdersByCustomer();
    }
    if (!(this.hasOrderId) && !(this.hasUserName) && !(this.hasCustomerEmail)) {
      this.getOrders();
    }
  }

  public getOrdersByUser() {
    this.userName = this.route.snapshot.paramMap.get('userName')!;
    this.orderService.getOrderByUser(this.userName).subscribe({
      next: (response) => {
        this.orders = response, console.log(this.userName);
      },
      error: (error) => console.log(error)
    });
  }

  public getOrdersByCustomer() {
    this.customerEmail = this.route.snapshot.paramMap.get('customerEmail')!;
    this.orderService.getOrderByCustomer(this.customerEmail).subscribe({
      next: (response) => {
        this.orders = response, console.log(this.customerEmail);
      },
      error: (error) => console.log(error)
    });
  }

  public getOrderById() {
    this.orderId = +this.route.snapshot.paramMap.get('orderId')!;
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (response) => {
        this.order = response, console.log(this.orderId);
        this.orders.push(this.order);
      },
      error: (error) => {
        this.isNoSuchElementException = this.isNoSuchElementExceptionError(error);
        console.log(error);
        console.log(this.isNoSuchElementException);
        console.log(error.message);
      }
    });
  }

  isNoSuchElementExceptionError(error: any): boolean {
    return error && error.error.message.includes('No value present');
  }
}
