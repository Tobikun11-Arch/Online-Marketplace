import React from 'react'
import Input from '../../NewProduct/Prototype/Input'
import { UseProductStore } from '../../hooks/UseHooks'



export default function PackageSize() {
    const {
       productSize,
       setProductSize
    } = UseProductStore()

  return (
    <>
        <div className="PackageSize flex gap-2">
                <div>
                    <p className='text-xs text-gray-400'>Length</p>
                    <div className="relative max-w-md"> 
                        <Input
                        className='w-full pl-2 bg-white h-10 rounded-lg outline-none border pr-7 border-gray-300'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductSize('length', e.target.value)}
                        type='text'
                        id=''
                        accept=''
                        style={{}}
                        required={true}
                        placeholder=''
                        value={productSize.length}
                        />

                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <p className='text-gray-400'>in</p>
                        </div>
                    </div>
                </div>

                <div>
                    <p className='text-xs text-gray-400'>Breadth</p>
                    <div className="relative max-w-md">
                        <Input
                        className='w-full pl-2 bg-white h-10 rounded-lg outline-none border pr-7 border-gray-300'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductSize('breadth', e.target.value)}
                        type='text'
                        id=''
                        accept=''
                        style={{}}
                        required={true}
                        placeholder=''
                        value={productSize.breadth}
                        />

                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <p className='text-gray-400'>in</p>
                        </div>
                    </div>
                </div>

                <div>
                    <p className='text-xs text-gray-400'>Width</p>
                    <div className="relative max-w-md">
                        <Input
                            className='w-full pl-2 bg-white h-10 rounded-lg outline-none border pr-7 border-gray-300'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductSize('width', e.target.value)}
                            type='text'
                            id=''
                            accept=''
                            style={{}}
                            required={true}
                            placeholder=''
                            value={productSize.width}
                        />

                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <p className='text-gray-400'>in</p>
                        </div>

                    </div>
                </div>
            </div>
    </>
  )
}
