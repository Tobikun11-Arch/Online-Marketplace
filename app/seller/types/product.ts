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

export interface SellerData {
    productcount: number;
    ordercount: number;
    buyercount: number;
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

export interface Product_Orders {
    productId: string;
    productName: string;
    images: string;
    quantity: number;
    price: number;
    _id: string;
    addedAt: string; // Using string to represent the ISO date format
};
  
export interface BuyerInformation {
    buyer_firstName: string;
    buyer_lastName: string;
    buyer_email: string;
    buyer_username: string;
    total_purchases: number;
};
  