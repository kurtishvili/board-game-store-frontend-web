import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { CartItem } from 'src/app/models/product.models';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];

  get totalAmount() {
    return this.cartItems.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
  }

  constructor(
    private readonly cartService: CartService,
    private readonly router: Router,
    private readonly confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getCartItems();

  }

  placeOrderClick() {
    debugger
    this.confirmationService.confirm({
      header: 'Place Order',
      message: 'Do you really want to order?',
      accept: () => {
        this.placeOrder();
      }})
  }

  private placeOrder() {
    this.cartService.placeOrder().subscribe(
      response => {
        this.router.navigate(['user', 'orders'])
      }
    )
  }

  deleteCartItem(cartItemId: number) {
    this.cartService.deleteFromCart(cartItemId).subscribe(
      response => {
        this.getCartItems();
      }
    )
  }



  private getCartItems() {
    this.cartService.getCartItems().subscribe(
      response => {
        this.cartItems = response;
      }
    )
  }
}
