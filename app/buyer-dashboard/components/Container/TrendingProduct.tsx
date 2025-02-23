import React from 'react'
import { ArrowRight } from 'lucide-react';
import { useToggle } from '../../store/useToggle';
import { useRouter } from 'next/navigation';
import AllproductCard from '../ui/AllproductCard';

const TrendingProduct = () => {
    const router = useRouter()
    const { setToggle } = useToggle()

    const handleProducts = () => {
        router.push('/buyer-dashboard/AllProducts')
        setToggle(false)
    }

    return (
        <div className='mt-10 cursor-default'>
            <h1 className='text-3xl font-bold'>Trending products</h1>
            <div className='flex justify-between items-center'>
                <p className='text-gray-500'>Explore our trending products!</p>
                <div className='hidden sm:flex border dark:bg-transparent rounded-lg items-center gap-3 dark:border-[#333333] py-2 px-3' onClick={handleProducts}>
                    <p className='text-sm font-semibold'>View all products</p>
                    <ArrowRight size={15}/>
                </div>
            </div>
            {/* add more changes here later */}
            <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
                <AllproductCard/>
            </div>
        </div>
    )
}

export default TrendingProduct
