import { create } from 'zustand'

interface SidebarProps {
    isToggle: boolean
    setToggle: (isToggle: boolean) => void
}

export const useToggle = create<SidebarProps>((set)=> ({
    isToggle: false, 
    setToggle: (isToggle: boolean) => set(() => ({ isToggle }))
}))