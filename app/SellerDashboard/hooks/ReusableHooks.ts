import {create} from 'zustand'

interface loadingProps {
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;
}

export const useLoading = create<loadingProps>((set) => ({
    isLoading: false,
    setLoading: (isLoading: boolean) => set(() => ({ isLoading }))
}))

