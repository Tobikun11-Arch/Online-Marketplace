"use client"
import React from 'react'
import { ShoppingCart, User, Menu } from 'lucide-react'
import { useToggle } from '../../store/useToggle'
import Sidebar from './Sidebar'
import CartComponent from '../pages/CartComponent'
import Navbar from './Navbar'

const Header = () => {
    const { setToggle, isCart, isToggle, setCart } = useToggle()
    const icon = 'p-2.5 border rounded-lg'

    return (
        <>
            <Sidebar isOpen={isToggle} onClose={() => setToggle(false)}/>
            <CartComponent isOpen={isCart} onClose={() => setCart(false)}/>
            <div className='flex justify-between p-4'>
                <Navbar className='hidden md:block w-full' isOpen={isCart}/>
                <Menu className={`${icon} md:hidden`} strokeWidth={1.4} size={40} onClick={()=> setToggle(true)}/>
                <div className='flex gap-2'>
                    <ShoppingCart className={`${icon}`} strokeWidth={1.4} size={40} onClick={()=> setCart(true)}/>
                    <User className={`${icon}`} strokeWidth={1.4} size={40}/>
                </div>
            </div>
        </>
    )

}

export default Header
