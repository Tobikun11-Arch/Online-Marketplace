import { create } from 'zustand'
import { Products } from '../entities/entities'

interface ProductsProps {
    productList: Products[]
    setProductList: (productList: Products[]) => void
}

export const useProductList = create<ProductsProps>((set)=> ({
    productList: [],
    setProductList: (productList: Products[]) => set(()=> ({ productList }))
}))

