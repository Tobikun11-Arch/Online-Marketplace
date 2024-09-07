"use client"
import React, { useState } from 'react'
import NavBar from '../Components/NavBar'
import { CircleChevronLeft, Image } from 'lucide-react'
import Link from 'next/link'
import Input from '../Components/Input'
import TextArea from '../Components/textArea'
import CategoryProduct from '../Components/Category'
import ProductCondition from '../Components/Condition'
import Button from '../Components/Button'
import '../Responsive/Responsive.css'

    // 450PX naiwan

export default function Page() {

    const [formData, setFormdata] = useState({
        productName: '',
        description: '',
        productPrice: '',
    })

    const [Category, setCategory] = useState<string | null>(null)
    const [Condition, setCondition] = useState<string | null>(null)


    const HandleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value)
    }

    const HandleCondition = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCondition(event.target.value)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormdata({ ...formData, [name]: value });
        if(name === "productPrice") {
            const inputValue = e.target.value;
            if (/^\d*$/.test(inputValue)) {
                console.log('if it was no text')
                setFormdata({...formData, [name]: inputValue});   
            } 
            else {
                setFormdata({...formData, [name]: ''});
            }
        }
        
    };

    const HandleSave = () => {
        console.table({
            "Product details": formData,
            "Category: ": Category
        })
    }

    return (
     <>
        <div className="flex">
         <NavBar />
            <div className='main pb-10'>
            <div className="flex flex-col mt-5 ml-10">

            <Link href={'/SellerDashboard/Home'}>
            <div className="items-center gap-1 ml-6 hidden xl:block">
            <CircleChevronLeft size={32}/>
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

            <Input
            value={formData.productPrice}
            onChange={handleChange}
            placeholder='Price'
            name='productPrice'
            id='productPrice'
            />   

            <CategoryProduct
            onChange={HandleCategory}
            value={Category || ''}
            />

            <ProductCondition
            value={Condition || ''}
            onChange={HandleCondition}
            />
           </div>
           </div>

           {/*Product Image */}
            <main>
                <div className="w-96 h-96 bg-gray-200 Mtop ml-12 flex flex-col          justify-center items-center mr-4 mt-10">
                    <Image size={87} color='gray'/>
                    <h1>Upload Product image</h1>
                </div>

                <div className="Publish-Button flex w-full justify-end mt-4 pr-4">
                   <Button className='px-4 py-1 rounded-lg font-abc font-bold text-sm'>Cancel</Button>
                   <Button className='px-4 py-1 rounded-lg font-abc font-bold text-white bg-blue-800 text-sm'>Submit</Button>
                </div>

                </main>
                </div>

                <div className="w-72 ml-6 h-screen bg-white hidden 2xl:block">
                    <div className="bg-white w-full h-2/4 rounded-b-full border-2 border-black" style={{filter: 'drop-shadow((15px 14px 0px #000000)'}}>
                        <h1 className='font-abc font-bold text-xl mt-5 ml-2'>Top Sellers:</h1>
                    </div>  
                </div>
        </div>
     </>
    )
}