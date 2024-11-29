import { create } from 'zustand'

interface User {
    _id: string;
    FirstName: string;
    LastName: string;
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