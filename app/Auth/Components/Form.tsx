import React from 'react'
import AuthOnline from './ui/AuthOnline'
import Input, { LoginInput } from './ui/Input'
import IconSide from './ui/IconSide'
import { Mail, LockKeyhole } from 'lucide-react'


const Form = () => {
    return (
        <div className="h-screen w-screen flex justify-center items-center sm:h-full sm:w-full">
            <div className='py-5 cursor-default w-3/4 sm:w-full'>
                <div className="flex gap-1 items-center">
                    <div className={`w-8 h-8 rounded-full bg-gray-400 bg-[url('https://marketplace.canva.com/EAFvDRwEHHg/1/0/1600w/canva-colorful-abstract-online-shop-free-logo-cpI8ixEpis8.jpg')] bg-cover bg-center`}></div>
                    <h1 className='text-blue-800 font-bold'>SajuBazaar</h1>
                </div>

                <h1 className='text-gray-950 font-bold mt-8 text-2xl font-abc'>Log in to your Account</h1>  
                <p className='text-xs text-gray-400'>Welcome back! Select method to log in:</p>
                <AuthOnline/>
                <p className='text-gray-400 text-sm flex justify-center mt-5'>or continue with email</p>
                <div className="flex flex-col gap-3 mt-3">
                    <IconSide Icon={Mail} color='gray'>
                        <Input type="text" className={`${LoginInput}`}/>
                    </IconSide>

                    <IconSide Icon={LockKeyhole} color='gray'>
                        <Input type="password" className={`${LoginInput}`}/>
                    </IconSide>
                </div>
                <div className="flex justify-between">
                    <Input type="checkbox" defaultChecked className="checkbox checkbox-sm"></Input>
                </div>
            </div>
        </div>
    )
}

export default Form
