"use client"
import React, { useState } from 'react'
import OverallStorage from './OverallStorage'
import InStock from './InStock'
import OutofStock from './OutofStock'
import Draft from './Draft'
import ProductTable from './ProductTable'
import axios from 'axios'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Product } from '../types/types'

interface Products {
    ProductLists: Product[];
  }


interface Select {
  OverallStorage: string | null;
  InStock: string | null;
  OutofStock: string | null;
  Draft: string | null;
}

const queryClient = new QueryClient()
export default function ManageProducts() {
  return (
    <QueryClientProvider client={queryClient}>
    <Manage />
    </QueryClientProvider>
    )
}

function Manage() {
  const dataUrl = process.env.NEXT_PUBLIC_PRODUCT_LIST!;

  const [Selected, setSelect] = useState<Select>({
    OverallStorage: null,
    InStock: null,
    OutofStock: null, 
    Draft: null,  
  })

  const handleSelectChange = (name: keyof Select, value: string) => {
  setSelect({
  OverallStorage: name === "OverallStorage" ? value : null,
  InStock: name === "InStock" ? value : null,
  OutofStock: name === "OutofStock" ? value : null,
  Draft: name === "Draft" ? value : null
  });
  }

  const { isLoading, error, data: products } = useQuery<Products | null>({
  queryKey: ['ProductLists'],
  queryFn: async () => {
  try {
  const token = localStorage.getItem('token');
  if (!token) {
  throw new Error("No token found");
  }

  const response = await axios.get(dataUrl, {
  headers: {
  Authorization: `Bearer ${token}`,
  },
  });
  return response.data;
  } 

  catch (error: any) {
  console.error('Error fetching data:', error);
  throw new Error(error.response?.data?.message || 'Failed to fetch products');
  }
  },
  });

  const data = products?.ProductLists.map((product) => (product.productName))

  if (isLoading) {
  return <p>Loading...</p>;
  }

  if (error) {
  return <p className="text-red-500">An error has occurred: {error.message}</p>;
  }

  if (products?.ProductLists.length === 0) {
  return <p className="text-gray-500">No products available.</p>;
  }

  return (
  <>
  <div className='w-full h-screen items-start px-2 sm:px-6 md:px-10 xl:w-3/4 xl:ml-72 xl:items-center'>
    <div className="flex flex-col w-full justify-start">
    <h1 className='mt-14 text-2xl font-bold xl:mt-7'>Manage Products</h1>
    <p className='text-xs font-medium'>You have {data?.length} products in your catalog.</p>
    </div>
    <input type="text" placeholder='Search' className='bg-white outline-none rounded-md w-full px-2 mt-2 h-12'/>

    <div className="w-full flex items-center gap-x-2 pb-2 overflow-x-auto overflow-y-hidden">  
    <OverallStorage
    className='select text-black font-bold bg-white mt-3 font-abc'
    onChange={(e)=> handleSelectChange("OverallStorage", e.target.value)}
    value={Selected.OverallStorage || ''}
    />

    <InStock
    className="select text-black font-abc font-bold bg-white mt-3" 
    onChange={(e)=> handleSelectChange("InStock", e.target.value)}
    value={Selected.InStock || ''}
    />

    <OutofStock
    className="select text-black font-abc font-bold bg-white mt-3" 
    onChange={(e)=> handleSelectChange("OutofStock", e.target.value)}
    value={Selected.OutofStock || ''}
    />

    <Draft
    className="select font-abc font-bold text-black bg-white mt-3" 
    onChange={(e)=> handleSelectChange("Draft", e.target.value)}
    value={Selected.Draft || ''}
    />
    </div>

    <ProductTable/>
    </div>
    </>
  )
}
