import React from 'react'
import { Products } from '../../entities/entities'
import Image from 'next/image'
import ProductInfoCard from '../ui/ProductInfoCard'
import { useProuctDetails } from '../../store/storeProduct'

interface productProps {
    isOpen: boolean
}

const MainShopProduct = ({ isOpen } : productProps) => {
    const imgParent = 'relative w-full h-full flex flex-col justify-center items-center mb-5 md:mb-0 bg-white hover:border-blue-500 rounded-lg border'
    const imgSubParent = 'relative w-3/4 h-3/4 aspect-w-1 aspect-h-1 hover:scale-105'
    const { productImageUrl } = useProuctDetails()

    return (
        <div className={`${isOpen && 'z-10'}`}>
            <div className='w-full h-96 md:h-[500px] px-4 bg-transparent md:flex md:gap-5'>
                    <div className={imgParent}>
                        <div className={imgSubParent}>
                            <Image
                                layout="fill"
                                src={productImageUrl[0]}
                                alt={`image 1`}
                                className="object-contain object-center"
                                placeholder = 'blur' // "empty" | "blur" | "data:image/..."
                                blurDataURL='add new url later'
                            />
                        </div>
                    </div>

                    <div className='w-full h-full md:flex md:flex-col md:gap-3'>
                    <div className={imgParent}>
                        <div className={imgSubParent}>
                            <Image
                                layout="fill"
                                src={productImageUrl[1]}
                                alt={`image 1`}
                                className="object-contain object-center"
                                placeholder = 'blur' // "empty" | "blur" | "data:image/..."
                                blurDataURL='add new url later'
                            />
                        </div>
                    </div>

                    <div className={imgParent}>
                        <div className={imgSubParent}>
                            <Image
                                layout="fill"
                                src={productImageUrl[2]}
                                alt={`image 1`}
                                className="object-contain object-center"
                                placeholder = 'blur' // "empty" | "blur" | "data:image/..."
                                blurDataURL='add new url later'
                            />
                        </div>
                    </div>
                    </div>
            </div>
        </div>
    )
}

export default MainShopProduct
