import { create } from 'zustand'

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
    isVerifiedEmail: boolean;
    refreshToken: string;
    __v: number;
}

interface userProps {
    user: User | null
    setuser: (user: User | null) => void
}

export const useUser = create<userProps>((set)=> ({
    user: null,
    setuser: (user: User | null) => set(()=> ({ user }))
}))

interface CartProps {
    CartLength: number
    setCartLength: (CartLength: number) => void
}   

export const useUserCart = create<CartProps>((set)=> ({
    CartLength: 0,
    setCartLength: (CartLength: number) => set(()=> ({ CartLength }))
}))



//isBuyer 
interface isBuyerProps {
    isBuyer: boolean
    setBuyer: (isBuyer: boolean) => void
}

export const useBuyer = create<isBuyerProps>((set)=> ({
    isBuyer: false,
    setBuyer: (isBuyer: boolean) => set(()=> ({ isBuyer }))
}))



//user Form e.g edit profile form and settings
interface formProps {
    opEditProfile: boolean
    setEdit: (opEditProfile: boolean) => void
}

export const useUserForms = create<formProps>((set)=> ({
    opEditProfile: false,
    setEdit: (opEditProfile: boolean) => set(()=> ({ opEditProfile })),
}))