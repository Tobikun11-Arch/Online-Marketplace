import { create } from 'zustand'

interface sidebarProps {
    activeTab: string
    mainTab: string

    setActiveTab: (activeTab: string) => void
    setMainTab: (mainTab: string) => void
}

export const useSideBarState = create<sidebarProps>((set)=> ({
    activeTab: 'Dashboard',
    mainTab: '',

    setActiveTab: (activeTab: string) => set({ activeTab }),
    setMainTab: (mainTab: string) => set({ mainTab })
}))