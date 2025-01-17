import React from 'react'
import { useSize } from '../../state/add-product-state/Size'

interface SizeProps {
    label: string
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

export default function SizeComponents({ label, onClick }: SizeProps) {
    const { isSize } = useSize()

    return (
        <div className={`h-9 w-9 flex items-center rounded-md text-xs font-normal justify-center hover:bg-[#A0EDA8] ${isSize === label ? 'bg-[#A0EDA8]' : 'bg-[#EFEFEF]'}`} onClick={onClick}>
            {label}
        </div>
    )
}
