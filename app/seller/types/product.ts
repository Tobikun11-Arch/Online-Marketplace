export interface Product {
    _id: string;
    Sku: string;
    createdAt: string;
    updatedAt: string;
    images: string[]; // Array of image URLs
    productCategory: string;
    productDescription: string;
    productDiscount: number;
    productName: string;
    productPrice: number;
    productQuality: string;
    productSize: string;
    productStock: number;
    status: string;
}

export interface ProductQuantity {
    productId: string;
    totalQuantity: number;
}

export interface tableData {
    _id: string;
    productName: string;
    productPrice: number;
    status: string;
    images: string
}

export interface InventoryData {
    _id: string;
    Sku: string;
    createdAt: string;
    updatedAt: string;
    images: string;
    productCategory: string;
    productDescription: string;
    productDiscount: number;
    productName: string;
    productPrice: number;
    productQuality: string;
    productSize: string;
    productStock: number;
    status: string;
}