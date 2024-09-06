"use client"
import React, { useState } from 'react'
import NavBar from '../Components/NavBar'
import { CircleChevronLeft } from 'lucide-react'
import Link from 'next/link'
import Input from '../Components/Input'
import TextArea from '../Components/textArea'

export default function page() {

    const [formData, setFormdata] = useState({
        productName: '',
        description: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormdata({ ...formData, [name]: value });
      };

  return (
   <>
    <div className="flex">
    <NavBar />

        <div className="flex flex-col mt-5 ml-10">

        <Link href={'/SellerDashboard/Home'}>
        <div className="flex items-center gap-1">
        <CircleChevronLeft size={32}/>
        <span>Back</span>
        </div>
        </Link> 

        <div className="ml-5 mt-10 flex flex-col">
        <h1 className='foont-abc font-bold text-3xl cursor-default'>Add new Product</h1>

        <Input
        value={formData.productName}
        onChange={handleChange}
        placeholder='Product Name'
        name='productName'
        id='productName'
        />

        <TextArea  
        name='description'
        id='description'
        placeholder='Enter product description (200 characters max)'
        length={200}
        rows={5}
        onChange={handleChange}
        value={formData.description}
        />    

        </div>
        </div>

    </div>
   </>
  )
}
