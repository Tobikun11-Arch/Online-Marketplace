import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { AllProducts } from '../../axios/dataStore'
import { Products } from '../../entities/entities'
import Link from 'next/link'
import Image from 'next/image'

const fetchData = async() => {
    const response = await AllProducts.get('')
    const { TrendingProducts } = response.data
    return TrendingProducts
}

const AllproductCard = () => {
    const { data } = useQuery<Products[] | []>({
        queryKey: ['Trending'],
        queryFn: fetchData
    })

    return (
        <>
            {data?.map((datas, index)=> (
                    <div className='relative' key={index}>
                            <div className="relative w-full hover:bg-muted/100 dark:hover:bg-muted/25 h-96 border rounded-lg cursor-default mt-3 bg-white dark:bg-transparent dark:border-[#333333]">
                                <Image
                                    fill
                                    src={datas.images[0]}
                                    alt={`${datas.productName}`}
                                    className="object-contain object-center pb-24 px-10 aspect-w-1 aspect-h-1"
                                    placeholder="blur"
                                    blurDataURL="add new url later"
                                />
                            </div>
                        <div className='absolute bottom-0 rounded-b-lg font-semibold text-white bg-black bg-opacity-65 backdrop-blur-md  dark:bg-black w-full flex flex-col pr-3 pl-3 py-3 mt-4'>
                            <h1>{datas.productName}</h1>
                            <h1 className='text-gray-400'>₱{datas.productPrice}</h1>
                            <Link href={`/buyer-dashboard/product/${datas._id}`} passHref>
                                <button className='bg-white mt-3 py-2 rounded-lg w-full text-black'>Buy</button>
                            </Link>
                        </div>
                </div>
            ))}
        </>
    )
}

export default AllproductCard
