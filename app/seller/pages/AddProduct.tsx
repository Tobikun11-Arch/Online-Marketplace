import React, { useRef } from 'react' 
import { Store, Check, Save, Plus } from 'lucide-react'
import SizeUi from '../components/add-product-components/SizeUi'
import QualityComponents from '../components/add-product-components/Quality'
import { productDetails } from '../state/add-product-state/ProductDetails'
import { useSize } from '../state/add-product-state/Size'
import Image from 'next/image'
import SubImage from '../components/add-product-components/SubImage'
import { useImages } from '../state/add-product-state/ProductDetails'

export default function AddProduct() {
    const { setisProductName, isProductName, setDescription, isDescription, setSku, isSku, setPrice, isPrice, setStock, isStock, setDiscount, isDiscount, isQuality } = productDetails()
    const { isSubImage_01, isSubImage_02, isSubImage_03, setSubImage_01, setSubImage_02, setSubImage_03 } = useImages();
    const { isSize } = useSize()
    const imgParent = 'relative w-full h-96 mt-2 md:h-[300px] flex flex-col justify-center items-center md:mb-0 bg-[#EFEFEF] rounded-md'
    const imgSubParent = 'relative w-3/4 h-3/4 aspect-w-1 aspect-h-1'
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddProduct = () => {
        const product_details = {
            product_name: isProductName,
            status: "Published",
            description: isDescription,
            sku: isSku,
            price: isPrice,
            stock: isStock,
            discount: isDiscount,
            quality: isQuality,
            size: isSize,
        };
    
        console.log(product_details); 
    };

    const handleDivClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result as string; 

                if (!isSubImage_01) {
                    setSubImage_01(base64String);
                } else if (!isSubImage_02) {
                    setSubImage_02(base64String);
                } else if (!isSubImage_03) {
                    setSubImage_03(base64String)
                } else {
                    console.log("All image slots are occupied.");
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='px-2 py-5 sm:pl-16 sm:pr-4 lg:px-10 xl:px-12'>
            <div className='flex justify-end sm:justify-between items-center'>
                <div className='hidden sm:flex gap-1 items-center'>
                    <Store/>
                    <h1 className='font-semibold text-[#45984d]'>Add New Product</h1>
                </div>
                <div className='flex gap-2'>
                    <button className='shadow-md py-2 px-3 flex items-center gap-1 rounded-xl text-xs font-semibold'>
                        <Save size={17}/>
                        Save Draft
                    </button>
                    <button className='flex items-center gap-1 bg-[#A0EDA8] shadow-md py-2 text-xs px-3 rounded-xl font-semibold' onClick={handleAddProduct}>
                        <Check size={17}/>
                        Add Product
                    </button>
                </div>
            </div>
            <div className='Group flex gap-8'>
                <div className='first-box w-3/5 mt-10'>
                    <div className='bg-[#f7f6f6] rounded-lg p-4 shadow-md'>
                        <h1 className='font-semibold'>General Information</h1>
                        <h4 className='text-sm mt-3 font-normal'>Name Product</h4>
                        <input type="text" className='w-full bg-[#EFEFEF] mt-1 rounded-md h-9 text-gray-500 outline-none px-2 text-sm' value={isProductName} onChange={(e)=> setisProductName(e.target.value)}/>
                        <h4 className='text-sm mt-3 font-normal'>Product Description</h4>
                        <textarea name="" id="" className='w-full mt-1 px-2 rounded-md py-1 text-gray-500 text-sm h-36 resize-none bg-[#EFEFEF] outline-none' value={isDescription} onChange={(e)=> setDescription(e.target.value)}></textarea>
                        <div className='flex gap-2 mt-2'>
                            <div className='w-full'>
                                <h1 className='text-sm font-normal'>Size</h1>
                                <h3 className='text-xs text-gray-400 font-medium'>Pick Available Size</h3>
                                <SizeUi/>
                            </div> 
                            <div className='w-full'>
                                <div className='flex items-center gap-1'>
                                    <h1 className='text-sm font-normal'>Sku</h1>
                                    <h3 className='text-xs text-gray-400 font-medium'>(optional)</h3>
                                </div>
                                <h3 className='text-xs text-gray-400 font-medium'>SKU (Stock Keeping Unit)</h3>
                                <input type="text" className='w-full bg-[#EFEFEF] mt-1 rounded-md h-9 text-gray-500 outline-none px-2 text-sm' value={isSku} onChange={(e)=> setSku(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className='bg-[#f7f6f6] rounded-lg p-4 shadow-md mt-5'>
                        <h1 className='font-semibold '>Pricing and Stock</h1>
                        <div className='flex gap-2 mt-3 w-full'>
                            <div className='w-full'>
                                <h4 className='text-sm font-normal'>Price</h4>
                                <input type="text" className='w-full bg-[#EFEFEF] mt-1 rounded-md h-9 text-gray-500 outline-none px-2 text-sm' value={isPrice} onChange={(e)=> {
                                const value = e.target.value; 
                                    if (value === "") {
                                        setPrice(0); 
                                    } else {
                                        const parsedValue = parseFloat(value); 
                                        if (!isNaN(parsedValue)) {
                                            setPrice(parsedValue); 
                                        }
                                    }
                                }}/>
                            </div>
                            <div className='w-full'>
                                <h4 className='text-sm font-normal'>Stock</h4>
                                <input type="text" className='w-full bg-[#EFEFEF] mt-1 rounded-md h-9 text-gray-500 outline-none px-2 text-sm' value={isStock} onChange={(e)=> {
                                const value = e.target.value; 
                                    if (value === "") {
                                        setStock(0); 
                                    } else {
                                        const parsedValue = parseFloat(value); 
                                        if (!isNaN(parsedValue)) {
                                            setStock(parsedValue); 
                                        }
                                    }
                                }}/>
                            </div>
                        </div>
                        <div className='flex gap-2 mt-5 w-full'>
                            <div className='w-full'>
                                <h4 className='text-sm font-normal'>Discount</h4>
                                <input type="text" className='w-full bg-[#EFEFEF] mt-1 rounded-md h-9 text-gray-500 outline-none px-2 text-sm' value={isDiscount} onChange={(e)=> {
                                const value = e.target.value; 
                                    if (value === "") {
                                        setDiscount(0); 
                                    } else {
                                        const parsedValue = parseFloat(value); 
                                        if (!isNaN(parsedValue)) {
                                            setDiscount(parsedValue); 
                                        }
                                    }
                                }}/>
                            </div>
                            <div className='w-full'>
                                <h4 className='text-sm font-normal'>Quality</h4>
                                <QualityComponents/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='second-box w-2/5 mt-10'>
                    <div className='bg-[#f7f6f6] rounded-lg p-4 shadow-md'>
                        <h1 className='font-semibold'>Upload Product</h1>
                        <div className={imgParent}>
                            <div className={imgSubParent}>
                                <Image
                                fill
                                src={isSubImage_01 ? isSubImage_01 : '/assets/sub_img.png'}
                                alt='First Index'
                                className="object-contain object-center"
                                placeholder = 'blur'
                                blurDataURL='add new url later'
                                />
                            </div>
                        </div>
                        <div className="mt-2 flex w-full gap-2 ">
                            <SubImage
                            src={isSubImage_01}
                            alt='sum image 1'
                            />
                            <SubImage
                            src={isSubImage_02}
                            alt='sum image 1'
                            />
                            <SubImage
                            src={isSubImage_03}
                            alt='sum image 1'
                            />
                            <div className="w-full h-28 flex justify-center items-center rounded-md border-4 border-dashed border-gray-500 mt-2" onClick={handleDivClick}>
                                <div className='flex justify-center items-center rounded-full p-1 bg-[#37c242]'>
                                    <Plus color='white'/>
                                </div>
                                <input
                                    id="picture"
                                    type="file"
                                    accept=".png"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
