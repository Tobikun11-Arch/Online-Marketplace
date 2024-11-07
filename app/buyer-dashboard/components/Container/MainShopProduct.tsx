import React from 'react'
import { Products } from '../../entities/entities'
import Image from 'next/image'
import ProductInfoCard from '../ui/ProductInfoCard'

interface productProps {
    products: Products[]
    isOpen: boolean
}

const MainShopProduct = ({ products, isOpen } : productProps) => {
    return (
        <div className={`${isOpen ? 'z-10' : ''}`}>
            <div className='w-full h-96 px-4 bg-transparent'>
                {products.map((product)=> (
                    <div key={product._id} className="relative w-full h-full flex flex-col justify-center items-center mb-5 bg-white hover:border-blue-500 rounded-lg border">
                        <div className="relative w-3/4 h-3/4 aspect-w-1 aspect-h-1 hover:scale-105">
                            <Image
                                layout="fill"
                                src={product.images[0]}
                                alt={`${product.productName}`}
                                className="object-contain object-center"
                                placeholder = 'blur' // "empty" | "blur" | "data:image/..."
                                blurDataURL='https://via.placeholder.com/100x100/CCCCCC/FFFFFF?text=Loading'
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MainShopProduct
