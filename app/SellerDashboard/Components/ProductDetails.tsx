"use client"
import React, { useState } from 'react'
import { CircleChevronLeft, Image } from 'lucide-react'
import Link from 'next/link'
import Input from '../Components/Input'
import TextArea from '../Components/textArea'
import CategoryProduct from '../Components/Category'
import ProductCondition from '../Components/Condition'
import Button from '../Components/Button'
import '../Responsive/AddProducts.css'

export default function ProductDetails() {

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
     <div className="flex min-h-screen">

            <div className="h-screen pt-10 pl-0 md:flex gap-4 justify-center ">

             <Link href={'/SellerDashboard/Home'} className='h-10'>
            <div className="items-center gap-1 hidden xl:block">
            <CircleChevronLeft size={32}/>
            <p>Back</p>
            </div>
            </Link> 

            <div className="ml-5 mt-10 flex flex-col w-96 Products h-auto xl:h-3/4 bg-white p-2" style={{filter: 'drop-shadow(-9px 9px 0px #000000)'}}>
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

                    <div className="flex flex-col w-96 h-96 Products mt-10 parent pl-10 pb-10 md:pl-0">
                        <div className="w-full h-full bg-white flex flex-col justify-center items-center ImageRes">
                            <Image size={87} color='gray'/>
                            <h1>Upload Product image</h1>
                        </div>

                        <div className="flex justify-end mt-4">
                            <Button className='px-4 py-1 rounded-lg font-abc font-bold text-sm h-10 w-24'>Cancel</Button>
                            <Button className='px-4 py-1 rounded-lg font-abc font-bold text-white w-24 bg-blue-800 text-sm'>Submit</Button>
                        </div>
                    </div>
            </div>
         </div>
    </>
  )
}
