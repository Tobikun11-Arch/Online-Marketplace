import { Types } from 'mongoose';
export interface OrderItem {
    productId: Types.ObjectId;
    productName: string;
    images: string[]; // An array of image URLs
    quantity: number;
    price: number;
    _id: Types.ObjectId;
    addedAt: Date;
}

export interface Order_History {
    Order_Items: OrderItem[];
}