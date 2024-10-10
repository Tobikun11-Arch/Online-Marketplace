import {create} from 'zustand'

interface NavMenuProps {
    selected: string;
    setSelected: (selected: string) => void;
}

export const useNavMenu = create<NavMenuProps>((set) =>({
    selected: 'Home',
    setSelected: (selected: string) => set(()=> ({ selected }))
}))

interface OpenProps {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
}

export const useOpen = create<OpenProps>((set) =>({
    isOpen: false,
    setOpen: (isOpen: boolean) => set(()=> ({ isOpen }))
}))