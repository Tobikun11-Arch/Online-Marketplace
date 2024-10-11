"use client"
import React from 'react'
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "../../../../@/components/ui/button"

const Theme = () => {
    const { theme, setTheme } = useTheme()

    return (
        <div className="flex items-center">
        {theme === 'dark' ? (
            <Button variant="outline" size="icon" onClick={() => setTheme('light')} className='border-none'>
            <Sun className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Switch to light mode</span>
            </Button>
        ) : (
            <Button variant="outline" size="icon" onClick={() => setTheme('dark')} className='border-none'>
            <Moon className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Switch to dark mode</span>
            </Button>
        )}
        </div>
    )
}

export default Theme
