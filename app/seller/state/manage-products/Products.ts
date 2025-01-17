import { create } from 'zustand'
import { Product } from '../../types/product'

interface ProductProps {
    isResult: Product[]
    setResult: (isResult: Product[]) => void
}

export const useProducts = create<ProductProps>((set)=> ({
    isResult: [],
    setResult: (isResult: Product[]) => set({ isResult })
}))