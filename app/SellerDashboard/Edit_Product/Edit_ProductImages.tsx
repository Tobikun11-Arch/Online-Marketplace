import React from 'react'
import { useSelectedProducts } from '../hooks/ReusableHooks'

export default function Edit_ProductImages() {
    const { productSelected } = useSelectedProducts()
    const product = productSelected?.images

    return (
    <>
        <div className='w-full flex gap-1'>
        <div className="h-52 w-full xl:w-full bg-cover bg-center p-2">
                {productSelected?.images[0] ? (
                    <div
                    style={{
                        background: `url(${product?.[0]}) center center / contain no-repeat`,
                    }}
                    className="h-full w-full"
                    ></div>
                ) : (
                    <div className="h-full w-full bg-gray-300 animate-pulse"></div> 
                )}
            </div>

            <div className='h-52 w-5/12'>
                <div className="h-2/4 w-full xl:w-full bg-cover bg-center p-2">
                    {productSelected?.images[1] ? (
                        <div
                        style={{
                            background: `url(${product?.[1]}) center center / contain no-repeat`,
                        }}
                        className="h-full w-full"
                        ></div>
                    ) : (
                        <div className="h-full w-full bg-gray-300 animate-pulse"></div> 
                    )}
                </div>

                <div className="h-2/4 w-full xl:w-full bg-cover bg-center p-2">
                    {productSelected?.images[2] ? (
                        <div
                        style={{
                            background: `url(${product?.[2]}) center center / contain no-repeat`,
                        }}
                        className="h-full w-full"
                        ></div>
                    ) : (
                        <div className="h-full w-full bg-gray-300 animate-pulse"></div> 
                    )}
                </div>
            </div>
        </div>
    </>
    )
}
