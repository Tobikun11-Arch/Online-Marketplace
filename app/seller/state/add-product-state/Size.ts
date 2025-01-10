import { create } from 'zustand'

interface SizeProps {
    isSize: string
    setSize: (isSize: string) => void
}

export const useSize = create<SizeProps>((set)=> ({
    isSize: 'XS',
    setSize: (isSize: string) => set({ isSize })
}))