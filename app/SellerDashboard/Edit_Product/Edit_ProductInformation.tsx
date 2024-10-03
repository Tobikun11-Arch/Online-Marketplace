import React, { useState } from 'react'
import { useSelectedProducts } from '../hooks/ReusableHooks'
import Condition from '../Components/Product Management/Condition'
import Category from '../Components/Common/Category'

export default function Edit_ProductInformation() {
    const { productSelected } = useSelectedProducts()
    const [ condition, setCondition ] = useState(productSelected?.productQuality)
    const [ category, setProductCategory ] = useState(productSelected?.productCategory)

    return (
    <>
        <div className='w-full flex gap-1 mt-4'>

            <div className='h-52 w-full pl-2'>
                <input type="text" 
                className='border bg-white outline-none w-full text-black font-semibold h-8 pl-2'
                value={productSelected?.productName || ''}
                />

                <Condition
                className= 'border-slate-300 border text-black mt-2 h-8 pl-1 bg-white w-full'
                onChange={(e)=> setCondition(e.target.value)}
                value={condition || ''}
                />

                <Category
                className='border-slate-300 border text-black mt-2 h-8 pl-1 bg-white w-full'
                onChange={(e)=> setProductCategory(e.target.value)}
                value={category || ''}
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
