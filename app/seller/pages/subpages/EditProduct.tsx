import React, { useEffect, useState } from 'react'
import { useProducts } from '../../state/manage-products/Products'
import { useProductId } from '../../state/manage-products/ViewProduct'
import { Product } from '../../types/product'
import Image from 'next/image'
import { useSideBarState } from "../../state/Sidebar"
import { CircleChevronLeft, Save, Check } from 'lucide-react'
import { useImages } from '../../state/add-product-state/ProductDetails'
import SubImage from '../../components/add-product-components/SubImage'

export default function EditProduct() {
    const { isResult } = useProducts()
    const { product_id } = useProductId()
    const [ products, setproducts ] = useState<Product[]>([])
    const { setActiveTab } = useSideBarState()
    const imgParent = 'relative w-full h-96 mt-2 md:h-[300px] flex flex-col justify-center items-center md:mb-0 bg-[#EFEFEF] rounded-md'
    const imgSubParent = 'relative w-3/4 h-3/4 aspect-w-1 aspect-h-1'
    const { isSelected, setSelected } = useImages()

    useEffect(()=> {
        console.log("Id: ", product_id)
        const filtered = isResult.filter((product)=> product._id === product_id)
        setproducts(filtered)
        console.log("Filtered data: ", filtered)
    }, [isResult])

    return (
        <>
        {
            products.map((product, index)=> (
                <div key={index} className='px-6 pt-5 pb-16 sm:px-2 sm:py-5 sm:pl-16 sm:pr-4 lg:px-5 xl:px-12'>
                <div className='flex justify-end sm:justify-between items-center'>
                    <div className='flex gap-1 items-center' onClick={()=> setActiveTab('Manage Products')}>
                        <CircleChevronLeft />
                        <h1 className='font-semibold text-[#45984d]'>Back</h1>
                    </div>
                    {product.status !== "draft" ? 
                        <div className='flex gap-2'>
                            <button className='shadow-md py-2 px-3 flex items-center gap-1 bg-[#A0EDA8] rounded-xl text-xs text-black font-semibold' onClick={()=> console.log('Save Changes')}>
                                <Save size={17}/>
                                Save Changes
                            </button>
                        </div>  :  
                        <div className='flex gap-2'>
                            <button className='shadow-md py-2 px-3 flex items-center gap-1 rounded-xl text-xs font-semibold' onClick={()=> console.log('Save Changes')}>
                                <Save size={17}/>
                                Save Changes
                            </button>
                            <button className='flex items-center gap-1 bg-[#A0EDA8] shadow-md py-2 text-xs px-3 rounded-xl font-semibold' onClick={()=> console.log('Publish')}>
                                <Check size={17}/>
                                Publish
                            </button>
                        </div>
                }
                </div>
                <div className='Group md:flex gap-8 lg:gap-3 xl:gap-8'>
                    <div className='first-box w-full md:w-3/5 mt-5 sm:mt-6'>
                        <div className='bg-[#f7f6f6] rounded-lg p-4 shadow-md'>
                            <h1 className='font-semibold'>General Information</h1>
                            <h4 className='text-sm mt-3 font-normal'>Name Product</h4>
                            <input type="text" className='w-full bg-[#EFEFEF] mt-1 rounded-md h-9 text-gray-500 outline-none px-2 text-sm' defaultValue={product.productName}/>
                            <h4 className='text-sm mt-3 font-normal'>Product Description</h4>
                            <textarea name="" id="" className='w-full mt-1 px-2 rounded-md py-1 text-gray-500 text-sm h-36 resize-none bg-[#EFEFEF] outline-none' defaultValue={product.productDescription}></textarea>
                            <div className='flex gap-2 mt-2'>
                                <div className='w-full'>
                                    <h1 className='text-sm font-normal'>Size</h1>
                                    <h3 className='text-xs text-gray-400 font-medium'>Product size</h3>
                                    <div className='h-9 w-9 flex items-center rounded-md text-xs font-normal justify-center bg-[#A0EDA8]'>
                                        <h1>{product.productSize}</h1>
                                    </div>
                                </div> 
                                <div className='w-full'>
                                    <div className='flex items-center gap-1'>
                                        <h1 className='text-sm font-normal'>Sku</h1>
                                        <h3 className='text-xs text-gray-400 font-medium'>(optional)</h3>
                                    </div>
                                    <h3 className='text-xs text-gray-400 font-medium'>SKU (Stock Keeping Unit)</h3>
                                    <input type="text" className='w-full bg-[#EFEFEF] mt-1 rounded-md h-9 text-gray-500 outline-none px-2 text-sm' defaultValue={product.Sku}/>
                                </div>
                            </div>
                        </div>
                        <div className='bg-[#f7f6f6] rounded-lg p-4 shadow-md mt-5'>
                            <h1 className='font-semibold '>Pricing and Stock</h1>
                            <div className='flex gap-2 mt-3 w-full'>
                                <div className='w-full'>
                                    <h4 className='text-sm font-normal'>Price</h4>
                                    <input type="text" className='w-full bg-[#EFEFEF] mt-1 rounded-md h-9 text-gray-500 outline-none px-2 text-sm' defaultValue={product.productPrice}/>
                                </div>
                                <div className='w-full'>
                                    <h4 className='text-sm font-normal'>Stock</h4>
                                    <input type="text" className='w-full bg-[#EFEFEF] mt-1 rounded-md h-9 text-gray-500 outline-none px-2 text-sm' defaultValue={product.productStock}/>
                                </div>
                            </div>
                            <div className='flex gap-2 mt-5 w-full'>
                                <div className='w-full'>
                                    <h4 className='text-sm font-normal'>Discount</h4>
                                    <input type="text" className='w-full bg-[#EFEFEF] mt-1 rounded-md h-9 text-gray-500 outline-none px-2 text-sm' defaultValue={product.productDiscount}/>
                                </div>
                                <div className='w-full'>
                                    <h4 className='text-sm font-normal'>Quality</h4>
                                    <input type="text" className='w-full bg-[#EFEFEF] mt-1 rounded-md h-9 text-gray-500 outline-none px-2 text-sm' defaultValue={product.productQuality}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='second-box w-full xl:w-2/5 mt-10'>
                        <div className='bg-[#f7f6f6] rounded-lg p-4 shadow-md'>
                            <h1 className='font-semibold'>Upload Product</h1>
                            <div className={imgParent}>
                                <div className={imgSubParent}>
                                    <Image
                                    fill
                                    src={isSelected ? isSelected : product.images[0] ? product.images[0] : '/assets/sub_img.png'}
                                    alt='First Index'
                                    className="object-contain object-center"
                                    placeholder = 'blur'    
                                    blurDataURL='add new url later'
                                    />
                                </div>
                            </div>
                            <div className="mt-2 flex w-full gap-2 ">
                                <SubImage
                                src={product.images[0]}
                                alt='sum image 1'
                                onClick={()=> setSelected(product.images[0])}
                                />
                                <SubImage
                                src={product.images[1]}
                                alt='sum image 2'
                                onClick={()=> setSelected(product.images[1])}
                                />
                                <SubImage
                                src={product.images[2]}
                                alt='sum image 3'
                                onClick={()=> setSelected(product.images[2])}
                                />
                            </div>
                        </div>
                        <div className='bg-[#f7f6f6] rounded-lg p-4 shadow-md mt-5'>
                            <h1 className='font-semibold'>Category</h1>
                            <div className='w-full'>
                                <h4 className='text-sm font-normal'>Product Category</h4>
                                <input type="text" className='w-full bg-[#EFEFEF] mt-1 rounded-md h-9 text-gray-500 outline-none px-2 text-sm' defaultValue={product.productCategory}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ))
        }
    </>
    )
}
