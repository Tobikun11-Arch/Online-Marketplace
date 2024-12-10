import React from 'react'
import { ShoppingCart, User, AlignJustify, UserPen, Truck, LogOut } from 'lucide-react'
import { useToggle } from '../../store/useToggle'
import Sidebar from './Sidebar'
import { useUser, useUserCart, useBuyer } from '../../store/User'
import CartComponent from '../pages/CartComponent'
import Navbar from './Navbar'
import UserAuth from '../pages/UserAuth'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Signout } from '../../../SellerDashboard/axios/axios'
import { useUserForms } from '../../store/User'
import EditProfileForm from '../../user/EditProfileForm'

const Header = () => {
    const { setToggle, isCart, isToggle, setCart, setAuth, isAuth,  } = useToggle()
    const icon = 'p-2.5 border rounded-lg'
    const { CartLength } = useUserCart()
    const { user } = useUser()
    const { isBuyer, setBuyer } = useBuyer()
    const router = useRouter()
    const { setEdit } = useUserForms()

    const handleSignOut = async () => {
        try {
            const response = await Signout.post('', {}, { withCredentials: true });
            const { message } = response.data;
            if(message === 'Signed out successfully!'){ 
                router.push('/buyer-dashboard/SigningOut')
                setBuyer(false)
            }
        } catch (error) {
            console.error("Error during signout:", error);
        }
    }

    return (
        <>
            <EditProfileForm/>
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
                        <User className={`${icon}`} strokeWidth={1.4} size={40} onClick={()=> setAuth(!isAuth)}/> 
                        </MenuButton>
                        {isBuyer && (
                            <MenuItems anchor="bottom" className=" dark:bg-opacity-90 dark:backdrop-blur-sm text-sm backdrop-blur-md md:border dark:border-black dark:bg-black dark:text-white p-2 mt-1 -ml-5 rounded-lg w-40">
                                <MenuItem>
                                    <Link className="flex items-center gap-2 p-2 hover:bg-gray-400 dark:hover:bg-[#3333] rounded-lg" href="" onClick={()=> setEdit(true)}>
                                        <UserPen size={20}/>
                                        Edit Profile
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link onClick={handleSignOut} className="flex items-center gap-2 p-2 hover:bg-gray-400 dark:hover:bg-[#3333] rounded-lg" href="/">
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