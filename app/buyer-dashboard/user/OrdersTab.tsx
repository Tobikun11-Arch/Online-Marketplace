"use client"
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getOrderHistory } from '../axios/dataStore'
import { useUser } from '../store/User'
import { Order_History } from '../Interface/OrderItems'
import Image from 'next/image'


const getHistory = async (user: any) => {
    const response = await getOrderHistory.get('getOrderHistory', {
        params: {userId: user?._id}
    })
    return response.data
}

const OrdersTab = () => {
    const { user } = useUser()
    const { data } = useQuery<Order_History>({
        queryKey: ['OrderHistory'],
        queryFn: ()=> getHistory(user)
    })

    return (
        <div className='overflow-y-auto w-full pr-2'>
            <h1 className='text-xl font-bold'>Order History</h1>
            {data && data.Order_Items.length >= 1 ? (
                <>
                    {data.Order_Items.filter(item => item.productName).map((item, index) => (
                        <div key={index} className='flex items-start text-sm justify-between border-gray-300 py-2'>
                            <div className='flex gap-3'>
                                <div className='w-20 h-20 bg-gray-400 relative rounded-md'>
                                    <Image
                                    fill
                                    alt='product history img'
                                    src={item.images[0]}
                                    className='object-contain object-center p-2'
                                    />
                                </div>
                                <div className='Porduct main details'>
                                <h1 className="text-gray-800 dark:text-white font-semibold text-base max-w-[160px] truncate sm:max-w-full">
                                {item.productName}
                                </h1>
                                    <h1 className='text-xs text-gray-400'>{item.productId?.toString()}</h1>
                                </div>
                            </div>
                            <div className='Minor details text-end'>
                                {item.quantity > 1 ? (
                                    <h1 className='font-semibold'>${(item.price * item.quantity).toFixed(2)}</h1>
                                    ) : (
                                    <h1 className='font-semibold'>${item.price.toFixed(2)}</h1>
                                )}
                                <h2 className='text-gray-400 text-sm'>Qty: {item.quantity}</h2>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <>
                    <h2 className='text-black dark:text-white'>Start shopping now!</h2>
                </>
            )}
        </div>
    )
}

export default OrdersTab
