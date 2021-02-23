import { Component, OnInit } from '@angular/core';
import { UserWishlist } from 'src/app/models/user-models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-wishlist',
  templateUrl: './user-wishlist.component.html',
  styleUrls: ['./user-wishlist.component.scss']
})
export class UserWishlistComponent implements OnInit {

  wishlistItems: UserWishlist[] = [];

  constructor(
    private readonly userService: UserService) { }

  ngOnInit(): void {
    this.getWishlistItems();
  }  

  private getWishlistItems() {
    this.userService.getWishlistItems().subscribe(
      response => {
        this.wishlistItems = response;
      }
    )
  }

  removeFromWishlist(productId: number) {
    this.userService.removeFromWishlist(productId).subscribe(
      response => {
        this.getWishlistItems();
      }
    )
  }

}
