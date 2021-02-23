import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/features/cart/cart.service';
import { UserService } from 'src/app/features/user/user.service';
import { CartItem, ProductFilter, ProductListItem } from 'src/app/models/product.models';
import { UserWishlist } from 'src/app/models/user-models';
import { BgsSharedService } from 'src/app/shared/bgs-shared.service';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent {
  @Input()
  product: ProductListItem = {};

  constructor(
    private readonly bgsSharedSerice: BgsSharedService,
    private readonly cartService: CartService,
    private readonly userService: UserService,
    ) { }

  get priceInteger(): number {
    return Math.trunc(this.product.price);
  }
  get priceDecimal(): number {
    return this.product.price * 100 % 100;
  }

  addCartClick() {
    //this.bgsSharedSerice.showNumber.next(this.showNumber);

    this.addToCart(this.product.id);
  }

  addWishlistClick() {
    this.addToWishlist();
  }

  removeWishlistClick() {
    this.removeFromWishlist();
  }

  private removeFromWishlist() {
    this.userService.removeFromWishlist(this.product.id).subscribe(
      response => {
        this.product.isInWishList = false;
      }
    )
  }

 

  private addToWishlist() {
    this.userService.addToWishlist(this.product.id).subscribe(
      response => {
        this.product.isInWishList = true;
      }
    )
  }

  private addToCart(productId: number) {
    this.cartService.addToCart(productId).subscribe(
      response => {

      }
    )
  }
}