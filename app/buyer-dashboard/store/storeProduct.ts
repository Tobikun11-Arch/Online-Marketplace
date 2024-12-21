import { create } from 'zustand'
import { Products } from '../entities/entities'

interface productProps {
    product: Products[]
    setProduct: (product: Products[]) => void
}

interface productDetails {
    productImageUrl: string[]
    setUrl: (productImageUrl: string[]) => void
}

export const useProductData = create<productProps>((set)=> ({
    product: [],
    setProduct: (product: Products[]) => set(()=> ({ product }))
}))

export const useProuctDetails = create<productDetails>((set)=> ({
    productImageUrl: [],
    setUrl: (productImageUrl: string[]) => set(()=> ({ productImageUrl }))
}))