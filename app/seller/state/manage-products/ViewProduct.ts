import { create } from 'zustand'

interface ViewProps {
    product_id: string
    setProductId: (product_id: string) => void
}

export const useProductId = create<ViewProps>((set)=> ({
    product_id: '',
    setProductId: (product_id: string) => set({ product_id })
}))