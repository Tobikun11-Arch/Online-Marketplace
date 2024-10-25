import { create } from 'zustand'

interface tokenProps {
    isToken: boolean;
    setToken: (isToken: boolean) => void
}

export const useTokenValidation = create<tokenProps>((set)=> ({
    isToken: false,
    setToken: (isToken: boolean) => set(()=> ({ isToken }))
}))