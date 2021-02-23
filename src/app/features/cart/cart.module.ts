import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { BgsSharedModule } from 'src/app/shared/bgs-shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartService } from './cart.service';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    CartComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    BgsSharedModule,
    CartRoutingModule
  ],
  providers: [
    CartService
  ]
})
export class CartModule { }