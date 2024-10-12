import React from 'react'
import AuthOnline from './ui/AuthOnline'

const Form = () => {
    return (
        <div className='p-5 cursor-default'>
            <div className="flex gap-1 items-center">
                <div className={`w-8 h-8 rounded-full bg-gray-400 bg-[url('https://marketplace.canva.com/EAFvDRwEHHg/1/0/1600w/canva-colorful-abstract-online-shop-free-logo-cpI8ixEpis8.jpg')] bg-cover bg-center`}></div>
                <h1 className='text-blue-800 font-bold'>SajuBazaar</h1>
            </div>

            <h1 className='text-gray-950 font-bold mt-8 text-2xl font-abc'>Log in to your Account</h1>
            <p className='text-xs text-gray-400'>Welcome back! Select method to log in:</p>
            <AuthOnline/>
            <p className='text-gray-400 text-sm flex justify-center mt-5'>or continue with email</p>
        </div>
    )
}

export default Form
