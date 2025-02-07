import React from 'react'

interface ProfileProps {
    label: string
    data: number
    percentage: number
}

export default function ProfileIncome({ label, data, percentage }: ProfileProps) {
    const formattedData = data.toFixed(2).toLocaleString();

    return (
        <div className='bg-white shadow-md rounded-lg pl-5 py-5 xl:pr-2'>
            <h2 className='font-medium text-gray-600 text-sm'>{label}</h2>
            <h2 className='mt-1 text-xl font-semibold'>  {`${label !== 'Customers' && label !== 'Total Orders' ? '$' : ''}${formattedData}`}</h2>
            <div className='flex text-xs gap-1 items-center mt-1'>
            <h2 className={`${percentage >= 1  ? 'bg-[#D8F2EE] text-[#429085]' : 'bg-[#F5D9DD] text-[#C31D37]'} font-medium p-1 rounded-md`}>{percentage}%</h2>
            <h2 className='text-gray-600 font-medium'>Compared to last month</h2>
            </div>
        </div>
    )
}
