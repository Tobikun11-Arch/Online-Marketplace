import { create } from 'zustand'

interface SidebarProps {
    isToggle: boolean
    setToggle: (isToggle: boolean) => void
}

export const useToggle = create<SidebarProps>((set)=> ({
    isToggle: true, //change it to false if done in sidebar mobile view
    setToggle: (isToggle: boolean) => set(() => ({ isToggle }))
}))