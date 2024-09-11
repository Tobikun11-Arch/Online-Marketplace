import mongoose, { Document, Model, Types, Schema } from 'mongoose';

export interface IProducts extends Document {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    productName: string;
    productPrice: number;
    description: string;
    images: [];
    category: string;
    condition: string; 
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IProducts>({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }, 
    condition: { type: String, required: true }, 
    images: { type: [], required: true },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
}, { collection: 'Products'});

const Product: Model<IProducts> = mongoose.model<IProducts>('Products', userSchema);

export default Product;