import React from 'react'
import Input from '../../NewProduct/Prototype/Input'
import { UseProductStore } from '../../hooks/UseHooks'

export default function Pricing() {
    const {
        productDiscount,
        productPrice, 
        setProductPrice, 
        setProductDiscount, 
    } = UseProductStore()

  return (
    <>
        <div className="PackageSize flex gap-2">
                <div>
                    <p className='text-xs text-gray-400'>Price</p>
                    <div className="relative max-w-md">
                        <Input
                        className='w-full bg-white h-10 rounded-lg outline-none border pl-7 border-gray-300'
                        onChange={(e)=> setProductPrice(e.target.value)}
                        value={productPrice}
                        type='text'
                        id=''
                        accept=''
                        style={{}}
                        required={true}
                        placeholder=''
                        />

                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <p className='text-gray-400'>$</p>
                        </div>
                    </div>
                </div>
                
                <div>
                    <p className='text-xs text-gray-400'>Discount Price</p>
                    <div className="relative max-w-md">
                        <Input
                        className='w-full bg-white h-10 rounded-lg outline-none border pl-7 border-gray-300'
                        onChange={(e)=> setProductDiscount(e.target.value)}
                        value={productDiscount}
                        type='text'
                        id=''
                        accept=''
                        style={{}}
                        required={false}
                        placeholder=''
                        />

                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <p className='text-gray-400'>$</p>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}
