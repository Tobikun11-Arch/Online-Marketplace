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
        <div className='w-full flex gap-1'>
        <div className="h-52 w-full xl:w-full bg-cover bg-center py-2">
                {productImages[0] ? (
                    <div
                    style={{
                        background: `url(${productImages[0]}) center center / contain no-repeat`,
                    }}
                    className="h-full w-full"
                    ></div>
                ) : (
                    <div className="h-full w-full bg-gray-300 animate-pulse"></div> 
                )}
            </div>

            <div className='h-52 w-5/12'>
                <div className="h-2/4 w-full xl:w-full bg-cover bg-center p-2">
                    {productImages[1] ? (
                        <div
                        style={{
                            background: `url(${productImages[1]}) center center / contain no-repeat`,
                        }}
                        className="h-full w-full"
                        ></div>
                    ) : (
                        <div className="h-full w-full bg-gray-300 animate-pulse"></div> 
                    )}
                </div>

                <div className="h-2/4 w-full xl:w-full bg-cover bg-center p-2">
                    {productImages[2] ? (
                        <div
                        style={{
                            background: `url(${productImages[2]}) center center / contain no-repeat`,
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
