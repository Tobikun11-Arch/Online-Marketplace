"use client"
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { lineSpinner } from 'ldrs'
import { Products } from '../../entities/entities'
import { productId } from '../../axios/dataStore'
import Header from '../../components/layout/Header'

const fetchDataId = async (id: string) => {
    const response = await productId.get(`${id}`);
    return response.data.product;
};

const Page = () => {
    const { id } = useParams()
    const [ products, setProducts ] = useState<Products[] | []>([])
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
        if(data) {
            setProducts((prev)=> [...prev,data])
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

    return (
        <div className='min-h-screen bg-[#FAFAFA] dark:bg-[#171717]'>
            <Header/>
                {products.map((product, index)=> (
                    <div className="px-4 md:px-5" key={index}>
                        <div className='bg-black flex'>
                            <div className='w-3/5 bg-white'></div>
                            <div className='w-2/5 bg-blue-700'> <h1>{product.Featured}</h1></div>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default Page
