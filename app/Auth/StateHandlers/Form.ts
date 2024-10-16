import { create } from 'zustand'

interface formProps {
    isForm: boolean;
    Email: string;
    Password: string;
    setForm: (isForm: boolean) => void;
    setEmail: (Email: string) => void;
    setPassword: (Password: string) => void;
}

export const useForm = create<formProps>((set)=> ({
    isForm: false, 
    Email: '',
    Password: '',
    setForm: (isForm: boolean) => set(()=> ({ isForm })),
    setEmail: (Email: string) => set(()=> ({ Email })),
    setPassword: (Password: string) => set(()=> ({ Password }))
}))