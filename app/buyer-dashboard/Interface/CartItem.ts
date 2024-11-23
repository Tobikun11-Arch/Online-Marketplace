export interface Product {
    _id: string;
    productName: string;
    productPrice: string;
}

export interface AddToCartPayload {
    userId: string;
    productId: string;
    quantity: number;
}