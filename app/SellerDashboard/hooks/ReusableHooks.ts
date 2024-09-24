import {create} from 'zustand'
import { Product } from '../types/types'

// interface Products {
//     productLists: Product[]
// }

interface loadingProps {
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;
}

export const useLoading = create<loadingProps>((set) => ({
    isLoading: false,
    setLoading: (isLoading: boolean) => set(() => ({ isLoading }))
}))


interface dataProps {
    dataPass: Product[] | undefined;
    setData: (data: Product[] | undefined) => void;
}

export const useData = create<dataProps>((set) => ({
    dataPass: [],
    setData: (dataPass: Product[] | undefined) => set(() => ({ dataPass }))
}))