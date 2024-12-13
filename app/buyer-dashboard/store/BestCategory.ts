import { create } from 'zustand'

interface CategoryProps {
    bestcategory: string
    setCategory: (bestcategory: string) => void
}

export const useCategory = create<CategoryProps>((set)=> ({
    bestcategory: '',
    setCategory: (bestcategory: string) => set(()=> ({ bestcategory }))
}))