"use client"
import React, { useEffect, useState } from 'react'
import Header from './Header'
import { userData } from '../../axios/dataStore'
import MainShopProduct from '../Container/MainShopProduct'
import { Products } from '../../entities/entities'
import { useToggle } from '../../store/useToggle'
import { useProuctDetails } from '../../store/storeProduct'

const MainLayout = () => {
    const [ product, setProduct ] = useState<Products[] | []>([])
    const { isCart, isToggle } = useToggle()
    const { setUrl } = useProuctDetails()

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await userData.get('')
                setProduct(response.data.product)
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
        <>
            <div className='min-h-screen bg-[#FAFAFA] dark:bg-[#171717] pb-5'>
                <Header/>
                <MainShopProduct isOpen={isCart || isToggle}/>
            </div>  
        </>
    )
}

export default MainLayout