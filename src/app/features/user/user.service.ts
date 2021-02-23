import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/core/http/http.service';
import { ChangeUserPassword, UploadUserAvatarResponseModel, UserAccount, UserAddress, UserAttachment, UserDetails, UserOrderItem, UserPaymentDetails, UserWishlist } from 'src/app/models/user-models';

const apiBaseUrlUser = "http://localhost:56902/api/User";
const apiBaseUrlWishlist = "http://localhost:56902/api/wishlist";
const apiBaseUrlOrder = "http://localhost:56902/api/order";
@Injectable()
export class UserService {

    constructor(private readonly httpService: HttpService) { }

    getUserAccount() {
        return this.httpService.get<UserAccount>(`${apiBaseUrlUser}/getAccount`)
            .pipe(map(
                response => {
                    if (response.paymentDetails) {
                        const cardNumbers = response.paymentDetails.cardNumber.match(/.{1,4}/g);

                        response.paymentDetails.cardNumber1 = cardNumbers[0];
                        response.paymentDetails.cardNumber2 = cardNumbers[1];
                        response.paymentDetails.cardNumber3 = cardNumbers[2];
                        response.paymentDetails.cardNumber4 = cardNumbers[3];
                    }

                    return response;
                }
            ))
    }

    saveUserDetails(userDetails: UserDetails) {
        return this.httpService.post<UserDetails>(`${apiBaseUrlUser}/saveDetails`, userDetails, true)
    }



    addUserBalance(balance: number) {
        return this.httpService.post<number>(`${apiBaseUrlUser}/addBalance`, balance, true)
    }

    getUserBalance() {
        return this.httpService.get<number>(`${apiBaseUrlUser}/getBalance`)
    }



    saveUserAddress(userAddress: UserAddress) {
        return this.httpService.post<UserAddress>(`${apiBaseUrlUser}/saveUserAddress`, userAddress, true)
    }



    saveUserPaymentDetails(userPayment: UserPaymentDetails) {
        const requestParams = {
            ...userPayment,
            cardNumber: userPayment.cardNumber1 + userPayment.cardNumber2 + userPayment.cardNumber3 + userPayment.cardNumber4
        }
        return this.httpService.post<UserPaymentDetails>(`${apiBaseUrlUser}/savePaymentDetails`, requestParams, true)
    }

    uploadUserAvatar(file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.httpService.post<UploadUserAvatarResponseModel>(`${apiBaseUrlUser}/uploadUserAvatar`, formData, true)
    }

    changeUserPassword(password: ChangeUserPassword) {
        return this.httpService.post<ChangeUserPassword>(`${apiBaseUrlUser}/changeUserPassword`, password, true)
    }

    removeAvatar() {
        return this.httpService.post(`${apiBaseUrlUser}/removeAvatar`)
    }

    getWishlistItems() {
        return this.httpService.get<UserWishlist[]>(`${apiBaseUrlWishlist}/getWishlistItems`)
    }

    addToWishlist(productId: number) {
        return this.httpService.post<number>(`${apiBaseUrlWishlist}/addToWishlist`, productId)
    }
    removeFromWishlist(productId: number) {
        return this.httpService.post<number>(`${apiBaseUrlWishlist}/removeFromWishlist`, productId)
    }

    getOrderItems(pageNumber: number, pageSize: number) {
        const params = {
            pageNumber,
            pageSize
        }
        return this.httpService.get<UserOrderItem[]>(`${apiBaseUrlOrder}/getOrders`, params)
    }

    getOrdersCount() {
        return this.httpService.get<number>(`${apiBaseUrlOrder}/getOrdersCount`)
    }


}

