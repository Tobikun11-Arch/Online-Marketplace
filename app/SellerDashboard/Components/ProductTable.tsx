import React from 'react';
import axios from 'axios'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Product } from '../types/types'

export interface Products {
    ProductLists: Product[];
  }

const queryClient = new QueryClient()
export default function ProductTable() {
    return (
    <QueryClientProvider client={queryClient}>
    <ProductDetails />
    </QueryClientProvider>
    )
    }

    function ProductDetails() {
        const dataUrl = process.env.NEXT_PUBLIC_PRODUCT_LIST!;

        const { isLoading, error, data: products } = useQuery<Products | null>({
        queryKey: ['ProductList'],
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
    return <p>Loading...</p>;
    }

    if (error) {
    return <p className="text-red-500">An error has occurred: {error.message}</p>;
    }

    if (products?.ProductLists.length === 0) {
    return <p className="text-gray-500">No products available.</p>;
    }

    return (
        <div className="w-full overflow-x-auto mt-4 pb-4">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
            <tr>
            <th className="px-4 py-2 border border-gray-300 text-left">Product</th>
            <th className="px-4 py-2 border border-gray-300 text-left">Price</th>
            <th className="px-4 py-2 border border-gray-300 text-left">Inventory</th>
            <th className="px-4 py-2 border border-gray-300 text-left">Status</th>
            <th className="px-4 py-2 border border-gray-300 text-left">More</th>
            </tr>
            </thead>
            {products?.ProductLists.map((list, index) => (
            <tbody key={index}>
            <tr>
            <td className="px-4 py-2 border border-gray-300">{list.productName}</td>
            <td className="px-4 py-2 border border-gray-300">{list.productPrice}</td>
            <td className="px-4 py-2 border border-gray-300">Inventory</td>
            <td className="px-4 py-2 border border-gray-300">Stats</td>
            <td className="px-4 py-2 border border-gray-300">More</td>
            </tr>
            </tbody>
            ))}
            </table>
        </div>
    );
}

