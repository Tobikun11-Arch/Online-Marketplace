"use client"
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { lineSpinner, ripples, ring2 } from 'ldrs'
import { Product } from '../../entities/entities'
import { productId, useCart } from '../../axios/dataStore'
import Header from '../../components/layout/Header'
import IdImages from './IdImages'
import SimilarProducts from './SimilarProducts'
import { AddToCartPayload } from '../../Interface/CartItem'
import { useUser } from '../../store/User'
import { useProductCart } from '../../store/productCart'
import { useToast } from "../../../../@/hooks/use-toast"
import { useToggle } from '../../store/useToggle'
import { loadStripe } from '@stripe/stripe-js';
import { StripePayment } from '../../axios/dataStore'

const fetchDataId = async (id: string) => {
    const response = await productId.get(`${id}`);
    const { product, mainproduct, similar } = response.data
    return { product, mainproduct, similar };
};

const addtoCartRequest = async(payload: AddToCartPayload) => {
    const response = await useCart.post('', payload)
    return response.data
}

const Page = () => {
    const { setAuth } = useToggle()
    const [ isBuy, setBuy ] = useState<boolean>(false)  
    const { id } = useParams()
    const [ products, setProducts ] = useState<Product[] | []>([])
    const [ SimilarProduct, setSimilar ] = useState<Product[] | []>([])
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
            ring2.register()
        }
    }, [])

    useEffect(()=> {
        if (data) {
            setProducts([data.product])
            setSimilar(data.similar)
        }
    }, [data])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#171717]">
                <l-line-spinner
                size="30"
                bg-opacity="0.1"
                speed="1.75" 
                color="blue" 
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

    const handleCart = async(products: Product) => { 
        setAdd(true)
        if(!user) { setAdd(false), setAuth(true) }
        else {
            const dataProduct: AddToCartPayload = {
                userId: user._id,
                productName: products.productName,
                images: products.images,
                productId: products.productId || products._id,
                productPrice: products.productPrice - (products.productPrice * (products.productDiscount / 100)),
                quantity: 1,
            }
            setCart((prevCart: AddToCartPayload[]) => [...prevCart, dataProduct]);
            try{
                await addtoCartRequest(dataProduct);
                toast({
                    description: "Successfully added to cart.",
                    className: "text-white"
                })  
                setAdd(false)
            } catch (error: any) {
                console.error("Error adding product to cart:", error.message);
                setAdd(false)
            }
        }
    }

    const handle_DirectBuy = async(products: Product[]) => {
        if(!user) { 
            setAdd(false)
            setAuth(true) 
            return
        }
        setBuy(true)
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPEAPI!)
        try {
            const response = await StripePayment.post('', {products, userId: user?._id}, {withCredentials: true})
            stripe!.redirectToCheckout({
                sessionId: response.data.id
            })
            setBuy(false)
        } catch (error) {
            console.error("Failed to fetch: ", error)
        }
    }

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
                            <h2 className='inline-block text-black font-semibold dark:text-white'>
                                {(product.productPrice - (product.productPrice * (product.productDiscount / 100))).toFixed(2)}
                            </h2>
                                <h2 className='inline-block text-black font-semibold dark:text-white'>Stock: {product.productStock > 0 ? product.productStock : 'Out of stock'}</h2>
                            </div>
                            {product.productDiscount > 0 && <p className='text-sm text-gray-500'>This item originally retailed for ${product.productPrice}</p>}
                            <div className='flex gap-1 items-center mt-3'>
                                <h1 className='font-bold'>Product size: </h1>
                                <h5>{product.productSize}</h5>
                            </div>
                            <h1 className='mt-3 font-semibold'>Product description:</h1>
                            <h2 className='text-gray-600 dark:text-gray-300 text-sm'>{product.productDescription}</h2>
                            <div className="flex w-full xl:w-3/4  font-semibold font-abc gap-2 mt-10">
                                <button className='w-full rounded-lg py-3 text-white dark:text-black dark:etext dark:bg-white bg-[#171717]' onClick={()=> handle_DirectBuy(products)}>
                                {isBuy ? (
                                    <div className='flex gap-1 items-center justify-center'>
                                        <p>Processing</p>
                                        <l-ring-2
                                            size="15"
                                            stroke="5"
                                            stroke-length="0.25"
                                            bg-opacity="0.1"
                                            speed="0.5" 
                                            color="blue">
                                        </l-ring-2>
                                    </div>
                                ): 'Buy'}
                                </button>
                                <button className='w-full rounded-lg py-3 dark:text-white text-black border border-[#333333] bg-transparent min-h-[48px]' onClick={()=> handleCart(product)}>{addCart ? (
                                    <div className='flex items-center justify-center'>
                                        <p>Adding</p>
                                        <l-ripples
                                        size="25"
                                        bg-opacity="0.1"
                                        speed="1.75"
                                        color="blue">
                                        </l-ripples>
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