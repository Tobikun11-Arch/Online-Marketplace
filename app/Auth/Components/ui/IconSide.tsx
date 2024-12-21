import React from 'react'
import { LucideIcon, EyeOff, Eye } from 'lucide-react'
import { useNewUser } from '../../StateHandlers/RegisterForm';

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
    const { isPasswordVisible, setIsPasswordVisible } = useNewUser() 

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState: boolean) => !prevState);
    };

    return (
        <>
            <div className="relative w-full">
            {children}
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon size={18} color='gray'/>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button type="button" onClick={togglePasswordVisibility}>
                    {isPasswordVisible ? <Eye size={18} color='gray' /> : <EyeOff size={18} color='gray'/>}
                </button>
            </div>
        </div>
        </>
    )
}