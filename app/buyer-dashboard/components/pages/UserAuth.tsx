"use client"
import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useForm } from '../../../Auth/StateHandlers/Form'
import { useRouter } from 'next/navigation'
import useAuth from '../../../SellerDashboard/UseAuth/useAuth'
import { useAuthIdentifier } from '../../store/Auth'

interface CartProps {
    isOpen: boolean
    onClose: () => void
}

const UserAuth = ({ isOpen, onClose } : CartProps) => {
    const { setForm } = useForm()
    const [ isBuyer, setUser ] = useState<boolean>(false)
    const { Auth } = useAuthIdentifier()
    const router = useRouter()
    const buttonAuth = 'w-32 py-2 border dark:border-white border-black'
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
            if(user.Role === 'buyer') {
                setUser(true)
            } else {
                setUser(false)
            }
        }
    })

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

    return (
        <div className={`h-screen z-50 bg-gray-200 bg-opacity-65 dark:bg-opacity-90 md:backdrop-blur-sm md:border dark:border-black border-white border-opacity-18 fixed top-0 right-0 w-full md:w-[350px] transition-transform transform text-black p-4 flex flex-col gap-2 dark:bg-black dark:text-white ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-between items-center">
                <h2 className='text-lg font-bold'>Join now!</h2>
                <X className='p-2 border rounded-lg' strokeWidth={1.7} size={40} onClick={onClose}/>
            </div>

            <div className='flex-grow flex flex-col justify-center items-center'>
                {isBuyer && Auth ? (
                    <>
                        <h1>Buyer and token is true</h1>
                    </>
                ) : (
                    <>
                        <button className={buttonAuth} onClick={()=> handleOption('Signin')}>Sign in</button>
                        <h3>or</h3>
                        <button className={buttonAuth} onClick={()=> handleOption('SignUp')}>Sign up</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default UserAuth
