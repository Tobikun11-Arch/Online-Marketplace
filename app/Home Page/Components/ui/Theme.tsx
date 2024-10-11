"use client";

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../../../../@/components/ui/button";

const Theme: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex items-center">
            {theme === 'dark' ? (
                <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setTheme('light')} 
                    className='border-none'
                >
                    <Sun className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Switch to light mode</span>
                </Button>
            ) : (
                <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setTheme('dark')} 
                    className='border-none'
                >
                    <Moon className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Switch to dark mode</span>
                </Button>
            )}
        </div>
    );
};

export default Theme;
