"use client"
import React, { useState } from 'react'
import { ShoppingCart, User, Menu } from 'lucide-react'
import { useToggle } from '../../store/useToggle'
import Sidebar from './Sidebar'
import CartComponent from '../pages/CartComponent'
import Navbar from './Navbar'
import OptionWrapper from '../../../Home Page/Components/ui/OptionWrapper'

const Header = () => {
    const { setToggle, isCart, isToggle, setCart } = useToggle()
    const [ isUser, setUser ] = useState(false)
    const icon = 'p-2.5 border rounded-lg'

    const toggleUser = () => {
    setUser(!isUser)
    }

    return (
        <>
            <Sidebar isOpen={isToggle} onClose={() => setToggle(false)}/>
            <CartComponent isOpen={isCart} onClose={() => setCart(false)}/>
            <div className='flex justify-between p-4 md:p-5'>
                <Navbar className='hidden md:block w-full' isOpen={isCart}/>
                <Menu className={`${icon} md:hidden`} strokeWidth={1.4} size={40} onClick={()=> setToggle(true)}/>
                <div className='flex gap-2'>
                    <ShoppingCart className={`${icon}`} strokeWidth={1.4} size={40} onClick={()=> setCart(true)}/>
                    <User className={`${icon}`} strokeWidth={1.4} size={40} onClick={toggleUser}/>
                </div>
                {isUser && (
                    <OptionWrapper>
                        <div className='h-auto w-28 bg-blue-700 top-10 right-0 z-10 fixed'>
                            <div className='p-2'>
                                <h2>Signup</h2>
                                <h2>Singin</h2>
                            </div>
                        </div>
                    </OptionWrapper>
                )}  
            </div>
        </>
    )

}

export default Header