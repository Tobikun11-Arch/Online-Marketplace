import React from 'react'

interface ConditionProps {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

export default function OverallStorage({onChange, value}: ConditionProps) {
  return (

    <select className="select border-slate-950 text-black bg-white mt-3 w-full" value={value}  onChange={onChange} name='OverallStorage'>
    <option disabled value={''} className='border-black'>All</option>
    <option className='text-black font-abc font-light'>Latest</option>
    <option className='text-black font-abc font-light'>Oldest</option>
    </select>

  )
}