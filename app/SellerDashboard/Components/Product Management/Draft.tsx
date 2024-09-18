import React from 'react'

interface ConditionProps {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    className?: string;
}

export default function Draft({onChange, value, className = ''}: ConditionProps) {
  return (
    <select className={className} name='Draft' value={value}  onChange={onChange}>
    <option disabled value={''} className='border-black'>Draft</option>
    <option className='text-black font-abc font-light'>Date created</option>
    <option className='text-black font-abc font-light'>Incomplete details</option>
    <option className='text-black font-abc font-light'>Scheduled for publishing</option>
    </select>
  )
}