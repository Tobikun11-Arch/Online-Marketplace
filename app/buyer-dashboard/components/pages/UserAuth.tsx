"use client"
import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { useForm } from '../../../Auth/StateHandlers/Form'
import { useRouter } from 'next/navigation'
import { lineSpinner } from 'ldrs'
import IsAuth from '../../IsAuth'
import { useUser, useBuyer } from '../../store/User'
interface CartProps {
    isOpen: boolean
    onClose: () => void
}

const UserAuth = ({ isOpen, onClose } : CartProps) => {
    const { setForm } = useForm()
    const { isBuyer, setBuyer } = useBuyer()
    const { setuser, user } = useUser()
    const router = useRouter()
    IsAuth()

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Disable scrolling
        } else {
            document.body.style.overflow = 'unset'; // Enable scrolling
        }
        
        return () => {
            document.body.style.overflow = 'unset'; // Cleanup on unmount
        };
    }, [isOpen]);

    useEffect(()=> {
        const users = localStorage.getItem('user')
        if(users){
            const user = JSON.parse(users)
            setuser(user)
            if(user.Role === 'buyer') {
                setBuyer(true)
            } else {
                setBuyer(false)
            }
        }
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

    useEffect(() => {
        if (typeof window !== 'undefined') {
            lineSpinner.register()
        }
    }, [])

    return (
        <>
            {!isBuyer && (
                <>
                    <div className={`h-screen z-50 bg-gray-200 bg-opacity-65 dark:bg-opacity-90 dark:backdrop-blur-sm backdrop-blur-md md:border dark:border-black border-white border-opacity-18 fixed top-0 right-0 w-full md:w-[350px] transition-transform transform text-black p-4 flex flex-col gap-2 dark:bg-black dark:text-white ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div className="flex justify-between items-center">
                            {user && (
                                <h2 className='text-lg font-bold'>{isBuyer ? `Welcome ${user.Username}` : 'Join now!'}</h2>
                            )}
                            <X className='p-2 border rounded-lg' strokeWidth={1.7} size={40} onClick={onClose}/>
                        </div>
                        <div className='flex-grow flex flex-col justify-center items-center'>
                            <h1 className='text-2xl font-bold'>Foundation for Your Marketplace Platform</h1>
                            <h5 className='mt-1 text-gray-400'><span className='text-blue-600'>Sajuubazaar</span> is an open-source platform for building and customizing online marketplaces, offering powerful tools to connect buyers and sellers and manage product listings with ease.</h5>

                            <div className='flex gap-2 mt-14'>
                                <button className='py-2 w-20 text-sm font-medium bg-black rounded-md text-white dark:text-black dark:bg-white' onClick={()=> handleOption('Signin')}>Sign In</button>
                                <button className='py-2 w-20 text-sm font-medium bg-transparent rounded-md text-black dark:text-white border border-gray-500' onClick={()=> handleOption('SignUp')}>Sign Up</button> 
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default UserAuth