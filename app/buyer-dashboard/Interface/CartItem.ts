import { Types } from "mongoose";

export interface Product {
    _id: string;
    images: string[];
    productName: string;
    productPrice: number;
}

export interface ICartItem {
    user: {
        cart: {
            productId?: Types.ObjectId;
            productName: string
            images: string[];
            quantity: number;
            price: number;
            addedAt?: Date;
        }[]
    }
}

export interface AddToCartPayload {
    userId: string;
    productName: string
    images: string[];
    productId: string;
    productPrice: number
    quantity: number;
}