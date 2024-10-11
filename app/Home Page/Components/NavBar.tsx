"use client"
import React from 'react'
import NavMenu from './ui/NavMenu'
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react'
import MenuProps from '../Components/ui/Menu'
import { useOpen } from '../State Handlers/StateHnadler'
import Theme from './ui/Theme'

const NavBar = () => {
    const { isOpen, setOpen }= useOpen()
    const toggleMenu = () => setOpen(!isOpen)

    return (
        <div className='h-14 flex justify-between items-center px-4 md:px-12 cursor-default'>
            <div className="Menu flex gap-1 md:hidden">
                {isOpen ? (
                    ''
                ) : (
                    <Menu size={28} strokeWidth={1.5} className='md:hidden' onClick={toggleMenu}/>
                )}
            </div>
            <h1 className='text-gray-500 font-medium text-2xl hidden md:block pb-1 dark:text-white'>SajuBazaar</h1>
            <NavMenu/>
            <div className="flex items-center gap-6">
                <Search size={20} strokeWidth={1.5} />
                <User size={20} strokeWidth={1.5} />
                <Theme/>
            </div>

            {isOpen && (
                <>
                    <div className="fixed inset-0 bg-white dark:bg-black z-40" onClick={toggleMenu}></div>
                    <MenuProps className={`fixed inset-0 flex items-center justify-center z-50 flex-col gap-2`} />
                </>
            )}
        </div>
    )
}

export default NavBar
