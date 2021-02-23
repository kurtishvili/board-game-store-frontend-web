import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ProductFilter, ProductListItem } from 'src/app/models/product.models';
import { BgsSharedService } from 'src/app/shared/bgs-shared.service';
import { CartService } from '../../cart/cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  pageSizeOptions: SelectItem[] = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' }
  ]

  productsCount: number;

  get lastPageNumber(): number {
    return Math.ceil(this.productsCount / this.filter.pageSize)-1
  }

  options: SelectItem[] = [
    {
      value: 1,
      label: 'Newest Arrivals'
    },
    {
      value: 2,
      label: ' Price : Low To High'
    },
    {
      value: 3,
      label: 'Price : High To Low'
    }
  ];
  filter: ProductFilter = { pageSize: 3, sortOrder: 1, pageNumber: 0 };

  showList: boolean = false;

  products: ProductListItem[] = [];

  constructor(
    private readonly productService: ProductService,
    private readonly sharedService: BgsSharedService,
    private readonly cartService: CartService) { }

  ngOnInit(): void {
    this.getProducts(false);
    this.getProductsCount();
    this.subscribeSubjet();
  }

  changeSortOrder() {
    this.getProducts(false);
  }

  changePageSize() {
    this.filter.pageNumber = 0;
    this.getProducts(false);
  }

  loadMore() {
    this.filter.pageNumber++;
    this.getProducts(true);
  }

  private getProductsCount() {
    this.productService.getProductsCount(this.filter).subscribe(
      response => {
        this.productsCount = response;
      }
    )
  }

  private subscribeSubjet() {
    this.sharedService.productFilter$.subscribe(
      filter => {
        this.filter = { ...this.filter, ...filter }

        this.getProducts(false);
        this.getProductsCount();
      }
    )
  }

  private getProducts(isLoadMore: boolean) {
    this.productService.getProducts(this.filter).subscribe(
      response => {
        if (isLoadMore) {
          this.products.push(...response)
        } else {
          this.products = response;
        }
      });
  }
}
