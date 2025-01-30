import { create } from 'zustand'
import { Product } from '../entities/entities'

interface ProductsProps {
    productList: Product[]
    setProductList: (productList: Product[]) => void

    mainShopProducts: Product[]
    setmainShopProducts: (mainShopProducts: Product[]) => void
}

export const useProductList = create<ProductsProps>((set)=> ({
    productList: [],
    setProductList: (productList: Product[]) => set(()=> ({ productList })),

    mainShopProducts: [],
    setmainShopProducts: (mainShopProducts: Product[]) => set(()=> ({ mainShopProducts }))
}))