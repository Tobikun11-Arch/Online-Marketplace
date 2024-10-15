import { create } from 'zustand'

interface NewUser {
    FirstName: string;
    LastName: string;
    Username: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    isPasswordVisible: boolean;
    Role: string;

    setFirstName: (FirstName: string) => void;
    setLastName: (LastName: string) => void;
    setUsername: (Username: string) => void;
    setEmail: (Email: string) => void;
    setPassword: (Password: string) => void;
    setConfirmPassword: (ConfirmPassword: string) => void;
    setIsPasswordVisible: (value: boolean | ((prevState: boolean) => boolean)) => void;
    setRole: (Role: string) => void;
}

export const useNewUser = create<NewUser>((set) => ({
    FirstName: 'First Name',
    LastName: 'Last Name',
    Username: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    isPasswordVisible: false,
    Role: '',
    setFirstName: (FirstName: string) => set(()=> ({ FirstName })), 
    setLastName: (LastName: string) => set(()=> ({ LastName })), 
    setUsername: (Username: string) => set(()=> ({ Username })), 
    setEmail: (Email: string) => set(()=> ({ Email })), 
    setPassword: (Password: string) => set(()=> ({ Password })), 
    setConfirmPassword: (ConfirmPassword: string) => set(()=> ({ ConfirmPassword })),
    setIsPasswordVisible: (value: boolean | ((prevState: boolean) => boolean)) => 
        set((state) => ({ 
            isPasswordVisible: typeof value === 'function' ? value(state.isPasswordVisible) : value 
        })),
        setRole: (Role: string) => set(()=> ({ Role })),
}))