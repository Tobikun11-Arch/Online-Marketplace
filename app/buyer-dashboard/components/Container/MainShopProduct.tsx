import React from 'react'
import Image from 'next/image'
import ProductInfoCard from '../ui/ProductInfoCard'
import { useProuctDetails } from '../../store/storeProduct'
import { useProductList } from '../../store/products'
import Link from 'next/link'
import TrendingProduct from './TrendingProduct'
import BestCategory from './BestCategory'
interface productProps {
    isOpen: boolean
}

const MainShopProduct = ({ isOpen } : productProps) => {
    const imgParent = 'relative w-full h-96 md:h-[500px] flex flex-col justify-center items-center md:mb-0 bg-white dark:bg-transparent dark:border-[#333333] hover:border-blue-500 rounded-lg border'
    const imgSubParent = 'relative w-3/4 h-3/4 aspect-w-1 aspect-h-1 hover:scale-105'
    const { productImageUrl } = useProuctDetails()
    const { mainShopProducts } = useProductList()

    return (
        <>
            <div className={`${isOpen && 'z-10'} px-5 md:px-10 mt-5 xl:px-16 pb-5 md:flex md:gap-5`}>
                    <div className={`${imgParent} mb-5 lg:w-3/5`}>
                        <div className={imgSubParent}>
                            <Link href={`/buyer-dashboard/product/${mainShopProducts[2]?._id}`} passHref>
                                {productImageUrl[2] && (
                                    <Image
                                        fill
                                        src={productImageUrl[2]}
                                        alt={`image 1`}
                                        className="object-contain object-center"
                                        placeholder = 'blur' 
                                        blurDataURL='add new url later'
                                    />
                                )}
                            </Link>
                        </div>
                        <ProductInfoCard dataProduct={{ productName: mainShopProducts[2]?.productName, OriginalPrice: parseInt(mainShopProducts[2]?.productPrice) }}/>
                    </div>

                <div className='w-full h-full md:h-[500px] md:flex md:flex-col md:gap-3 lg:w-2/5'>
                    <div className={`${imgParent} mb-5`}>
                        <div className={imgSubParent}>
                            <Link href={`/buyer-dashboard/product/${mainShopProducts[1]?._id}`} passHref>
                                {productImageUrl[1] && (
                                    <Image
                                        fill
                                        src={productImageUrl[1]}
                                        alt={`top product 2`}
                                        className="object-contain object-center"
                                        placeholder = 'blur' // "empty" | "blur" | "data:image/..."
                                        blurDataURL='add new url later'
                                    />
                                )} 
                            </Link>
                        </div>
                        <ProductInfoCard dataProduct={{ productName: mainShopProducts[1]?.productName, OriginalPrice: parseInt(mainShopProducts[1]?.productPrice) }}/>
                    </div>

                    <div className={`${imgParent}`}>
                        <div className={imgSubParent}>
                            <Link href={`/buyer-dashboard/product/${mainShopProducts[0]?._id}`} passHref>
                                {productImageUrl[0] && (
                                    <Image
                                        fill
                                        src={productImageUrl[0]}
                                        alt={`top products 3`}
                                        className="object-contain object-center"
                                        placeholder = 'blur' // "empty" | "blur" | "data:image/..."
                                        blurDataURL='add new url later'
                                    />
                                )}
                            </Link>
                        </div>
                        <ProductInfoCard dataProduct={{ productName: mainShopProducts[0]?.productName, OriginalPrice: parseInt(mainShopProducts[0]?.productPrice) }}/>
                    </div>
                </div>
            </div>
            <div className='px-5 md:px-10 xl:px-16 pb-10 pt-10'>
                <BestCategory/>
                <TrendingProduct/> 
            </div>
        </>
    )
}

export default MainShopProduct
