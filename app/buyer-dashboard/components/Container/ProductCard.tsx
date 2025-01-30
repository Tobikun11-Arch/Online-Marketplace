import React, { useEffect } from 'react'
import { Product } from '../../entities/entities'
import Image from 'next/image'
import Link from 'next/link'
import ProductInfoCard from '../ui/ProductInfoCard'
interface products {
    product: Product[]
}

const ProductCard = ({ product }: products) => {

    return (
        <>
            {product.map((prodTest, index) => (
                <Link href={`/buyer-dashboard/product/${prodTest._id}`} passHref key={index}>
                    {prodTest.productStock > 0  && (
                        <div className='relative w-full h-80 flex flex-col cursor-default justify-center items-center md:mb-0 bg-white dark:bg-transparent dark:border-[#333333] hover:border-blue-500 rounded-lg border'>
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
                            <ProductInfoCard dataProduct={{ productName: prodTest.productName, OriginalPrice: prodTest.productPrice }}/>
                        </div>
                    )}
                </Link>
            ))}
        </>
    )
}

export default ProductCard
