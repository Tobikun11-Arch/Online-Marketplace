import mongoose, { Document, Model, Types } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    _id: Types.ObjectId;
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    Role: string;
    Username: string;
    isVerifiedEmail: boolean;
    emailToken?: string;
    refreshToken: string
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Role: { type: String, required: true },
    Username: { type: String, required: true },
    isVerifiedEmail: { type: Boolean, default: false, required: true},
    emailToken: { type: String, required: false},
    refreshToken: { type: String, required: false }
}, { collection: 'SellerAccounts'});


userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.Password);
};

const User = (role: string): Model<IUser> => {
    const collectionName = role === 'buyer' ? 'BuyerAccounts' : 'SellerAccounts'
    return mongoose.model<IUser>('User', userSchema, collectionName)
}

export default User;