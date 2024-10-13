import React from 'react'
import { LucideIcon, LockKeyhole, EyeOff } from 'lucide-react'

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


export const PasswordInput = ({children, Icon}: IconSide) => {
    return (
        <>
            <div className="relative w-full">
            {children}
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon size={18} color='gray'/>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <EyeOff size={18} color='gray'/>
            </div>
        </div>
        </>
    )
}