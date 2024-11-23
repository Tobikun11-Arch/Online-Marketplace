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