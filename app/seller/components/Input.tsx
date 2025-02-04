import React from 'react'

interface InputProps {
    Type: React.HTMLInputTypeAttribute,
    placeholder?: string
    onchange?: React.ChangeEventHandler<HTMLInputElement>
    value?: string | number | readonly string[]
}

export default function Input({ Type, placeholder, onchange, value }: InputProps) {
    return (
        <>
            <input type={Type} placeholder={placeholder} onChange={onchange} value={value} className='w-full bg-gray-100 rounded-md h-9 mt-1 font-medium text-xs px-2 outline-none'/>
        </>
    )
}
