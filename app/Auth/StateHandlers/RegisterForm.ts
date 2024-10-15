import { create } from 'zustand'

interface NewUser {
    FirstName: string;
    LastName: string;
    Username: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;

    setFirstName: (FirstName: string) => void;
    setLastName: (LastName: string) => void;
    setUsername: (Username: string) => void;
    setEmail: (Email: string) => void;
    setPassword: (Password: string) => void;
    setConfirmPassword: (ConfirmPassword: string) => void;
}

export const useNewUser = create<NewUser>((set) => ({
    FirstName: 'First Name',
    LastName: 'Last Name',
    Username: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    setFirstName: (FirstName: string) => set(()=> ({ FirstName })), 
    setLastName: (LastName: string) => set(()=> ({ LastName })), 
    setUsername: (Username: string) => set(()=> ({ Username })), 
    setEmail: (Email: string) => set(()=> ({ Email })), 
    setPassword: (Password: string) => set(()=> ({ Password })), 
    setConfirmPassword: (ConfirmPassword: string) => set(()=> ({ ConfirmPassword }))// add more fields as required
}))