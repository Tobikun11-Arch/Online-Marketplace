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
    emailToken: { type: String, required: false}
}, { collection: 'Accounts'});


userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.Password);
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;