"use client"
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getOrderHistory } from '../axios/dataStore'
import { useUser } from '../store/User'
import { Order_History } from '../Interface/OrderItems'

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
        <div className='overflow-y-scroll w-full pr-2'>
            <h1 className='text-xl font-bold'>Order History</h1>
            {data && data.Order_Items.length > 1 ? (
                <>
                    {data.Order_Items.map((item, index) => (
                        <div key={index} className='flex items-center text-sm justify-between border-b-2 border-gray-300 py-2'>
                            <div>
                                <h2>{item.productName}</h2>
                                <p>Quantity: {item.quantity}</p>
                                <div className='flex gap-3'>
                                    <p>Price: {item.price}</p>
                                    {item.quantity > 1 && <p>Total: {item.price * item.quantity}</p>}
                                </div>
                            </div>
                            <img src={item.images[0]} alt={item.productName} className='w-20 h-20 object-cover'/>
                        </div>
                    ))}
                </>
            ) : (
                <>
                    <h2 className='text-white'>Start shopping now!</h2>
                </>
            )}
        </div>
    )
}

export default OrdersTab
