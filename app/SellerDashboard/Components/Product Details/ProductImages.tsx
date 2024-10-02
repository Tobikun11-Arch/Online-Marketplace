import React from 'react'
import { useSelectedProducts } from '../../hooks/ReusableHooks'

export default function ProductImages() {
    const { productSelected } = useSelectedProducts()

    return (
    <>
        <div className='flex gap-5 mt-3'>
            <div className="h-32 w-full xl:w-full rounded-lg bg-cover bg-center">
                {productSelected?.images[0] ? (
                    <div
                    style={{
                        background: `url(${productSelected?.images[0]}) center center / contain no-repeat`,
                    }}
                    className="h-full w-full rounded-lg"
                    ></div>
                ) : (
                    <div className="h-full w-full bg-gray-300 animate-pulse rounded-lg"></div> 
                )}
            </div>

            <div className="h-32 w-full xl:w-full rounded-lg bg-cover bg-center">
                {productSelected?.images[1] ? (
                    <div
                    style={{
                        background: `url(${productSelected?.images[1]}) center center / contain no-repeat`,
                    }}
                    className="h-full w-full rounded-lg"
                    ></div>
                ) : (
                    <div className="h-full w-full bg-gray-300 animate-pulse rounded-lg"></div>
                )}
            </div>

            <div className="h-32 w-full xl:w-full rounded-lg bg-cover bg-center">
                {productSelected?.images[2] ? (
                    <div
                    style={{
                        background: `url(${productSelected?.images[2]}) center center / contain no-repeat`,
                    }}
                    className="h-full w-full rounded-lg"
                    ></div>
                ) : (
                    <div className="h-full w-full bg-gray-300 animate-pulse rounded-lg"></div>
                )}
            </div>
        </div>      
    </>
    )
}
