import React from 'react'
import NavMenu from './ui/NavMenu'
import { Search, User, ShoppingCart } from 'lucide-react'

const NavBar = () => {
    return (
        <div className='h-14 flex justify-around items-center'>
            <h1 className='text-gray-500 font-medium text-3xl'>SajuBazaar</h1>
            <NavMenu/>
            <div className="flex items-center gap-6">
                <Search size={20} strokeWidth={1.5} />
                <User size={20} strokeWidth={1.5} />
                <ShoppingCart size={20} strokeWidth={1.5} />
            </div>
        </div>
    )
}

export default NavBar
