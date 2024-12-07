import React, { useState } from 'react'
import { ShoppingCart, User, Menu } from 'lucide-react'
import { useToggle } from '../../store/useToggle'
import Sidebar from './Sidebar'
import { useUser, useUserCart } from '../../store/User'
import CartComponent from '../pages/CartComponent'
import Navbar from './Navbar'
import UserAuth from '../pages/UserAuth'

const Header = () => {
    const { setToggle, isCart, isToggle, setCart, setAuth, isAuth,  } = useToggle()
    const icon = 'p-2.5 border rounded-lg'
    const { CartLength } = useUserCart()
    const { user } = useUser()

    return (
        <>
            <Sidebar isOpen={isToggle} onClose={() => setToggle(false)}/>
            <UserAuth isOpen={isAuth} onClose={() => setAuth(false)}/>
            <CartComponent isOpen={isCart} onClose={() => setCart(false)}/>
            <div className='flex justify-between p-4 md:p-5'>
                <Navbar className='hidden md:block w-full' isOpen={isCart}/>
                <Menu className={`${icon} md:hidden`} strokeWidth={1.4} size={40} onClick={()=> setToggle(true)}/>
                <div className='flex gap-2'>
                    <div className="relative">
                        <ShoppingCart className={`${icon}`} strokeWidth={1.4} size={40} onClick={()=> setCart(true)}/>
                        {user && CartLength > 0 && (
                            <div className={`absolute -top-3 -right-2 bg-blue-800 ${CartLength > 10 ? 'p-1' : 'px-2 py-1'} rounded-sm text-xs text-white`}>
                                {CartLength}    
                            </div>
                        )}
                    </div>
                    <User className={`${icon}`} strokeWidth={1.4} size={40} onClick={()=> setAuth(true)}/>
                </div>
            </div>
        </>
    )

}

export default Header