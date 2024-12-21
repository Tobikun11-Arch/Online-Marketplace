import React, { FC } from 'react'

interface categoryProps {
    children: React.ReactNode
}

const ProductCategory: FC<categoryProps> = ({children}) => {
    return (
        <div className='flex flex-col gap-10 border dark:border-[#333333] pt-8 pl-8 pr-3 cursor-default bg-white dark:bg-[#171717] text-card-foreground shadow w-full h-48 rounded-lg transition-colors dark:hover:bg-muted/25 hover:bg-muted/25'>
            {children}
        </div>
    )
}

export default ProductCategory
