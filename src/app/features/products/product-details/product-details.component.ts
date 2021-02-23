import { Component, OnInit } from '@angular/core';
import { CartItem, ProductDetails } from 'src/app/models/product.models';
import { BgsSharedService } from 'src/app/shared/bgs-shared.service';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  showNumber: boolean = false;
  product: ProductDetails = {};
  newCommentDescription: string;
  cartItem: CartItem = {};

  currentProductId: number;

  constructor(
    private readonly productService: ProductService,
    private readonly bgsSharedservice: BgsSharedService,
    private readonly cartService: CartService,
    private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentProductId = +this.activatedRoute.snapshot.paramMap.get('productId');

    this.getProductDetails();
  }

  changePrimaryAttachment(attachment){
    this.product.primaryAttachmentUrl=attachment;
  }

  addCommentClick() {
    this.addProductComment();
  }

  cartClick() {
    this.showNumber = true;
    this.bgsSharedservice.cartUpdated.next(this.showNumber);
    this.addToCart(this.product.id);
    
  }

  

  private addToCart(productId: number) {
    this.cartService.addToCart(productId).subscribe(
      response => {
        this.cartItem = response;
      }
    )
  }

  private getProductComments() {
    this.productService.getProductComments(this.currentProductId).subscribe(
      response => {
        this.product.comments = response;
      }
    )
  }

  private addProductComment() {
    this.productService.addProductComment(this.newCommentDescription, this.currentProductId).subscribe(
      response => {
        this.getProductComments();
        this.newCommentDescription = undefined;
      }
    )
  }

  private getProductDetails() {
    this.productService.getProductDetails(this.currentProductId).subscribe(
      response => {
        this.product = response
      }
    )
  }
}
