import React from 'react'

interface ConditionProps {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    className?: string;
}

export default function Instock({onChange, value, className = ''}: ConditionProps) {
  return (
    <select className={className} name='Stock' value={value}  onChange={onChange}>
    <option disabled value={''} className='border-black'>In stock</option>
    <option className='text-black font-abc font-light'>Price range</option>
    <option className='text-black font-abc font-light'>Discounted items</option>
    <option className='text-black font-abc font-light'>Featured products</option>
    </select>
  )
}