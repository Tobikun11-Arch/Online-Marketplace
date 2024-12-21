"use client"
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { lineSpinner, ripples } from 'ldrs'
import { Products } from '../../entities/entities'
import { productId, useCart } from '../../axios/dataStore'
import Header from '../../components/layout/Header'
import IdImages from './IdImages'
import SimilarProducts from './SimilarProducts'
import { AddToCartPayload } from '../../Interface/CartItem'
import { useUser } from '../../store/User'
import { useProductCart } from '../../store/productCart'
import { useToast } from "../../../../@/hooks/use-toast"
import { useToggle } from '../../store/useToggle'

const fetchDataId = async (id: string) => {
    const response = await productId.get(`${id}`);
    const { product, mainproduct, similar, trendingproduct } = response.data
    return { product, mainproduct, similar, trendingproduct };
};

const addtoCartRequest = async(payload: AddToCartPayload) => {
    const response = await useCart.post('', payload)
    return response.data
}

const Page = () => {
    const { setAuth } = useToggle()
    const { id } = useParams()
    const [ products, setProducts ] = useState<Products[] | []>([])
    const [ SimilarProduct, setSimilar ] = useState<Products[] | []>([])
    const { setCart } = useProductCart()
    const [ addCart, setAdd ] = useState<boolean>(false)
    const { user } = useUser()
    const { data, isLoading, isError } = useQuery({
        queryKey: ['productId', id],
        queryFn: () => fetchDataId(id as string),
        enabled: !!id, 
    });
    const { toast } = useToast()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            lineSpinner.register()
            ripples.register()
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
        setAdd(true)
        if(!user) { setAdd(false), setAuth(true) }
        else {
            const dataProduct: AddToCartPayload = {
                userId: user._id,
                productName: products.productName,
                images: products.images,
                productId: products._id,
                productPrice: products.productPrice,
                quantity: 1,
            }
            setCart((prevCart: AddToCartPayload[]) => [...prevCart, dataProduct]);
            try{
                await addtoCartRequest(dataProduct);
                toast({
                    description: "Successfully added to cart.",
                })
                setAdd(false)
            } catch (error: any) {
                console.error("Error adding product to cart:", error.message);
                setAdd(false)
            }
        }
    }

    console.log("Product information: ", products)

    const OrigPrice = products.map((product)=> {
        return parseInt(product.productPrice) + parseInt(product.productDiscount)
    })

    return (
        <div className='min-h-screen bg-[#FAFAFA] dark:bg-[#171717] pb-3 cursor-default'>
            <Header/>
            {products.map((product, index)=> (
                <div className="px-4 md:px-5" key={index}>
                    <div className='bg-white border border-[#3333] py-5 dark:bg-[#171717] flex flex-col lg:flex-row'>
                        <div className='w-full lg:w-3/5 Image-layout p-2'>
                            <IdImages products={products}/>
                        </div>

                        <div className='w-full lg:w-2/5 text-black px-7 dark:text-white bg-white dark:bg-[#171717] lg:py-10 py-5'>
                            <h1 className='text-3xl font-bold lg:px-?'>{product.productName}</h1>
                            <div className='flex gap-2'>
                                <h2 className='inline-block text-black font-semibold dark:text-white'>₱{product.productPrice}</h2>
                                <h2 className='inline-block text-black font-semibold dark:text-white'>Stock: {parseInt(product.productQuantity) > 0 ? product.productQuantity : 'Out of stock'}</h2>
                            </div>
                            <h1 className='mt-3 font-bold'>Product size</h1>
                            <div className="flex flex-col text-sm text-gray-700 dark:text-gray-400">
                                <h2>- Breadth (B): {product?.productSize.breadth} cm</h2>
                                <h2>- Length (L): {product?.productSize.length} cm</h2>
                                <h2>- Width (W): {product?.productSize.width} cm</h2>
                            </div>
                            <h1 className='mt-3 font-semibold'>Product description:</h1>
                            <h2 className='text-gray-600 dark:text-gray-300 text-sm'>{product.productDescription}</h2>
                            <p className='mt-10 text-sm text-gray-500'>This item originally retailed for ₱{OrigPrice}</p>
                            <div className="flex w-full xl:w-3/4  font-semibold font-abc gap-2 mt-3">
                                <button className='w-full rounded-lg py-3 text-white dark:text-black dark:etext dark:bg-white bg-[#171717]'>Buy</button> 
                                <button className='w-full rounded-lg py-3 dark:text-white text-black border border-[#333333] bg-transparent min-h-[48px]' onClick={()=> handleCart(product)}>{addCart ? (
                                    <div className='flex items-center justify-center'>
                                        <p>Adding</p>
                                        <l-ripples
                                        size="25"
                                        bg-opacity="0.1"
                                        speed="1.75" 
                                        color="blue" 
                                        ></l-ripples>
                                    </div>
                                ) : 'Add to cart'}</button>  
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