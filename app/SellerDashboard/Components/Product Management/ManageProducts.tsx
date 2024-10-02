"use client"
import React, { useState, useEffect, ChangeEvent } from 'react'
import OverallStorage from './OverallStorage'
import InStock from './InStock'
import ProductTable from './ProductTable'
import {productList} from '../../axios/axios'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Product } from '../../types/types'
import { useData, useSearch } from '../../hooks/ReusableHooks'
import axios from 'axios'
import { hourglass } from 'ldrs'

interface Products {
    ProductLists: Product[];
  }

  interface Select {
    OverallStorage: string;
    InStock: string;
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
  const { setData } = useData();
  const { setSearchField, setSelected } = useSearch()

  const [Selected, setSelect] = useState<Select>({
    OverallStorage: '',
    InStock: ''
  })

  const handleSelectChange = (name: keyof Select, value: string) => {
  setSelect({
  OverallStorage: name === "OverallStorage" ? value : '',
  InStock: name === "InStock" ? value : ''
  });
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      hourglass.register()
    }
  }, []);

  const { isLoading, error, data: products } = useQuery<Products | null>({
  queryKey: ['ProductLists'],
  queryFn: async () => {
  try {
  const token = localStorage.getItem('token');
  if (!token) {
  throw new Error("No token found");
  }

  const response = await productList.get('', { 
  headers: {
  Authorization: `Bearer ${token}`,
  },
  });
  return response.data;
  }

  catch (error: any) {
    if (axios.isCancel(error)) {
      console.error("Request was cancelled:", error.message);
    } else if (error.code === 'ECONNABORTED') {
      console.error("Request timed out:", error.message);
    } else {
      console.error("Error fetching data:", error);
    }
    throw new Error(error.response?.data?.message || 'Failed to fetch products');
  }
  },
  });

 
  useEffect(() => {
    if (products?.ProductLists) {
      setData(products.ProductLists);
    }
  }, [products, setData]);


  useEffect(() => {
    setSelected({
      OverallStorage: Selected.OverallStorage,
      InStock: Selected.InStock
    });
  }, [Selected, setSelected]);

  if (isLoading) {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-300">
        <div className='xl:ml-48'>
            <l-hourglass
              size="70"
              bg-opacity="0.1"
              speed="1.75" 
              color="black" 
            ></l-hourglass>
        </div>
      </div>
    </> 
  )
  }

  if (error) {
  return <p className="text-red-500">An error has occurred: {error.message}</p>;
  }
 
  const productLength = products?.ProductLists.length

  const onsearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value.toLowerCase()
    setSearchField(searchString)
  }

  return (
  <>
  <div className='w-full min-h-screen items-start px-2 sm:px-6 md:px-10 xl:w-3/4 xl:ml-72 xl:items-center cursor-default'>
    <div className="flex flex-col w-full justify-start">
    <h1 className='mt-14 text-2xl font-bold xl:mt-7'>Manage Products</h1>
    <p className='text-xs font-medium'>You have {productLength} products in your catalog.</p>
    </div>
    <input type="text" placeholder='Search' className='bg-white outline-none rounded-md w-full px-2 mt-2 h-12' onChange={onsearchChange}/>

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
    </div>

    <ProductTable/>
    <h1 className='text-gray-400'>{(productLength !== undefined && productLength != 0) ? '' : 'No products available'}</h1>

    </div>
    </>
  )
}
