import React from 'react'

interface ConditionProps {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

export default function OutofStock({onChange, value}: ConditionProps) {
  return (
    <select className="select border-slate-950 text-black bg-white mt-3 w-full" name='OutofStock' value={value}  onChange={onChange}>
    <option disabled value={''} className='border-black'>Out of stock</option>
    <option className='text-black font-abc font-light'>Date added</option>
    <option className='text-black font-abc font-light'>Restock date</option>
    </select>
  )
}