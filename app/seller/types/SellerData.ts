import { create } from 'zustand'
import { SellerData } from './product'
 
interface sellerdataProps {
    seller: SellerData[]
    setData: (seller: SellerData[]) => void
}

export const seller_datas = create<sellerdataProps>((set)=> ({
    seller: [],
    setData: (seller: SellerData[]) => set({ seller })
}))