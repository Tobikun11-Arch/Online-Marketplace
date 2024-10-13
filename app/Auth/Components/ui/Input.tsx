import React from 'react'

interface InputProps {
    type?: string;
    className?: string;
    defaultChecked?: boolean;
}

const Input = ({type, className, defaultChecked}: InputProps) => {
    return (
        <input className={className} type={type} defaultChecked={defaultChecked}/>
    )
}

export const LoginInput = 'w-full text-black bg-white border outline-none border-gray-300 rounded-md h-10 pl-10 pr-1';

export default Input
