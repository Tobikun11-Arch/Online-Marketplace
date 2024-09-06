import React from 'react'
import { Plus } from 'lucide-react'
import Link from 'next/link';

interface Products {
    onClick: ()=> void;
    label: string;
    href: string;
}

export default function AddProduct({ onClick, label, href }: Products) {
  return (
    <Link href={href}>
    <div onClick={onClick} className='w-full flex py-2 pr-2 pl-1 rounded-md border-2 border-gray-300 mt-4 justify-between'>
      <p className='font-abc'>{label}</p>
      <Plus />
    </div>
    </Link>
  )
}
