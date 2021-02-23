import { Injectable } from "@angular/core";
import { of, Subject } from 'rxjs';
import { HttpService } from 'src/app/core/http/http.service';
import { Artist, Designer, Mechanic } from 'src/app/models/categories.model';
import { CommentModel } from 'src/app/models/comment.model';
import { ProductCategory, ProductDetails, ProductFilter, ProductListItem } from 'src/app/models/product.models';

const apiBaseUrl = "http://localhost:56902/api/product"

@Injectable()
export class ProductService {

    constructor(private readonly httpService: HttpService) { }

    getProductCategories() {
        return this.httpService.get<ProductCategory[]>(`${apiBaseUrl}/getProductCategories`)
    }

    getProducts(filter: ProductFilter) {
        return this.httpService.get<ProductListItem[]>(`${apiBaseUrl}/getProducts`, filter)
    }

    getProductDetails(productId: number) {
        return this.httpService.get<ProductDetails>(`${apiBaseUrl}/getProductDetails`, { productId })
    }

    getProductStock(productId: number) {
        return this.httpService.get(`${apiBaseUrl}/getProductStock`, { productId })
    }

    getProductComments(productId: number) {
        return this.httpService.get<CommentModel[]>(`${apiBaseUrl}/getComments`, { productId })
    }

    addProductComment(description: string, productId: number) {
        const params = { description, productId }
        return this.httpService.post<CommentModel>(`${apiBaseUrl}/addComment`, params)
    }

    getProductsCount(filter: ProductFilter) {
        return this.httpService.get<number>(`${apiBaseUrl}/getProductsCount`, filter)
       
    }



}