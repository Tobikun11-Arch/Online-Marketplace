import React from 'react'
import { DataBody_01, DataBody_02 } from './ComplexStyle'

export default function DataChart() {
    return (
        <div className='w-full py-2 px-4 flex flex-col xl:flex-row gap-4 mt-2 sm:pl-16 lg:px-4'>

            <div className='w-full xl:w-3/5 flex flex-col gap-2'>
                <div className={`${DataBody_01}`}>
                    <h2 className='font-semibold text-sm'>Sales</h2>
                </div>
                <div className={`${DataBody_02}`}>
                    <h2 className='font-semibold text-sm'>Recent Activities</h2>
                </div>
            </div>

            <div className='w-full xl:w-2/5 flex flex-col gap-2'>
                <div className={`${DataBody_01}`}>
                    <h2 className='font-semibold text-sm'>Review Orders</h2>
                </div>
                <div className={`${DataBody_02}`}>
                    <h2 className='font-semibold text-sm'>Top Buyer</h2>
                </div>
            </div>
        </div>
    )
}