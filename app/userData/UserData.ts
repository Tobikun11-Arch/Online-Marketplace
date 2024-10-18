import { create } from 'zustand'


interface userProps {
    usersdata: string[];
    setuserDetails: (userDetails: string[]) => void;
}

export const useDetails = create<userProps>((set)=> ({
    usersdata: [],
    setuserDetails: (usersdata: string[]) => set(()=> ({ usersdata }))
}))