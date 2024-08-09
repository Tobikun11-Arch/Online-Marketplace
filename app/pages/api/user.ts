import mongoose, { Document, Model, Types } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
    _id: Types.ObjectId;
    Name: string;
    Email: string;
    Password: string;
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
}, { collection: 'Accounts'});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.Password);
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;