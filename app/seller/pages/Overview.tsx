"use client"
import React, { useEffect } from 'react'
import { Share2 } from 'lucide-react'
import ProfileIncome from '../components/dashboard-components/ProfileIncome'
import DataChart from '../components/dashboard-components/DataChart'
import { httpRequestGet } from '../services/axios-instance/GetInstance'
import { useUser } from '../state/User'
import { user_sales } from '../services/axios/ProductRequests'
import { useQuery } from '@tanstack/react-query'
import { ResponseData } from '../services/axios-instance/GetInstance'
import { NotifBuyer } from '../state/Chart'

async function UserSalesData(userId?: string): Promise<ResponseData> {
    const response = await httpRequestGet('', user_sales, userId)
    if(!response) {
        return { user_data: [], productQuantities: [], product_orders: [], buyer_info: [], seller_data: [], Chart: [], TotalData: [] }
    }
    return response
}

export default function MainDashboard() {
    const { user } = useUser()
    const { setChart } = NotifBuyer()

    const { data } = useQuery<ResponseData>({
        queryKey: ['user_sales'],
        queryFn: ()=> UserSalesData(user?._id),
        enabled: !!user?._id,
    })

    useEffect(() => {
        if (data) {
            setChart(data.Chart.map(review => review.ReviewOrder).flat());
        }
    }, [data, setChart]);

    return (
        <div className='flex flex-col h-full'>
            <div className='w-full shadow-sm py-2 flex justify-between px-4'>
                <h1 className='font-semibold'>Overview</h1>
                <div className='bg-white flex gap-1 items-center py-1 px-2 rounded-lg border border-gray-500'>
                    <Share2 size={12} color='gray'/>
                    <h2 className='text-xs text-gray-600'>Share</h2>
                </div>
            </div>
            <div className="overflow-y-auto pb-16 sm:pb-2">
                {data?.TotalData.map((product, index)=> (
                    <div key={index} className='w-full pt-2 sm:py-2 px-6 grid sm:grid-cols-2 xl:grid-cols-4 sm:pl-16 sm:pr-4 gap-2 lg:px-4 mt-4'>
                        <ProfileIncome 
                            label='Total Income'
                            data={product.Total_income}
                            percentage={0}
                        />
                        <ProfileIncome 
                            label='Customers'
                            data={product.Total_buyer}
                            percentage={0}
                        />
                        <ProfileIncome 
                            label='Total Orders'
                            data={product.Total_orders}
                            percentage={0}
                        />
                        <ProfileIncome 
                            label='Total Discount'
                            data={product.Total_discount}
                            percentage={0}
                        />
                    </div>
                ))}  
                <DataChart Chart={data?.Chart}/>
            </div>
        </div>
    )
}