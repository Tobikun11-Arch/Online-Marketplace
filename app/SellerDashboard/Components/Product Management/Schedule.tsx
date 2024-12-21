import React from 'react'
import { UseProductStore } from '../../hooks/UseHooks'
import { useSchedule } from '../../hooks/ReusableHooks'

export default function Schedule() {
    const { productName, productCategory, productPrice } = UseProductStore()
    const { DateSchedule, setDate, TimeSchedule, setTime } = useSchedule()


  return (
    <div className=''>
        <h1 className='text-xl font-abc font-bold'>Schedule Product Post</h1>

        <p className='pt-5 pr-40'>Product Name: {productName}</p>
        <p className='pr-40'>Category: {productCategory}</p>
        <p className='pr-40'>Price: {productPrice ? `$${productPrice}` : ''}</p>

         {/* Date Picker */}
        <div className='pt-4 pr-5'>
            <label className="block text-white">Select Date</label>
            <input type="date" className="mt-1 w-full px-3 py-2 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={DateSchedule} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setDate(e.target.value)}/>
        </div>

        {/* Time Picker */}
        <div className='pt-4 pr-5'>
            <label className="block text-white">Select Time</label>
            <input type="time" className="mt-1 w-full px-3 py-2 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={TimeSchedule} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setTime(e.target.value)}/>
        </div>
    </div>
  )
}
