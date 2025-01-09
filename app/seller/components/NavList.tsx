import React from 'react'
import { LucideProps } from 'lucide-react'; 
type IconType = React.ComponentType<LucideProps>;

interface NavProps {
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined
    icon: IconType
    label: string
}

export default function NavList({ onClick, icon: Icon, label }: NavProps) {
    return (
        <div className='flex items-center gap-2 hover:text-blue-700 text-sm' onClick={onClick}>
            <Icon size={20}/>
            <h2>{label}</h2>
        </div>
    )
}
