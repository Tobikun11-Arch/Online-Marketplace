import { create } from 'zustand'
import { Types } from 'mongoose';

interface IUser {
    _id: Types.ObjectId;
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    Role: string;
    Username: string;
    isVerifiedEmail: boolean;
    emailToken?: string;
    refreshToken: string;
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}

interface userProps {
    usersdata: IUser | null;
    setuserDetails: (userDetails: IUser) => void;
}

export const useDetails = create<userProps>((set) => ({
    usersdata: null,
    setuserDetails: (usersdata: IUser) => set(() => ({ usersdata })),
}));
