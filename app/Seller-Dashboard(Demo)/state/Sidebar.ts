import { create } from 'zustand'

interface sidebarProps {
    activeTab: string

    setActiveTab: (activeTab: string) => void
}

export const useSideBarState = create<sidebarProps>((set)=> ({
    activeTab: 'Dashboard',

    setActiveTab: (activeTab: string) => set({ activeTab })
}))