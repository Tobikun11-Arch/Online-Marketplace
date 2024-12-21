import React from 'react'

interface detailsProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  id: string;
}

export default function ProductDetails({ placeholder, onChange, value, name, id }: detailsProps) {
  return (
    <input type="text" placeholder={placeholder} onChange={onChange} value={value} className='bg-white outline-none border-2 border-gray-400 p-2 rounded-lg mt-5 w-full' name={name} id={id} required/>
  )
}
