import { create } from 'zustand';

interface User {
    _id: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    PetName: string;
    Email: string;
    Password: string;
    Role: string;
    Username: string;
    SearchData: string[];
    isVerifiedEmail: boolean;
    emailToken?: string; // Optional field
    refreshToken: string;
    createdAt: string;
    updatedAt: string;
    draftProducts: any[]; // Replace `any` with a specific type if available
    sellerProducts: any[]; // Replace `any` with a specific type if available
    __v: number;
}

interface UserProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const useUser = create<UserProps>((set) => ({
    user: null,
    setUser: (user: User | null) => set(() => ({ user })),
}));