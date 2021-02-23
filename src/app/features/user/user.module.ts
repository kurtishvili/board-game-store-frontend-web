import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserWishlistComponent } from './user-wishlist/user-wishlist.component';
import { UserRoutingModule } from './user-routing-module';
import { BgsSharedModule } from 'src/app/shared/bgs-shared.module';
import { UserService } from './user.service';
import { UserWishlistItemComponent } from './user-wishlist/user-wishlist-item/user-wishlist-item.component';



@NgModule({
  declarations: [
    UserAccountComponent,
    UserOrdersComponent,
    UserWishlistComponent,
    UserWishlistItemComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    BgsSharedModule 
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
