import { create } from 'zustand'
import { Product } from '../entities/entities'

interface productProps {
    product: Product[]
    handler: Product[]

    setProduct: (product: Product[]) => void
    setHandler: (handler: Product[]) => void
}

interface productDetails {
    productImageUrl: string[]
    setUrl: (productImageUrl: string[]) => void
}

export const useProductData = create<productProps>((set)=> ({
    product: [],
    handler: [],

    setProduct: (product: Product[]) => set(()=> ({ product })),
    setHandler: (handler: Product[]) => set(()=> ({ handler }))
}))

export const useProuctDetails = create<productDetails>((set)=> ({
    productImageUrl: [],
    setUrl: (productImageUrl: string[]) => set(()=> ({ productImageUrl }))
}))