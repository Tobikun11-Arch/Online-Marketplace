"use client"
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { lineSpinner } from 'ldrs'
import { Products } from '../../entities/entities'
import { productId } from '../../axios/dataStore'
import Header from '../../components/layout/Header'
import IdImages from './IdImages'
import SimilarProducts from './SimilarProducts'

const fetchDataId = async (id: string) => {
    const response = await productId.get(`${id}`);
    const { product, mainproduct, similar, trendingproduct } = response.data
    return { product, mainproduct, similar, trendingproduct };
};

const Page = () => {
    const { id } = useParams()
    const [ products, setProducts ] = useState<Products[] | []>([])
    const [ SimilarProduct, setSimilar ] = useState<Products[] | []>([])
    const { data, isLoading, isError } = useQuery({
        queryKey: ['productId', id],
        queryFn: () => fetchDataId(id as string),
        enabled: !!id, 
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            lineSpinner.register()
        }
    }, [])

    useEffect(()=> {
        if (data) {
            const productData = data.product || data.mainproduct || data.trendingproduct;
            setProducts((prev) => [...prev, productData]);
            setSimilar(data.similar)
        }
    }, [data])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#171717] dark:bg-[#171717]">
                <l-line-spinner
                size="50"
                bg-opacity="0.1"
                speed="1.75" 
                color="white" 
                ></l-line-spinner>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#171717] dark:bg-[#171717]">
                <h2 className='text-red-700 font-bold'>failed to fetch</h2>
            </div>
        )
    }

    const handleCart = async(products: Products) => {
        console.log("Products added to card: ", products)
    }

    const OrigPrice = products.map((product)=> {
        return parseInt(product.productPrice) + parseInt(product.productDiscount)
    })
    const prodSize = 'text-sm inline-block mt-1 rounded-3xl py-2 px-4 dark:bg-gray-800 border bg-gray-500 text-white'

    return (
        <div className='min-h-screen bg-[#FAFAFA] dark:bg-[#171717] pb-3 cursor-default'>
            <Header/>
            {products.map((product, index)=> (
                <div className="px-4 md:px-5" key={index}>
                    <div className='bg-white border-2 py-5 dark:bg-black flex flex-col lg:flex-row'>
                        <div className='w-full lg:w-3/5 Image-layout p-2'>
                            <IdImages products={products}/>
                        </div>

                        <div className='w-full lg:w-2/5 text-black px-7 dark:text-white bg-white dark:bg-black lg:py-10 py-5'>
                            <h1 className='text-3xl font-bold lg:px-?'>{product.productName}</h1>
                            <div className='flex items-center gap-2 mt-1'>
                                <h2 className='inline-block text-white rounded-full py-2 px-5 bg-blue-700'>₱{product.productPrice} php</h2>
                            </div>
                            <hr className='mt-5 xl:w-3/4 border-black border'/>
                            <h1 className='mt-3 font-bold'>Size</h1>
                            <div className="flex gap-2">
                                <h2 className={`${prodSize}`}>B {product?.productSize.breadth}</h2>
                                <h2 className={`${prodSize}`}>L {product?.productSize.length}</h2>
                                <h2 className={`${prodSize}`}>W {product?.productSize.width}</h2>
                            </div>
                            <h1 className='mt-3'>Product description:</h1>
                            <h2 className='text-gray-600 dark:text-gray-300 text-sm'>{product.productDescription}</h2>
                            <p className='mt-10 text-sm text-gray-500'>This item originally retailed for ₱{OrigPrice}</p>
                            <div className="flex w-full xl:w-3/4  font-semibold font-abc gap-2">
                                <button className='mt-2 w-full rounded-lg py-3 text-white dark:text-black dark:etext dark:bg-white bg-black'>Buy</button> 
                                <button className='mt-2 w-full rounded-lg py-3 dark:text-white text-black border border-[#333333] bg-transparent' onClick={()=> handleCart(product)}>Add to cart</button>             
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <SimilarProducts products={SimilarProduct}/>
        </div>
    )
}

export default Page
