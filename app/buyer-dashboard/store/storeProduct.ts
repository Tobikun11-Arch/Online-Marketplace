import { create } from 'zustand'
import { Products } from '../entities/entities'

interface productProps {
    product: Products[]
    setProduct: (product: Products[]) => void
}

export const useProductData = create<productProps>((set)=> ({
    product: [],
    setProduct: (product: Products[]) => set(()=> ({ product }))
}))