import React, { FC } from 'react'
import { Product } from '../../entities/entities'
import Image from 'next/image'
import ProductInfoCard from '../../components/ui/ProductInfoCard'
import Link from 'next/link'

interface similarProps {
    products: Product[]
}

const SimilarProducts: FC<similarProps> = ({ products }) => {
    return (
        <div className='px-4 md:px-5 mt-6 pb-4'>
            <h1 className='text-3xl font-bold '>Similar Products</h1>
            <div className="w-full flex items-center gap-4 overflow-x-auto overflow-y-hidden pb-3">
                {products.map((product, index)=> (
                    <Link href={`/buyer-dashboard/product/${product._id}`} passHref key={index}>
                        <div className='relative'>
                            <div className="relative min-w-[18rem] w-72 h-96 sm:w-80 border rounded-lg cursor-pointer mt-3 bg-white dark:bg-[#3333]">
                                <Image
                                    fill
                                    src={product.images[0]}
                                    alt={`${product.productName}`}
                                    className="object-contain object-center p-5 aspect-w-1 aspect-h-1"
                                    placeholder="blur"
                                    blurDataURL="add new url later"
                                />
                            </div>
                            <ProductInfoCard dataProduct={{ productName: product.productName, OriginalPrice: product.productPrice - (product.productPrice * (product.productDiscount / 100)) }}/>
                        </div>
                    </Link>
                ))}
            </div>
            
        </div>  
    )
}

export default SimilarProducts
