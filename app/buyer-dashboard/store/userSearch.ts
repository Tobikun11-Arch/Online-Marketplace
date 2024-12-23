import { create } from 'zustand'

interface SearchProps {
    search: string
    setSearch: (search: string) => void
}

export const useSearch = create<SearchProps>((set)=> ({
    search: '',
    setSearch: (search: string) => set(()=> ({ search }))
}))