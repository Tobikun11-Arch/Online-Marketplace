import React from 'react'
import { Share2 } from 'lucide-react'
import ProfileIncome from '../components/dashboard-components/ProfileIncome'
import DataChart from '../components/dashboard-components/DataChart'

export default function MainDashboard() {

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
                <div className='w-full pt-2 sm:py-2 px-6 grid sm:grid-cols-2 xl:grid-cols-4 sm:pl-16 sm:pr-4 gap-2 lg:px-4 mt-4'>
                    <ProfileIncome 
                        label='Total Income'
                        data={25000}
                        percentage={12.95}
                    />
                    <ProfileIncome 
                        label='Profit'
                        data={12240}
                        percentage={-1.05}
                    />
                    <ProfileIncome 
                        label='Total Orders'
                        data={15000}
                        percentage={5.23}
                    />
                    <ProfileIncome 
                        label='Reveue'
                        data={35600}
                        percentage={0.46}
                    />
                </div>  
                <DataChart/>
            </div>
        </div>
    )
}