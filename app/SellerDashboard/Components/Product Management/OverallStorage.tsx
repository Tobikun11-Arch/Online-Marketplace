import React from 'react'

interface ConditionProps {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    className?: string;
}

export default function OverallStorage({onChange, value, className = ''}: ConditionProps) {
  return (

    <select value={value} className={className} onChange={onChange} name='OverallStorage'>
    <option disabled value={''} className='border-black'>All</option>
    <option className='text-black font-abc font-light'>Latest</option>
    <option className='text-black font-abc font-light'>Oldest</option>
    </select>

  )
}
