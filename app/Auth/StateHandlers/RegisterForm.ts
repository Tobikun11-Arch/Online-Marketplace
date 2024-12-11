import { create } from 'zustand'

interface NewUser {
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    PetName: string;
    Username: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    isPasswordVisible: boolean;
    Role: string;
    emailSent: boolean;

    setFirstName: (FirstName: string) => void;
    setLastName: (LastName: string) => void;
    setPhoneNumber: (PhoneNumber: string) => void;
    setPetName: (PetName: string) => void;
    setUsername: (Username: string) => void;
    setEmail: (Email: string) => void;
    setPassword: (Password: string) => void;
    setConfirmPassword: (ConfirmPassword: string) => void;
    setIsPasswordVisible: (value: boolean | ((prevState: boolean) => boolean)) => void;
    setRole: (Role: string) => void;
    sentMail: (emailSent: boolean) => void;
}

export const useNewUser = create<NewUser>((set) => ({
    FirstName: 'First Name',
    LastName: 'Last Name',
    PhoneNumber: '+18005551234',
    PetName: 'Your pet name',
    Username: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    isPasswordVisible: false,
    Role: '',
    emailSent: false,
    setFirstName: (FirstName: string) => set(()=> ({ FirstName })), 
    setLastName: (LastName: string) => set(()=> ({ LastName })), 
    setPhoneNumber: (PhoneNumber: string) => set(()=> ({ PhoneNumber })),
    setPetName: (PetName: string) => set(()=> ({ PetName })),
    setUsername: (Username: string) => set(()=> ({ Username })), 
    setEmail: (Email: string) => set(()=> ({ Email })), 
    setPassword: (Password: string) => set(()=> ({ Password })), 
    setConfirmPassword: (ConfirmPassword: string) => set(()=> ({ ConfirmPassword })),
    setIsPasswordVisible: (value: boolean | ((prevState: boolean) => boolean)) => 
        set((state) => ({ 
            isPasswordVisible: typeof value === 'function' ? value(state.isPasswordVisible) : value 
        })),
        setRole: (Role: string) => set(()=> ({ Role })),
    sentMail: (emailSent: boolean) => set(()=> ({ emailSent })), 
}))