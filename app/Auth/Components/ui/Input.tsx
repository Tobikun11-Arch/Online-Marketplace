import React from 'react'

interface InputProps {
    type?: string;
    className?: string;
    defaultChecked?: boolean;
    placeholder?: string;
}

const Input = ({type, className, defaultChecked, placeholder}: InputProps) => {
    return (
        <input className={className} type={type} defaultChecked={defaultChecked} placeholder={placeholder}/>
    )
}

export const LoginInput = 'w-full text-black bg-white border outline-none border-gray-300 rounded-md h-10 pl-10 pr-1';
export const SingUpInput = 'w-full text-black bg-white border outline-none border-gray-300 rounded-md h-10 pl-10 pr-10';
export default Input
