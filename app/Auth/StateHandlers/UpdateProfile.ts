import { create } from 'zustand'

interface NewUser {
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    PetName: string;
    Username: string;
    Email: string;

    setFirstName: (FirstName: string) => void;
    setLastName: (LastName: string) => void;
    setPhoneNumber: (PhoneNumber: string) => void;
    setPetName: (PetName: string) => void;
    setUsername: (Username: string) => void;
    setEmail: (Email: string) => void;
}

export const UpdateProfile = create<NewUser>((set) => ({
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    PetName: '',
    Username: '',
    Email: '',
    setFirstName: (FirstName: string) => set(()=> ({ FirstName })), 
    setLastName: (LastName: string) => set(()=> ({ LastName })), 
    setPhoneNumber: (PhoneNumber: string) => set(()=> ({ PhoneNumber })),
    setPetName: (PetName: string) => set(()=> ({ PetName })),
    setUsername: (Username: string) => set(()=> ({ Username })), 
    setEmail: (Email: string) => set(()=> ({ Email })), 
}))