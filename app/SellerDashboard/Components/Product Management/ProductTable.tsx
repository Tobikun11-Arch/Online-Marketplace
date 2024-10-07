import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Product } from '../../types/types';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../../../../@/components/ui/pagination';
import { useData, useSearch, useSelectedProducts } from '../../hooks/ReusableHooks';
import ProductDetails from '../Product Details/ProductDetails';

interface Products {
    ProductLists: Product[];
}

export default function ProductTable() {
    const { dataPass } = useData()
    const { setSelect, setModalOpen } = useSelectedProducts()
    const { searchField, selected } = useSearch()

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    useEffect(() => {
        setCurrentPage(1);
    }, [selected.InStock, selected.OverallStorage, searchField]);

    const filteredAndSortedProducts = useMemo(() => {
        return dataPass?.filter((product) => {
            const productName = product.productName.toLowerCase();
            const productStatus = product.productStatus.toLowerCase();
            const productDiscounted = product.productDiscount > '0';
            const productFeatured = product.Featured === 'Featured';

            if (selected.InStock === 'Discounted items') {
                return productDiscounted;
            }

            if (selected.InStock === 'Featured products') {
                return productFeatured;
            }

            const searchTerm = searchField.toLowerCase();
            return productName.includes(searchTerm) || productStatus.startsWith(searchTerm);
        })
        ?.sort((a, b) => {
            if (selected.InStock === 'Price range') {
                return parseFloat(a.productPrice) - parseFloat(b.productPrice);
            }
            if (selected.OverallStorage === 'Oldest') {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            } else {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        })
    }, [dataPass, selected.InStock, selected.OverallStorage, searchField])

    // Pagination Logic
    const totalProducts = filteredAndSortedProducts?.length || 0;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredAndSortedProducts?.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleDetails = useCallback((product: Product) => {
        setSelect(product)
        setModalOpen(true)
    }, [])

    

    return (
        <>
        <div className="w-full overflow-x-auto mt-2 border rounded-md">
            <table className="min-w-full table-auto border-collapse rounded-lg cursor-default">
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
                                <div className="w-8 h-8 rounded-full bg-cover bg-center bg-gray-400"
                                    style={{ backgroundImage: product.images ? `url(${product.images[0]})` : '' }}>
                                </div>
                            </td>
                            <td className="pl-4 pr-16 py-2 cursor-default font-abc font-bold text-sm text-gray-800">₱{product.productPrice}</td>
                            <td className="pl-4 pr-10 cursor-default font-abc font-bold text-sm text-gray-800">{product.productQuantity < '20' ? 'Out of stock' : 'In stock'}</td>
                            <td className="px-4 py-2 cursor-default font-abc font-bold text-sm text-gray-800">{product.productStatus}</td>
                            <td className="px-4 py-2 cursor-default font-abc font-bold text-gray-500 text-sm" onClick={()=> handleDetails(product)}>{product.productStatus === 'Published' ? 'View Analystics' : 'Edit Listing'}</td>
                        </tr>
                    ))}
                    <h1 className='text-gray-400 mt-1'>{totalProducts < 1 && 'No product found'}</h1>
                </tbody>
            </table>
        </div>

        <ProductDetails/>

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
