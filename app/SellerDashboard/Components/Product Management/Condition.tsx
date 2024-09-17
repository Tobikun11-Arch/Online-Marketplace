import React from 'react'

interface ConditionProps {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

export default function Category({onChange, value}: ConditionProps) {
  return (

    <select className="select border-slate-950 text-black bg-white mt-3 w-full" value={value}  onChange={onChange}>
    <option disabled value={''} className='border-black'>Condition</option>
    <option className='text-black font-abc font-light'>New</option>
    <option className='text-black font-abc font-light'>Refurbished</option>
    <option className='text-black font-abc font-light'>Used</option>
    </select>

  )
}