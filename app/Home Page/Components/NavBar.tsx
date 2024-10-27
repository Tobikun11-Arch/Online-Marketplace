"use client"
import React, { useCallback, useState, useEffect } from 'react'
import { User } from 'lucide-react'
import MenuProps from '../Components/ui/Menu'
import { useOpen } from '../State Handlers/StateHnadler'
import Theme from './ui/Theme'
import { useTokenValidation } from '../../userData/TokenValidation'
import OptionWrapper from './ui/OptionWrapper'
import { useForm } from '../../Auth/StateHandlers/Form'
import { LogOut, LogIn, UserPlus  } from 'lucide-react';
import { Signout } from '../../SellerDashboard/axios/axios'
import { useRouter } from 'next/navigation'
import { useLoading } from '../../SellerDashboard/hooks/ReusableHooks'
import { square } from 'ldrs'
import SquareLoading from '../../SellerDashboard/Components/Product Management/Loading/SquareLoading'

const NavBar = () => {
    const { isOpen, setOpen }= useOpen()
    const [ isUser, setUser ] = useState<boolean>(false)
    const { isToken, setToken } = useTokenValidation()
    const { setLoading, isLoading } = useLoading()
    const { setForm } = useForm()
    const router = useRouter()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            square.register()
        }
    }, []);

    const toggleMenu = useCallback(()=> {
        setOpen(!isOpen)
    }, [isOpen])

    const handleOption = (Option: string) => {
        if(Option === 'SignUp') {
            setForm(true)
            router.push('/Auth')
        }
        else {
            setForm(false)
            router.push('/Auth')
        }
    }
    const handleSignOut = async () => {
        setLoading(true)
        try {
            const response = await Signout.post('', {}, { withCredentials: true });
            const { message } = response.data;
            if(message === 'Signed out successfully!'){ 
                setToken(false)
                setLoading(false)
            }
            } catch (error) {
                console.error("Error during signout:", error);
                setLoading(false)
            }
        }

    return (
        <>
        <SquareLoading/>
        <div className='h-20 flex justify-end md:justify-between items-center px-4 md:px-12 cursor-default'>
            {/* <div className="Menu flex gap-1 md:hidden">
                {isOpen ? (
                    ''
                ) : (
                    <Menu size={28} strokeWidth={1.5} className='md:hidden' onClick={toggleMenu}/>
                )}
            </div>  docs for next possible project if i will use burger for mobile view*/} 
            <h1 className='text-gray-500 font-medium text-2xl hidden md:block pb-1 dark:text-white'>Saju<span className='text-blue-800'>Baz</span>aar</h1>
            <div className="flex items-center gap-6">
                <User size={20} strokeWidth={1.5} onClick={()=> setUser(!isUser)} className='z-50'/>
                <Theme/>
            </div>
            {isUser && (<>
                    <div className='h-auto bg-transparent w-24 z-10 fixed md:right-10'>
                        {isToken ? (
                            <OptionWrapper>
                                <button className='bg-blue-800 text-white font-semibold px-2 py-2 rounded-md text-sm flex items-center justify-center gap-1 mt-16' onClick={handleSignOut}>
                                    <LogOut size={15}/>
                                    <p>Sign out</p>
                                </button>
                            </OptionWrapper>
                        ):
                        (
                        <OptionWrapper>
                            <div className='gap-1 flex flex-col mt-24 sm:mt-28'>
                                <button className='bg-blue-800 text-white font-semibold px-2 py-1 rounded-md text-sm sm:px-3 sm:py-2 flex items-center justify-center gap-1' onClick={()=> handleOption('SignUp')}>
                                    <UserPlus  size={15}/>
                                    <p>Sign up</p> 
                                </button>
                                <button className='bg-blue-800 text-white font-semibold px-2 py-1 rounded-md text-sm sm:px-4 sm:py-2 flex items-center justify-center gap-1' onClick={()=> handleOption('Login')}>
                                    <LogIn size={15}/>
                                    <p>Login</p>
                                </button>
                            </div>
                        </OptionWrapper>
                        )}
                    </div>
                </>)}

            {/* {isOpen && (
                <>
                    <div className="fixed inset-0 bg-white dark:bg-gray-950 z-40" onClick={toggleMenu}></div>
                    <MenuProps className={`fixed inset-0 flex items-center justify-center z-50 flex-col gap-2`} />
                </>
            )} */}
        </div>
        </>
    )
}

export default NavBar
