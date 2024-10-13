import React from 'react'
import AuthOnline from './ui/AuthOnline'
import Input, { LoginInput } from './ui/Input'
import IconSide from './ui/IconSide'
import { Mail, LockKeyhole } from 'lucide-react'

const RegistrationForm = () => {
    return (
        <div className="h-screen w-screen flex justify-center items-center sm:h-full sm:w-full">
        <div className='py-5 cursor-default w-3/4 sm:w-full '>
            <div className="flex gap-1 items-center">
                <div className={`w-8 h-8 rounded-full bg-gray-400 bg-[url('https://marketplace.canva.com/EAFvDRwEHHg/1/0/1600w/canva-colorful-abstract-online-shop-free-logo-cpI8ixEpis8.jpg')] bg-cover bg-center`}></div>
                <h1 className='text-blue-800 font-bold'>SajuBazaar</h1>
            </div>

            <h1 className='text-gray-950 font-bold mt-4 text-2xl'>Sign Up for SajuBazaar</h1>  
            <p className='text-xs text-gray-400'>Register as buyer or seller</p>

            {/* <div className='mt-4 text-black'>
                <label>
                    <input type="radio" name="role" value="buyer" /> Buyer
                </label>
                <label className='ml-4'>
                    <input type="radio" name="role" value="seller" /> Seller
                </label>
            </div> */}

        </div>
    </div>
    )
}

export default RegistrationForm
