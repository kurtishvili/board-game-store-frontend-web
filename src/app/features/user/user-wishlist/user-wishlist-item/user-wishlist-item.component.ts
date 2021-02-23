import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserWishlist } from 'src/app/models/user-models';

@Component({
  selector: 'app-user-wishlist-item',
  templateUrl: './user-wishlist-item.component.html',
  styleUrls: ['./user-wishlist-item.component.scss']
})
export class UserWishlistItemComponent implements OnInit {

  @Output()
  onDelete: EventEmitter<number> = new EventEmitter();

  @Input()
  wishlist: UserWishlist = {}

  constructor() { }

  ngOnInit(): void {
  }

  deleteClick() {
    this.onDelete.next(this.wishlist.productId)
  }

}
