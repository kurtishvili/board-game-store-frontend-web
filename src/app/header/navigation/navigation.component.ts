import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { AuthorizationService } from 'src/app/core/authorization/authorization-service';
import { CartService } from 'src/app/features/cart/cart.service';
import { ProductService } from 'src/app/features/products/product.service';
import { ProductFilter } from 'src/app/models/product.models';
import { BgsSharedService } from 'src/app/shared/bgs-shared.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  categories: SelectItem[] = [];

  filter: ProductFilter = {};

  cartItemCount: number = 0;

  constructor(
    private readonly productService: ProductService,
    private readonly sharedService: BgsSharedService,
    private readonly cartService: CartService) { }

  ngOnInit(): void {
    this.getProdcutCategories();
    this.getCartItemsCount();
    this.sharedService.cartUpdated$.subscribe(
      response => {
        this.getCartItemsCount();
      }
    )
  }

  private getCartItemsCount() {
    this.cartService.getCartItemsCount().subscribe(
      response => {
        this.cartItemCount = response;
      }
    )
  }

  searchClick() {
    this.sharedService.productFilter.next(this.filter);
  }

  changeCategory() {
    this.sharedService.productFilter.next(this.filter)
  }

  private getProdcutCategories() {
    this.productService.getProductCategories().subscribe(
      response => {
        this.categories = response.map(c => {
          return <SelectItem>{
            value: c.id,
            label: c.name
          }
        })
      }
    )
  }

}
