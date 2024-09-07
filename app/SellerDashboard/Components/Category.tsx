import React from 'react'

interface categoryProps {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

export default function Category({onChange, value}: categoryProps) {
  return (

    <select className="select border-slate-950 text-black bg-white mt-3 w-96" value={value}  onChange={onChange}>
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


{/* <select className="select text-white border-slate-400 bg-transparent w-1/2 mt-3" value={option || ''} onChange={HandleOption}>
  <option disabled selected value={''}>Buyer or Seller</option>
  <option className='text-black'>Buyer</option>
  <option className='text-black'>Seller</option>
</select> */}