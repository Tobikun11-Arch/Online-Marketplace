"use client"
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React from 'react'
import { AllProducts } from '../../axios/dataStore'
import { productId } from '../../axios/dataStore'

const fetchDataId = async (id: string) => {
    const response = await productId.get(`${id}`);
    return response.data.productId;
};

const Page = () => {
    const { id } = useParams()
    const { data, isLoading, isError } = useQuery({
        queryKey: ['productId', id],
        queryFn: () => fetchDataId(id as string),
        enabled: !!id, 
    });

    if (isLoading) return <p>Loading product details...</p>;

    // Handle error state
    if (isError) return <p>Failed to load product details.</p>;

    console.log(data)

    return <h2>{data}</h2>
}

export default Page
