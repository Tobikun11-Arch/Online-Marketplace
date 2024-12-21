import React from 'react'
import { useSelectedProducts } from '../../hooks/ReusableHooks'

export default function Size() {
    const { productSelected } = useSelectedProducts()

    return (
    <>
        <h1 className='text-base font-semibold mt-3'>Size</h1>

        <div className='flex gap-2'>
            <p className='bg-gray-200 rounded-sm py-1 px-3 text-sm font-medium font-abc'>{productSelected?.productSize.length} L</p>
            <p className='bg-gray-200 rounded-sm py-1 px-3 text-sm font-medium font-abc'>{productSelected?.productSize.breadth} B</p>
            <p className='bg-gray-200 rounded-sm py-1 px-3 text-sm font-medium font-abc'>{productSelected?.productSize.width} W</p>
        </div>

        <h1 className='text-base font-semibold mt-3'>Descriptions</h1>
        <p className='text-xs text-gray-600'>{productSelected?.productDescription}</p>
    </>
    )
}
