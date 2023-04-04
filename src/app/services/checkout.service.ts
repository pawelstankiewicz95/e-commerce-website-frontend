import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private apiServerUrl = 'http://localhost:8082/api/purchase'

  constructor(private httpClient: HttpClient) { }

  saveOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.apiServerUrl, purchase);
  }
}
