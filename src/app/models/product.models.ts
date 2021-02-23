import { ProductSort } from '../enums/product-sort.order';
import { CommentModel } from './comment.model';

export interface ProductCategory {
    id?: number;
    name?: string;
}

export interface ProductDetails {
    id?: number;
    name?: string;
    price?: number;
    stock?: number;
    description?: string;
    attachments?: string[];
    primaryAttachmentUrl?: string;
    comments?: CommentModel[];
}

export interface ProductFilter {
    priceFrom?: number;
    priceTo?: number;
    artistId?: number;
    designerId?: number;
    mechanicsId?: number;
    categoryId?: number;
    name?: string;
    pageSize?: number;
    pageNumber?: number;
    sortOrder?: ProductSort;
}

export interface ProductListItem {
    id?: number;
    primaryAttachmentUrl?: string;
    category?: string;
    name?: string;
    price?: number;
    stock?: number;
    artist?: string;
    desigener?: string;
    mechanics?: string;
    isInWishList?: boolean;
}

export interface CartItem {
    id?: number;
    primaryAttachmentUrl?: string;
    name?: string;
    price?: number;
    quantity?: number;
}