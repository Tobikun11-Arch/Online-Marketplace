import { create } from 'zustand'
import { Product } from '../../types/product'

interface ProductProps {
    isResult: Product[]
    setResult: (isResult: Product[]) => void

    isExport: Product[]
    setExport: (isExport: Product[]) => void
}

export const useProducts = create<ProductProps>((set)=> ({
    isResult: [],
    isExport: [],

    setResult: (isResult: Product[]) => set({ isResult }),
    setExport: (isExport: Product[]) => set({ isExport })
}))