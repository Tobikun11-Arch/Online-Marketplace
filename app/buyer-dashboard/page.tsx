"use client"
import React, { useEffect, useState } from 'react'
import Header from './components/layout/Header'
import { userData, AllProducts } from './axios/dataStore'
import MainShopProduct from './components/Container/MainShopProduct'
import { Products } from './entities/entities'
import { useToggle } from './store/useToggle'
import { useProuctDetails } from './store/storeProduct'
import { fetchUserData } from '../buyer-dashboard/@actions/getUsersData'

const Page = () => {
    const [ product, setProduct ] = useState<Products[] | []>([])
    const { isCart, isToggle } = useToggle()
    const { setUrl } = useProuctDetails()

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetchUserData()
                setProduct(response)
            } 
            catch (error) {
                console.error("Fetch error: ", error)
            }
        }
        fetchData()
    }, [])

    useEffect(()=> {
        const images = product?.map((product)=> product.images[0])
        setUrl(images)
    }, [product])

    return (
        <div className='min-h-screen bg-[#FAFAFA] dark:bg-[#171717]'>
            <Header/>
            <MainShopProduct isOpen={isCart || isToggle}/>
            {/* <h1>Footer</h1> */}
        </div>
    )
}

export default Page