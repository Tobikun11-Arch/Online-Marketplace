import React from 'react'
import { X, Search } from 'lucide-react'
import Input from '../common/Input'
import { useToggle } from '../../store/useToggle'

const Sidebar = () => {
    const { setToggle } = useToggle()

    return (
        //add animation tomorrow look for pagewrapper
        <div className='h-screen bg-white fixed w-full text-black p-4 flex flex-col gap-2'>
            <X className='p-2.5 border rounded-lg' strokeWidth={1.7} size={40} onClick={()=> setToggle(false)}/>
            <div className="relative w-full">
                <Input type='search' className='bg-white border w-full rounded-md h-10 text-base pl-2 pr-7 text-gray-500 outline-none' placeholder='Search for products...'/>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Search strokeWidth={1.4} color='gray' size={15}/>
                </div>
            </div>
            <h2>Popular</h2>
            <h2>Shop</h2>
        </div>
    )
}

export default Sidebar
