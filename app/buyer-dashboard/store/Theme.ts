import { create } from 'zustand'

interface ThemeProps {
    theme: string
    setTheme: (theme: string) => void
} 

const getCurrentTheme = (): string => {
    if (typeof window !== "undefined") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
};

export const useTheme = create<ThemeProps>((set)=> ({
    theme: getCurrentTheme(),
    setTheme: (theme: string) => set(()=> ({ theme }))
}))