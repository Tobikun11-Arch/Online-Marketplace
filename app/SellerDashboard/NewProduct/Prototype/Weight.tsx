import React from 'react'

interface ConditionProps {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    className?: string;
}

export default function Weight({onChange, value, className = ''}: ConditionProps) {
  return (
    <select className={className} name='Stock' value={value}  onChange={onChange}>
    <option value={''} className='border-black'>kg</option>
    <option className='text-black font-abc font-light'>lbs</option>
    <option className='text-black font-abc font-light'>g</option>
    <option className='text-black font-abc font-light'>oz</option>
    </select>
  )
}