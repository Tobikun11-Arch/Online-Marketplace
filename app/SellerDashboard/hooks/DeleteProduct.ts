import { create } from "zustand"
import { Product } from '../types/types'

interface DeleteProps {
    selectedProducts: Product[];
    setSelectedProducts: (selectedProducts: Product[]) => void;
}

export const useDelete = create<DeleteProps>((set) => ({
    selectedProducts: [],
    setSelectedProducts: (selectedProducts: Product[]) => set(()=> ({ selectedProducts }))
}))