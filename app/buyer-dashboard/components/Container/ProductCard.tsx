import React, { useEffect } from 'react'
import { Products } from '../../entities/entities'
import Image from 'next/image'

interface products {
    product: Products[]
}

const ProductCard = ({ product }: products) => {

    return (
        <>
            {product.map((prodTest) => (
                <div key={prodTest._id}>
                    <div className='relative w-full h-80 flex flex-col justify-center items-center md:mb-0 bg-white dark:bg-black hover:border-blue-500 rounded-lg border'>
                        <div className='relative w-3/4 h-3/4 aspect-w-1 aspect-h-1 hover:scale-105'>
                            <Image
                                fill
                                src={prodTest?.images[0]}
                                alt={`image 1`}
                                className="object-contain object-center"
                                placeholder = 'blur' 
                                blurDataURL='add new url later'
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ProductCard
