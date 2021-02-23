import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductService } from './product.service';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { BgsSharedModule } from 'src/app/shared/bgs-shared.module';
import { Categoryservice } from './category-service';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListItemComponent } from './product-list/product-list-item/product-list-item.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartService } from '../cart/cart.service';
import { UserService } from '../user/user.service';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductFilterComponent,
    ProductListComponent,
    ProductListItemComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    BgsSharedModule
  ],
  providers: [
    ProductService,
    Categoryservice,
    CartService,
    UserService
  ]
})
export class ProductsModule { }
