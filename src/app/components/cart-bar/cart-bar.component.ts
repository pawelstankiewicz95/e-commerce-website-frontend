import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-bar',
  templateUrl: './cart-bar.component.html',
  styleUrls: ['./cart-bar.component.css']
})
export class CartBarComponent implements OnInit{

  totalCartValue: number = 0.00;
  totalQuantityOfProducts: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(){
    this.getCartValues();
  }

  getCartValues() {
    this.cartService.totalCartValue.subscribe((response: number) => this.totalCartValue = response);
    this.cartService.totalQuantityOfProducts.subscribe((response: number) => this.totalQuantityOfProducts = response);
  }

}
