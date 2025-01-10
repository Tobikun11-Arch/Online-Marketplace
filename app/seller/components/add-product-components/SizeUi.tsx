import React from 'react'
import SizeComponents from './Size'
import { useSize } from '../../state/add-product-state/Size'

export default function SizeUi() {
    const { setSize } = useSize()

    return (
        <div className='flex gap-2 mt-1'>
            <SizeComponents
            label='XS'
            onClick={()=> setSize('XS')}
            />

            <SizeComponents
            label='S'
            onClick={()=> setSize('S')}
            />

            <SizeComponents
            label='M'
            onClick={()=> setSize('M')}
            />

            <SizeComponents
            label='XL'
            onClick={()=> setSize('XL')}
            />

            <SizeComponents
            label='XXL'
            onClick={()=> setSize('XXL')}
            />

            <SizeComponents
            label='N/A'
            onClick={()=> setSize('N/A')}
            />
        </div>
    )
}
