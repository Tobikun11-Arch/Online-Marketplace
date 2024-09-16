import React, { useState } from 'react';
import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Product } from '../types/types';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../../../@/components/ui/pagination';

interface Products {
    ProductLists: Product[];
}

const queryClient = new QueryClient();

export default function ProductTable() {
    return (
        <QueryClientProvider client={queryClient}>
            <ProductDetails />
        </QueryClientProvider>
    );
}

function ProductDetails() {
    const dataUrl = process.env.NEXT_PUBLIC_PRODUCT_LIST!;
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
            } catch (error: any) {
                console.error('Error fetching data:', error);
                throw new Error(error.response?.data?.message || 'Failed to fetch products');
            }
        },
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    if (isLoading) {
        return (
            <>
                <main className='w-full h-screen bg-gray-200 flex justify-center items-center'>
                <span className="loading loading-ring loading-lg"></span>
                </main>
            </>
        )
    }

    if (error) {
        return <p className="text-red-500">An error has occurred: {error.message}</p>;
    }

    if (products?.ProductLists.length === 0) {
        return <p className="text-gray-500">No products available.</p>;
    }

    // Pagination Logic
    const totalProducts = products?.ProductLists.length || 0;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products?.ProductLists.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
        <div className="w-full overflow-x-auto mt-2 border">
            <table className="min-w-full table-auto border-collapse rounded-lg">
                <thead className="bg-white">
                    <tr>
                        <th className="px-4 py-2 border-b-2 border-gray-500 text-left">Product</th>
                        <th className="px-4 py-2 border-b-2 border-gray-500 text-left">Price</th>
                        <th className="px-4 py-2 border-b-2 border-gray-500 text-left">Inventory</th>
                        <th className="px-4 py-2 border-b-2 border-gray-500 text-left">Status</th>
                        <th className="px-4 py-2 border-b-2 border-gray-500 text-left">More</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts?.map((product, index) => (
                        <tr key={`${product.description}-${index}`} className='bg-white border-b border-gray-400'>
                            <td className="px-4 py-2">
                                <div className="w-10 h-10 rounded-full bg-cover bg-center bg-gray-400"
                                    style={{ backgroundImage: product.images ? `url(${product.images[0]})` : '' }}>
                                </div>
                            </td>
                            <td className="pl-4 pr-24 py-2 cursor-default">₱{product.productPrice}</td>
                            <td className="px-4 py-2">Inventory</td>
                            <td className="px-4 py-2">Stats</td>
                            <td className="px-4 py-2">More</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

            {/* Pagination Component */}
            {totalProducts > itemsPerPage && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                            />
                        </PaginationItem>
                        {totalPages === 1 ? (
                            <PaginationItem >
                                <PaginationLink
                                className='bg-black hover:bg-black'
                                    href="#"
                                    onClick={() => handlePageChange(1)}
                                >
                                    1
                                </PaginationLink>
                            </PaginationItem>
                        ) : (
                            <>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <PaginationItem key={index + 1} >
                                        <PaginationLink
                                            className={`ml-5 ${currentPage === index + 1 ? 'text-red-600 font-bold text-2xl' : 'bg-blue'}`}
                                            href="#"
                                            onClick={() => handlePageChange(index + 1)}
                                            >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                            </>
                        )}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </>
    );
}