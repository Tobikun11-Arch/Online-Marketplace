import React from 'react'
import Input from '../common/Input'
import { Search } from 'lucide-react'

interface NavbarProps {
    className?: string
    isOpen: boolean
}

const Navbar = ({ className, isOpen }: NavbarProps) => {
    return (
        <>
        <nav className={className}>
            <div className='flex items-center md:gap-16 xl:gap-32'>
                <div className='flex gap-5'>
                    <h1>Saju<span className='text-blue-800'>Baz</span>aar</h1>
                    <div className="navItems flex gap-3 items-center text-sm text-gray-500">
                        <h2>All</h2>
                        <h2>Popular</h2>
                        <h2>Shop</h2>
                    </div>
                </div>
                <div className={`md:w-2/5 ${isOpen ? '' : 'relative'}`}>
                    <Input type='search' className='bg-white border w-full rounded-md h-10 text-sm pl-2 pr-7 text-gray-800 dark:text-white outline-none' placeholder='Search for products...'/>
                    <div className={`inset-y-0 right-0 flex items-center pr-3 ${isOpen ? 'hidden' : 'absolute'}`}>
                    <Search strokeWidth={1.4} color='gray' size={15}/>
                    </div>
                </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar
