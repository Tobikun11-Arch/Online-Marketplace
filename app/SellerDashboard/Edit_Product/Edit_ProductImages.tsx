import React, { useEffect } from 'react'
import { useProductDetails } from '../hooks/EditProduct'
import { useSelectedProducts } from '../hooks/ReusableHooks'

export default function Edit_ProductImages() {
    const { productImages, setProductImages } = useProductDetails()
    const { productSelected } = useSelectedProducts()

    useEffect(()=> {
        setProductImages(productSelected?.images || []);
    }, [productSelected])

    return (
    <>
        <div className='flex sm:flex-col gap-1 sm:gap-3 p-2  w-full sm:w-2/5'>
                {productImages[0] ? (
                    <div
                    style={{
                        background: `url(${productImages[0]}) center center / contain no-repeat`,
                    }}
                    className="h-64 sm:h-full w-full"
                    ></div>
                ) : (
                    <div className="h-full w-full bg-gray-300 animate-pulse"></div> 
                )}

                {/* Side image */}
                <div className='h-64 sm:h-full w-2/5 sm:w-full sm:flex sm:flex-row flex flex-col gap-2'>
                    {productImages[1] ? (
                        <div
                        style={{
                            background: `url(${productImages[1]}) center center / contain no-repeat`,
                        }}
                        className="h-3/4 w-full"
                        ></div>
                    ) : (
                        <div className="h-full w-full bg-gray-300 animate-pulse"></div> 
                    )}

                    {productImages[2] ? (
                        <div
                        style={{
                            background: `url(${productImages[2]}) center center / contain no-repeat`,
                        }}
                        className="h-3/4 w-full"
                        ></div>
                    ) : (
                        <div className="h-full w-full bg-gray-300 animate-pulse"></div> 
                    )}
                </div>

        </div>
    </>
    )
}
