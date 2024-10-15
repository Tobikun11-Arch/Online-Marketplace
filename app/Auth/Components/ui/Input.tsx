import React from 'react'

interface InputProps {
    type?: string;
    className?: string;
    defaultChecked?: boolean;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({type, className, defaultChecked, placeholder, value, onChange}: InputProps) => {
    return (
        <input className={className} value={value} onChange={onChange} type={type} defaultChecked={defaultChecked} placeholder={placeholder}/>
    )
}

export const LoginInput = 'w-full text-black bg-white border outline-none border-gray-300 rounded-md h-10 pl-10 pr-1 text-sm font-normal';
export const SingUpInput = 'w-full text-black bg-white border outline-none border-gray-300 rounded-md h-10 pl-10 pr-10 text-sm';
export default Input
