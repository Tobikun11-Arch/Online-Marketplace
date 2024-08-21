// userInterface.ts
import { Types } from 'mongoose';

export interface IUser {
    _id: Types.ObjectId;
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    Role: string;
    isVerifiedEmail: boolean;
    emailToken?: string;
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}