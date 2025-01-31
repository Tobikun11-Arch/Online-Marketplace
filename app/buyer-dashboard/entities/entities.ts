export interface Products {
    _id: string
  userId: string
  productName: string
  status: string
  productDescription: string
  productCategory: string
  productQuality: string
  productQuantity: string
  Sku: string
  productSize: {
    length: string
    breadth: string
    width: string
  }
  productPrice: string
  productDiscount: string
  productWeight: {
    Weight: string
    WeightIndicator: string
  }
  images: string[] // Assuming images are URLs, use array of strings
  ScheduleDate: {
    TimePublish: string
    DatePublish: string
  },
  Featured: string
  createdAt: Date
  updatedAt: Date
}

export interface Product {  
  _id: string;
  productId?: string;
  Sku: string;
  price?: number;
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
  quantity: number;
  status: string;
}

export interface PopularProducts {
  
}