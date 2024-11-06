"use client"
import React, { useEffect, useState } from 'react'
import Header from './Header'
import { userData } from '../../axios/dataStore'
import ProductCard from '../Container/ProductCard'
import { Products } from '../../entities/entities'

const MainLayout = () => {
    const [ product, setProduct ] = useState<Products[] | []>([])

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
        console.log("Products: ", product)
    }, [product])

    return (
        <>
            <div className='min-h-screen bg-[#FAFAFA] dark:bg-[#171717]'>
                <Header/>

                {/* Remove this later if we already have product list  */}
                <ProductCard product={product}/>
            </div>  
        </>
    )
}

export default MainLayout