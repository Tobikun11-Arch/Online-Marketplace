import React from 'react'
import { DataBody_01, DataBody_02 } from './ComplexStyle'
import { ChartData } from '../../types/product'
import Image from 'next/image'

interface DataChartProps {
    Chart?: ChartData[]
}

export default function DataChart({ Chart }: DataChartProps) {

    return (
        <div className='w-full py-2 px-4 flex flex-col xl:flex-row gap-4 mt-2 sm:pl-16 lg:px-4'>

            <div className='w-full xl:w-3/5 flex flex-col gap-2'>
                <div className={`${DataBody_01}`}>
                    <h2 className='font-semibold text-sm'>Sales</h2>
                </div>
                <div className={`${DataBody_02}`}>
                    <h2 className='font-semibold text-sm'>Recent Activities</h2>
                    {Chart?.map((data, dataIndex)=> (
                        <div key={`data-${dataIndex}`}>
                            {data.RecentAct.map((recent, reviewIndex) => (
                                <div key={`review-${dataIndex}-${reviewIndex}`} className='flex flex-col'>
                                    <div className='mt-2 rounded-md pr-2 py-2 text-sm'>
                                        <div className='flex justify-between items-center'>
                                            <div className='flex gap-2'>
                                                <div className='relative rounded-full overflow-hidden h-10 w-10'>
                                                    <Image
                                                    fill
                                                    loading='lazy'
                                                    alt='Product img'
                                                    src={recent.images[0] || '/assets/fallback.png'}
                                                    className='object-cover'
                                                    />
                                                </div>
                                                <div>
                                                    <p>{recent.productName ? recent.productName : 'Not available'}</p>
                                                    <p className='text-xs text-gray-500'>{new Date(recent.createdAt).toLocaleDateString('en-US', { 
                                                        year: '2-digit', 
                                                        month: '2-digit', 
                                                        day: '2-digit' 
                                                    })}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col items-end'>
                                                <p>${recent.productPrice}</p>
                                                <p className={`rounded-md text-xs px-2 py-1 ${recent.status !== 'Published' ? 'bg-red-500 text-white' : 'bg-[#B7F0B6] text-black'}`}>{recent.status}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className='w-full xl:w-2/5 flex flex-col gap-2'>
                <div className={`${DataBody_01}`}>
                    <h2 className='font-semibold text-sm'>Latest Orders</h2>
                    {Chart?.map((data, dataIndex)=> (
                        <div key={`data-${dataIndex}`}>
                            {data.ReviewOrder.map((review, reviewIndex) => (
                                <div key={`review-${dataIndex}-${reviewIndex}`} className='flex flex-col'>
                                    <div className='mt-2 rounded-md pr-2 py-2 text-sm'>
                                        <div className='flex justify-between items-center'>
                                            <div className='flex gap-2'>
                                                <div className='relative rounded-full overflow-hidden h-10 w-10'>
                                                    <Image
                                                    fill
                                                    loading='lazy'
                                                    alt='Product img'
                                                    src={review.productImage}
                                                    className='object-cover'
                                                    />
                                                </div>
                                                <div>
                                                    <p>{review.productName}</p>
                                                    <p className='text-xs text-gray-500'>{new Date(review.AddedAt).toLocaleDateString('en-US', { 
                                                        year: '2-digit', 
                                                        month: '2-digit', 
                                                        day: '2-digit' 
                                                    })}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col items-end'>
                                                <p>x{review.productQuantity}</p>
                                                <p>${review.productQuantity * review.productPrice}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className={`${DataBody_02}`}>
                    <h2 className='font-semibold text-sm'>Top Buyer</h2>
                </div>
            </div>
        </div>
    )
}