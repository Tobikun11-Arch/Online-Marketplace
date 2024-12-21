import React from 'react'

interface ConditionProps {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    className?: string;
}

export default function OutofStock({onChange, value, className = ''}: ConditionProps) {
  return (
    <select className={className} name='OutofStock' value={value}  onChange={onChange}>
    <option disabled value={''} className='border-black'>Out of stock</option>
    <option className='text-black font-abc font-light'>Date added</option>
    <option className='text-black font-abc font-light'>Restock date</option>
    </select>
  )
}