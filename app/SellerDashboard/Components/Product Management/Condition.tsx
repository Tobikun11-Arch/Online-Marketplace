import React from 'react'

interface ConditionProps {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    className: string;
}

export default function Category({onChange, value, className = ''}: ConditionProps) {
  return (

    <select className={className} value={value}  onChange={onChange}>
    <option disabled value={''} className='border-black'>Condition</option>
    <option className='text-black font-abc font-light'>New</option>
    <option className='text-black font-abc font-light'>Refurbished</option>
    <option className='text-black font-abc font-light'>Used</option>
    </select>

  )
}
