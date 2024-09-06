"use client"
import React from "react";
import axios from 'axios'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Skeleton } from '../../../@/components/ui/skeleton';

const queryClient = new QueryClient()

export default function ProductCard() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductCardData />
    </QueryClientProvider>
  )
}

interface Product {
  productName: string;
  description: string;
  images: string[];
  productPrice: number;
  quantity: number;
}

interface Products {
  ProductLists: Product[];
}

function ProductCardData() {
  const dataUrl = process.env.NEXT_PUBLIC_PRODUCT_LIST!;

  const { isLoading, error, data: products } = useQuery<Products | null>({
    queryKey: ['productList'],
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

  if (isLoading) {
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {Array.from({ length: 1 }).map((_, index) => (
          <>
          <li key={index} className="bg-white shadow-md rounded-lg overflow-hidden w-48 ml-10">
            <Skeleton className="w-48 h-48 bg-gray-200 p-2" />
            <div className="p-4">
              <Skeleton className="text-xl font-bold h-4 mb-2 bg-gray-200" />
              <Skeleton className="text-gray-700 h-4 mb-2 bg-gray-200" />
              <Skeleton className="text-gray-700 h-4 mb-2 bg-gray-200" />
              <Skeleton className="text-gray-700 h-4 mb-2 bg-gray-200" />
            </div>
          </li>

          <li className="bg-white shadow-md rounded-lg overflow-hidden w-48 ml-10">
            <Skeleton className="w-48 h-48 bg-gray-200 p-2" />
            <div className="p-4">
              <Skeleton className="text-xl font-bold h-4 mb-2 bg-gray-100" />
              <Skeleton className="text-gray-700 h-4 mb-2 bg-gray-100" />
              <Skeleton className="text-gray-700 h-4 mb-2 bg-gray-100" />
              <Skeleton className="text-gray-700 h-4 mb-2 bg-gray-100" />
            </div>
          </li>
          </>
        ))}
      </ul>
    );
  }

  if (error) {
    return <p className="text-red-500">An error has occurred: {error.message}</p>;
  }

  if (products?.ProductLists.length === 0) {
    return <p className="text-gray-500">No products available.</p>;
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
      {products?.ProductLists.map((list, index) => (
        <li key={index} className="bg-white shadow-md rounded-lg overflow-hidden w-48 ml-10">
          <div
            className="w-48 h-48 bg-cover bg-center"
            style={{ backgroundImage: `url(${list.images[0]})` }}
          ></div>
          <div className="p-4">
            <h1 className="text-xl text-gray-700 font-bold">{list.productName}</h1>
            <p className="text-gray-700">{list.productPrice}</p>
            <p className="text-gray-700">{list.quantity}</p>
            <p className="text-gray-700">{list.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
