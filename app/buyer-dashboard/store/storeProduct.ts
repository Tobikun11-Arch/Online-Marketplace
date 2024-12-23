import { create } from 'zustand'
import { Products } from '../entities/entities'

interface productProps {
    product: Products[]
    handler: Products[]

    setProduct: (product: Products[]) => void
    setHandler: (handler: Products[]) => void
}

interface productDetails {
    productImageUrl: string[]
    setUrl: (productImageUrl: string[]) => void
}

export const useProductData = create<productProps>((set)=> ({
    product: [],
    handler: [],

    setProduct: (product: Products[]) => set(()=> ({ product })),
    setHandler: (handler: Products[]) => set(()=> ({ handler }))
}))

export const useProuctDetails = create<productDetails>((set)=> ({
    productImageUrl: [],
    setUrl: (productImageUrl: string[]) => set(()=> ({ productImageUrl }))
}))