import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpService } from 'src/app/core/http/http.service';
import { CartItem } from 'src/app/models/product.models';
import { BgsSharedService } from 'src/app/shared/bgs-shared.service';

const apiBaseUrl = "http://localhost:56902/api/cart"
const apiBaseUrlOrder = "http://localhost:56902/api/order"


@Injectable()
export class CartService {

    constructor(
        private readonly httpService: HttpService,
        private readonly bgsSharedService: BgsSharedService) { }

    getCartItems() {
        return this.httpService.get<CartItem[]>(`${apiBaseUrl}/getCartItems`)
    }

    getCartItemsCount() {
        return this.httpService.get<number>(`${apiBaseUrl}/getCartItemsCount`)
    }

    addToCart(productId: number) {
        return this.httpService.post<CartItem>(`${apiBaseUrl}/addToCart`, productId, true).pipe(tap(
            response => {
                this.bgsSharedService.cartUpdated.next();
            }
        ))
    }

    deleteFromCart(cartItemId: number) {
        return this.httpService.post<number>(`${apiBaseUrl}/deleteFromCart`, cartItemId, true).pipe(tap(
            response => {
                this.bgsSharedService.cartUpdated.next();
            }
        ))
    }

    updateCartItemQuantity(cartItemId: number, quantity: number) {
        const requestParams = {
            id: cartItemId,
            quantity: quantity
        }
        return this.httpService.post<CartItem>(`${apiBaseUrl}/updateCartItemQuantity`, requestParams, true)
    }

    placeOrder() {
        return this.httpService.post(`${apiBaseUrlOrder}/placeOrder`, {}, true).pipe(tap(
            response => {
                this.bgsSharedService.cartUpdated.next();
            }))
    }
}