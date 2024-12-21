export interface Product {
    productName: string;
    description: string;
    images: File[];
    productPrice: string;
    productStatus: string;
    productQuantity: string;
    createdAt: Date;
    productDiscount: string;
    Featured: string;
    productQuality: string;
    productCategory: string | null;
    productSize: {
        length: string;
        breadth: string;
        width: string;
    }
    productDescription: string;
    Sku: string;
    productweight: {
        Weight: string;
        WeightIndicator: string;
    }
    productId: string;
}