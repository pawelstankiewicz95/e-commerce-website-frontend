import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../common/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiServerUrl = 'http://localhost:8082/api/orders'

  constructor(private httpClient: HttpClient) { }

  saveOrder(order: Order): Observable<any> {
    return this.httpClient.post<Order>(this.apiServerUrl, order);
  }

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.apiServerUrl);
  }

  getOrderById(id: number): Observable<Order> {
    return this.httpClient.get<Order>(`${this.apiServerUrl}/id`, { params: { id: id } });
  }

  getOrderByUser(userEmail: string): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.apiServerUrl}/user`, { params: { userEmail: userEmail } });
  }
}
