"use client"
import React, { useEffect, useState } from 'react'
import Header from './components/layout/Header'
import MainShopProduct from './components/Container/MainShopProduct'
import { Products } from './entities/entities'
import { useToggle } from './store/useToggle'
import { useProuctDetails, useProductData } from './store/storeProduct'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { userData } from '../buyer-dashboard/axios/dataStore'

const queryClient = new QueryClient()
export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
    <BuyerDashboard />
    </QueryClientProvider>
    )
}

const BuyerDashboard = () => {
    const [ productList, setProductList ] = useState<Products[] | []>([])
    const { isCart, isToggle } = useToggle()
    const { setUrl } = useProuctDetails()
    const { setProduct, product } = useProductData()

    const { isLoading, error, data: products } = useQuery<Products[] | []>({
        queryKey: ['product'],
        queryFn: async () => {
        const response = await userData.get('');
        return response.data.product;
        },
    });

    useEffect(() => {
        if (products) {
            setProduct(products);
            setUrl(product?.map((product)=> product.images[0]))
        }
    }, [products, setProduct, setUrl, product])

    if(isLoading) return <h1>Loading</h1>
    if(error) return <h1>Error displaying</h1>

    // useEffect(() => {       
    //     const fetchData = async() => {
    //         const product = await fetchProduct()
    //         const ProductList = await fetchProducts()
    //         setProduct(product)
    //         setProductList(ProductList)
    //     }
    //     fetchData()
    // }, [])

    // useEffect(()=> {
    //     const images = product?.map((product)=> product.images[0])
    //     setUrl(images)
    //     console.log(productList)
    // }, [product, productList])

    return (
        <div className='min-h-screen bg-[#FAFAFA] dark:bg-[#171717]'>
            <Header/>
            <MainShopProduct isOpen={isCart || isToggle}/>
            {/* Footer  */}
        </div>
    )
}
