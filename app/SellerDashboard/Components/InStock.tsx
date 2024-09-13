import React from 'react'

interface ConditionProps {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

export default function Instock({onChange, value}: ConditionProps) {
  return (
    <select className="select border-slate-950 text-black bg-white mt-3 w-full" name='Stock' value={value}  onChange={onChange}>
    <option disabled value={''} className='border-black'>In stock</option>
    <option className='text-black font-abc font-light'>Price range</option>
    <option className='text-black font-abc font-light'>Category</option>
    <option className='text-black font-abc font-light'>Discounted items</option>
    <option className='text-black font-abc font-light'>Featured products</option>
    </select>
  )
}