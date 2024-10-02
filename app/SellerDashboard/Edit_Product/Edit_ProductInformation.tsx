import React from 'react'
import { useSelectedProducts } from '../hooks/ReusableHooks'
import Input from '../NewProduct/Prototype/Input'

export default function Edit_ProductInformation() {
    const { productSelected } = useSelectedProducts()

    return (
    <>
        <div className='w-full flex gap-1 mt-4'>

            <div className='h-52 w-full pl-2'>
                <input type="text" 
                className='border bg-white outline-none w-full text-black font-semibold h-8 pl-2'
                value={productSelected?.productName || []}
                />
            </div>

            <div className='h-52 w-full pl-2 pr-2'>
                <input type="text" 
                className='border bg-white outline-none text-black w-full font-semibold h-8 pl-2'
                value={`$${productSelected?.productPrice || []}`}
                />
            </div>

        </div>
    </>
    )
}
