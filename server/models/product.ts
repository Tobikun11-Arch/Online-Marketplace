import mongoose, { Document, Model, Types, Schema } from 'mongoose';

export interface IProducts extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  productName: string;
  productDescription: string;
  productCategory: string;
  productQuality: string;
  productQuantity: string;
  Sku: string;
  productSize: {
    length: string;
    breadth: string;
    width: string;
  };
  productPrice: string;
  productDiscount: string;
  productWeight: {
    Weight: string;
    WeightIndicator: string;
  };
  images: string[]; // Assuming images are URLs, use array of strings
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProducts>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    productCategory: { type: String, required: true },
    productQuality: { type: String, required: true },
    productQuantity: { type: String, required: true },
    Sku: { type: String, required: false },
    productSize: {
      length: { type: String, required: true },
      breadth: { type: String, required: true },
      width: { type: String, required: true }
    },
    productPrice: { type: String, required: true },
    productDiscount: { type: String, required: true },
    productWeight: {
        Weight: { type: String, required: true },
        WeightIndicator: { type: String, required: true },
    },
    images: { type: [String], required: true }, // Array of image URLs
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { collection: 'Products' }
);

const Product: Model<IProducts> = mongoose.model<IProducts>('Products', productSchema);

export default Product;
