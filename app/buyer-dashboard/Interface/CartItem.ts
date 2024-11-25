import { Types } from "mongoose";

export interface Product {
    _id: string;
    images: string[];
    productName: string;
    productPrice: string;
}

export interface ICartItem {
    user: {
        cart: {
            productId: Types.ObjectId;
            images: string[];
            quantity: number;
            price: number;
            addedAt: Date;
        }[]
    }
}

export interface AddToCartPayload {
    userId: string;
    images: string[];
    productId: string;
    quantity: number;
}

