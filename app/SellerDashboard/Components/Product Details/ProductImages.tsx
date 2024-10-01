import React from 'react'
import { useSelectedProducts } from '../../hooks/ReusableHooks'

export default function ProductImages() {
    const { productSelected } = useSelectedProducts()

    return (
    <>
        <div className='flex gap-5 mt-3'>
            <div className="h-32 w-full xl:w-full rounded-lg bg-cover bg-center" style={{background: productSelected?.images[0] ? `url(${productSelected?.images[0]}) center center / contain no-repeat` : '' }}></div>

            <div className="h-32 w-full xl:w-full rounded-lg bg-cover bg-center" style={{background: productSelected?.images[1] ? `url(${productSelected?.images[1]}) center center / contain no-repeat` : '' }}></div>

            <div className="h-32 w-full xl:w-full rounded-lg bg-cover bg-center" style={{background: productSelected?.images[2] ? `url(${productSelected?.images[2]}) center center / contain no-repeat` : '' }}></div>
        </div>      
    </>
    )
}
