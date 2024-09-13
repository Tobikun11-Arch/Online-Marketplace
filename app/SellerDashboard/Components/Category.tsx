import React from 'react'

interface categoryProps {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

export default function Category({onChange, value}: categoryProps) {
  return (

    <select className="select border-slate-950 text-black bg-white mt-3 w-full" value={value}  onChange={onChange}>
    <option disabled value={''} className='border-black'>Category</option>
    <option className='text-black font-abc font-light'>Electronics</option>
    <option className='text-black font-abc font-light'>Home & Kitchen</option>
    <option className='text-black font-abc font-light'>Fashion</option>
    <option className='text-black font-abc font-light'>Health & Beauty</option>
    <option className='text-black font-abc font-light'>Sports & Outdoors</option>
    <option className='text-black font-abc font-light'>Toys & Games</option>
    <option className='text-black font-abc font-light'>Automotive</option>
    <option className='text-black font-abc font-light'>Office Supplies</option>
    <option className='text-black font-abc font-light'>Books & Media</option>
    <option className='text-black font-abc font-light'>Food & Beverages</option>
    <option className='text-black font-abc font-light'>Pet Supplies</option>
    <option className='text-black font-abc font-light'>Garden & Outdoor</option>
    <option className='text-black font-abc font-light'>Crafts & Hobbies</option>
    </select>

  )
}

