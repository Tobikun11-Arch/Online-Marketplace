import React from 'react'
import { X, Search } from 'lucide-react'
import Input from '../common/Input'

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

const Sidebar = ({ isOpen, onClose } : SidebarProps) => { 

    return (
        <div className={`h-screen bg-white fixed top-0 left-0 w-full transition-transform transform text-black p-4 flex flex-col gap-2 dark:bg-black dark:text-white ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <X className='p-2 border rounded-lg' strokeWidth={1.7} size={40} onClick={onClose}/>
            <div className="relative w-full">
                <Input type='search' className='bg-transparent border w-full rounded-md h-12 text-base pl-2 pr-7 text-gray-800 dark:text-white outline-none' placeholder='Search for products...'/>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Search strokeWidth={1.4} color='gray' size={15}/>
                </div>
            </div>
            <div className="navItems">
                <h2>All products</h2>
                <h2>Popular</h2>
                <h2>Shop</h2>
            </div>
        </div>
    )
}

export default Sidebar
