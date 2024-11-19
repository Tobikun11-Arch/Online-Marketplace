import { create } from 'zustand'

interface authPorps {
    Auth: boolean
    setAuth: (Auth: boolean) => void
}

export const useAuthIdentifier = create<authPorps>((set)=> ({
    Auth: false,
    setAuth: (Auth: boolean) => set(()=> ({ Auth }))
}))