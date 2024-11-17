import { create } from 'zustand'

interface SidebarProps {
    isToggle: boolean
    setToggle: (isToggle: boolean) => void

    isCart: boolean
    setCart: (isToggle: boolean) => void

    isAuth: boolean
    setAuth: (isAuth: boolean) => void

}

export const useToggle = create<SidebarProps>((set)=> ({
    isToggle: false, 
    setToggle: (isToggle: boolean) => set(() => ({ isToggle })),

    isCart: false, 
    setCart: (isCart: boolean) => set(() => ({ isCart })),

    isAuth: false,
    setAuth: (isAuth: boolean) => set(() => ({ isAuth }))
}))