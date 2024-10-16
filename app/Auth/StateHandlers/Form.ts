import { create } from 'zustand'

interface formProps {
    isForm: boolean;
    setForm: (isForm: boolean) => void;
}

export const useForm = create<formProps>((set)=> ({
    isForm: false, 
    setForm: (isForm: boolean) => set(()=> ({ isForm }))
}))