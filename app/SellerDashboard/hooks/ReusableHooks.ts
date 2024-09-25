import {create} from 'zustand'
import { Product } from '../types/types'

interface loadingProps {
    isLoadingPublish: boolean;
    isLoadingDiscard: boolean;
    setLoadingPublish: (isLoadingPublish: boolean) => void;
    setLoadingDiscard: (isLoadingDiscard: boolean) => void;
}

export const useLoading = create<loadingProps>((set) => ({
    isLoadingPublish: false,
    isLoadingDiscard: false,
    setLoadingPublish: (isLoadingPublish: boolean) => set(() => ({ isLoadingPublish })),
    setLoadingDiscard: (isLoadingDiscard: boolean) => set(() => ({ isLoadingDiscard }))
}))


interface dataProps {
    dataPass: Product[] | undefined;
    setData: (data: Product[] | undefined) => void;
}

export const useData = create<dataProps>((set) => ({
    dataPass: [],
    setData: (dataPass: Product[] | undefined) => set(() => ({ dataPass }))
}))


