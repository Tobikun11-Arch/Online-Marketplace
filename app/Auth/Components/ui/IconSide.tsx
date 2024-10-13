import React from 'react'
import { LucideIcon, Mail } from 'lucide-react'

interface IconSide {
    children: React.ReactNode;
    Icon: LucideIcon;
    color?: string;
    strokeWidth?: number;
    size?: number;
}

const IconSide = ({children, Icon, color, strokeWidth, size}: IconSide) => {
    return (
        <div className="relative w-full">
            {children}
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon size={size} color={color} strokeWidth={strokeWidth}/>
            </div>
        </div>
    )
}

export default IconSide
