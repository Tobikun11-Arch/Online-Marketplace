import React from 'react'
import { ShoppingCart, User, AlignJustify, UserPen, Truck, Settings, LogOut } from 'lucide-react'
import { useToggle } from '../../store/useToggle'
import Sidebar from './Sidebar'
import { useUser, useUserCart, useBuyer } from '../../store/User'
import CartComponent from '../pages/CartComponent'
import Navbar from './Navbar'
import UserAuth from '../pages/UserAuth'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Link from 'next/link'

const Header = () => {
    const { setToggle, isCart, isToggle, setCart, setAuth, isAuth,  } = useToggle()
    const icon = 'p-2.5 border rounded-lg'
    const { CartLength } = useUserCart()
    const { user } = useUser()
    const { isBuyer } = useBuyer()

    return (
        <>
            <Sidebar isOpen={isToggle} onClose={() => setToggle(false)}/>
            <UserAuth isOpen={isAuth} onClose={() => setAuth(false)}/>
            <CartComponent isOpen={isCart} onClose={() => setCart(false)}/>
            <div className='flex justify-between p-4 md:p-5'>
                <Navbar className='hidden md:block w-full' isOpen={isCart}/>
                <AlignJustify  className={`${icon} md:hidden`} strokeWidth={1.4} size={40} onClick={()=> setToggle(true)}/>
                <div className='flex gap-2'>
                    <div className="relative">
                        <ShoppingCart className={`${icon}`} strokeWidth={1.4} size={40} onClick={()=> setCart(true)}/>
                        {user && CartLength > 0 && (
                            <div className={`absolute -top-3 -right-2 bg-blue-800 ${CartLength > 10 ? 'p-1' : 'px-2 py-1'} rounded-sm text-xs text-white`}>
                                {CartLength}    
                            </div>
                        )}
                    </div>
                    <Menu>  
                        <MenuButton>
                        <User className={`${icon}`} strokeWidth={1.4} size={40} onClick={()=> setAuth(true)}/> 
                        </MenuButton>
                        {isBuyer && (
                            <MenuItems anchor="bottom" className="bg-white text-sm text-black p-2 -ml-5 rounded-lg w-44">
                                <MenuItem>
                                    <Link className="flex items-center gap-2 p-2 hover:bg-gray-300 rounded-lg" href="/">
                                        <UserPen size={20}/>
                                        Edit Profile
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link className="flex items-center gap-2 p-2 hover:bg-gray-300 rounded-lg" href="/">
                                        <Truck size={20}/>
                                        Orders
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link className="flex items-center gap-2 p-2 hover:bg-gray-300 rounded-lg" href="/">
                                        <Settings size={20}/>
                                        Settings
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link className="flex items-center gap-2 p-2 hover:bg-gray-300 rounded-lg" href="/">
                                        <LogOut size={20}/>
                                        Log out
                                    </Link>
                                </MenuItem>
                            </MenuItems>
                        )}
                    </Menu>
                </div>
            </div>
        </>
    )

}

export default Header