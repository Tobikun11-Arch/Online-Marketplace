import React from 'react'
import { productCategory } from '../../axios/dataStore'
import { useQuery } from '@tanstack/react-query'
import ProductCategory from '../../../Auth/Components/ui/ProductCategory'
import { Box } from 'lucide-react';
import { useCategory } from '../../store/BestCategory'
import Link from 'next/link';

const fetchCategory = async() => {
    const response = await productCategory.get('')
    return response.data.categories
}

const BestCategory = () => {
    const { setCategory } = useCategory()
    const { data } = useQuery({
        queryKey: ['category'],
        queryFn: fetchCategory
    })


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <Link href={'/buyer-dashboard/AllProducts'} onClick={()=> setCategory('Fashion')}>
                <ProductCategory>
                    <div className="flex flex-col">
                        <h1 className='font-semibold'>Fashion</h1>
                        <p className='dark:text-gray-400 text-gray-700 text-sm'>Explore trendy and timeless outfits for every occasion.</p>
                    </div>
                    <div className="length flex gap-2 items-center">
                        <Box size={22}/>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>{data?.Fashion.length} products</p>
                    </div>
                </ProductCategory>
            </Link>

            <Link href={'/buyer-dashboard/AllProducts'} onClick={()=> setCategory('Electronics')}>
                <ProductCategory>
                    <div className="flex flex-col">
                        <h1 className='font-semibold'>Electronics</h1>
                        <p className='dark:text-gray-400 text-gray-700 text-sm'>Discover cutting-edge gadgets and essential tech for your lifestyle.</p>
                    </div>
                    <div className="length flex gap-2 items-center">
                        <Box size={22}/>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>{data?.Electronics.length} products</p>
                    </div>
                </ProductCategory>
            </Link>

            <Link href={'/buyer-dashboard/AllProducts'} onClick={()=> setCategory('Home & Kitchen')}>
                <ProductCategory>
                    <div className="flex flex-col">
                        <h1 className='font-semibold'>Home & Kitchen</h1>
                        <p className='dark:text-gray-400 text-gray-700 text-sm'>Upgrade your living spaces with stylish and practical home essentials.</p>
                    </div>
                    <div className="length flex gap-2 items-center">
                        <Box size={22}/>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>{data?.['Home & Kitchen'].length} products</p>
                    </div>
                </ProductCategory>
            </Link>

            <Link href={'/buyer-dashboard/AllProducts'} onClick={()=> setCategory('Automotive')}>
                <ProductCategory>
                    <div className="flex flex-col">
                        <h1 className='font-semibold'>Automotive</h1>
                        <p className='dark:text-gray-400 text-gray-700 text-sm'>Find top-quality tools, accessories, and gear for your vehicle.</p>
                    </div>
                    <div className="length flex gap-2 items-center">
                        <Box size={22}/>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>{data?.Automotive.length} products</p>
                    </div>
                </ProductCategory>
            </Link>
        </div>
    )
}

export default BestCategory
