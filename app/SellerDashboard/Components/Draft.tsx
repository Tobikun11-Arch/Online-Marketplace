import React from 'react'

interface ConditionProps {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

export default function Draft({onChange, value}: ConditionProps) {
  return (
    <select className="select border-slate-950 text-black bg-white mt-3 w-full" name='Draft' value={value}  onChange={onChange}>
    <option disabled value={''} className='border-black'>Draft</option>
    <option className='text-black font-abc font-light'>Date created</option>
    <option className='text-black font-abc font-light'>Last updated
    </option>
    <option className='text-black font-abc font-light'>Incomplete details</option>
    <option className='text-black font-abc font-light'>Category</option>
    <option className='text-black font-abc font-light'>Scheduled for publishing</option>
    </select>
  )
}