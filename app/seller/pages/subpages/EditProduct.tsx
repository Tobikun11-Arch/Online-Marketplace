import React, { useEffect, useState } from 'react'
import { useProducts } from '../../state/manage-products/Products'
import { useProductId } from '../../state/manage-products/ViewProduct'
import { Product } from '../../types/product'
import Image from 'next/image'
import { useSideBarState } from "../../state/Sidebar"
import { CircleChevronLeft, Save, Check, FileWarning } from 'lucide-react'
import { useCategory, productDetails } from '../../state/add-product-state/ProductDetails'
import { UpdateDetails, UpdatedImages } from '../../state/add-product-state/UpdateProduct'
import SubImage from '../../components/add-product-components/SubImage'
import { useSize } from '../../state/add-product-state/Size'
import SizeUi from '../../components/add-product-components/SizeUi'
import QualityComponents from '../../components/add-product-components/Quality'
import ProductCategory from '../../components/add-product-components/ProductCategory'
import { useUser } from '../../state/User'
import { update_products, update_draftProducts, Draft_Publish } from '../../services/axios/ProductRequests'
import { httpRequestPut } from '../../services/axios-instance/PutInstance'
import { PostFetch } from '../../services/axios-instance/PostInstance'
import { useToast } from "../../../../@/hooks/use-toast"

export default function EditProduct() {
    const { isResult } = useProducts()
    const { product_id } = useProductId()
    const [ products, setproducts ] = useState<Product[]>([])
    const { setActiveTab } = useSideBarState()
    const imgParent = 'relative w-full h-96 mt-2 md:h-[300px] flex flex-col justify-center items-center md:mb-0 bg-[#EFEFEF] rounded-md'
    const imgSubParent = 'relative w-3/4 h-3/4 aspect-w-1 aspect-h-1'
    const { setSelected, isSelected } = UpdatedImages();
    const { isCategory, setCategory } = useCategory()
    const { isSize, setSize } = useSize()
    const { setisProductName, isProductName, setDescription, isDescription, setSku, isSku, setPrice, isPrice, setStock, isStock, setDiscount, isDiscount } = UpdateDetails()
    const { setQuality, isQuality } = productDetails()
    const { user } = useUser()
    const { toast } = useToast()

    useEffect(()=> {
        const filtered = isResult.filter((product)=> product._id === product_id)
        setproducts(filtered)
        setSize(filtered[0].productSize)
        setQuality(filtered[0].productQuality)
        setCategory(filtered[0].productCategory)
    }, [isResult])

    //Update the published products
    const handle_rePublish = async (productName: string, productDescription: string, productSize: string, Sku: string, productPrice: number, productStock: number, productDiscount: number, productQuality: string, productCategory: string, images: string[]) => {
        const details = {
            userId: user?._id,
            productId: product_id,
            productName: isProductName || productName,
            productDescription: isDescription || productDescription,
            productSize: isSize || productSize,
            status: "Published",
            Sku: isSku || Sku,
            productPrice: isPrice || productPrice,
            productStock: isStock || productStock,
            productDiscount: isDiscount || productDiscount,
            productQuality: isQuality || productQuality,
            productCategory: isCategory || productCategory,
            images: images
        }
        const response = await httpRequestPut(update_products, '', details)
        if(response) {
            toast({
                description: "Product updated successfully!",
                className: 'text-black bg-white shadow-md'
            })
            return
        }
        toast({
            description: "Unable to update the product!",
            className: 'text-black bg-white shadow-md'
        })
    }

    const handle_draftchanges = async (productName: string, productDescription: string, productSize: string, Sku: string, productPrice: number, productStock: number, productDiscount: number, productQuality: string, productCategory: string, images: string[]) => {
        const details = {
            userId: user?._id,
            productId: product_id,
            productName: isProductName || productName,
            productDescription: isDescription || productDescription,
            productSize: isSize || productSize,
            status: "draft",
            Sku: isSku || Sku,
            productPrice: isPrice || productPrice,
            productStock: isStock || productStock,
            productDiscount: isDiscount || productDiscount,
            productQuality: isQuality || productQuality,
            productCategory: isCategory || productCategory,
            images: images
        }
        try {
            const response = await httpRequestPut(update_draftProducts, '', details)
            if(response) {
                toast({
                    description: "Product updated successfully!",
                    className: 'text-black bg-white shadow-md'
                })
                return
            }
            toast({
                description: "Unable to update the product!",
                className: 'text-black bg-white shadow-md'
            })
        } catch (error) {
            console.error("Error: ", error)
        }
    }

    const handle_newPublish = async(productName: string, productDescription: string, productSize: string, Sku: string, productPrice: number, productStock: number, productDiscount: number, productQuality: string, productCategory: string, images: string[]) => {
        const details = {
            userId: user?._id,
            productId: product_id,
            productName: isProductName || productName,
            productDescription: isDescription || productDescription,
            productSize: isSize || productSize,
            status: "Published",
            Sku: isSku || Sku,
            productPrice: isPrice || productPrice,
            productStock: isStock || productStock,
            productDiscount: isDiscount || productDiscount,
            productQuality: isQuality || productQuality,
            productCategory: isCategory || productCategory,
            images: images
        }

        try {
            if (
                (!isProductName && !productName) ||
                (!isDescription && !productDescription) ||
                (isPrice === 0 && productPrice === 0) || 
                (isStock === 0 && productStock === 0) ||
                (!isSize && !productSize)
            ) {
                toast({
                    description: "Please fill all fields",
                    className: 'text-black bg-white shadow-md'
                })
                return
            }
            const response = await PostFetch('', Draft_Publish, details)
            if(response) {
                toast({
                    description: "Product successfully published!",
                    className: 'text-black bg-white shadow-md'
                })
                setActiveTab('Manage Products')
            }
        } catch (error) {
            console.error("Error: ", error)
        }
    }

    return (
        <>
        {
            products.map((product, index)=> (
                <div key={index} className='px-6 pt-5 pb-16 sm:px-2 sm:py-5 sm:pl-16 sm:pr-4 lg:px-5 xl:px-12'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-1 items-center' onClick={()=> setActiveTab('Manage Products')}>
                        <CircleChevronLeft />
                        <h1 className='font-semibold text-[#45984d]'>Back</h1>
                    </div>
                    {product.status !== "draft" ? 
                        <div className='flex gap-2'>
                            <button className='shadow-md py-2 px-3 flex items-center gap-1 bg-[#A0EDA8] rounded-xl text-xs text-black font-semibold' onClick={()=> handle_rePublish(product.productName, product.productDescription, product.productSize, product.Sku, product.productPrice, product.productStock, product.productDiscount, product.productQuality, product.productCategory, product.images)}>
                                <Save size={17}/>
                                Save Changes
                            </button>
                        </div>  
                            :
                        <div className='flex gap-2'>
                            <button className='shadow-md py-2 px-3 flex items-center gap-1 rounded-xl text-xs font-semibold' onClick={()=>  handle_draftchanges(product.productName, product.productDescription, product.productSize, product.Sku, product.productPrice, product.productStock, product.productDiscount, product.productQuality, product.productCategory, product.images)}>
                                <Save size={17}/>
                                Save Changes
                            </button>
                            <button className='flex items-center gap-1 bg-[#A0EDA8] shadow-md py-2 text-xs px-3 rounded-xl font-semibold' onClick={()=> handle_newPublish(product.productName, product.productDescription, product.productSize, product.Sku, product.productPrice, product.productStock, product.productDiscount, product.productQuality, product.productCategory, product.images)}>
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
                            <input type="text" className='w-full bg-[#EFEFEF] mt-1 rounded-md h-9 text-gray-500 outline-none px-2 text-sm' placeholder={product.productName} value={isProductName} onChange={(e)=> setisProductName(e.target.value)}/>

                            <h4 className='text-sm mt-3 font-normal'>Product Description</h4>
                            <textarea name="" id="" className='w-full mt-1 px-2 rounded-md py-1 text-gray-500 text-sm h-36 resize-none bg-[#EFEFEF] outline-none' placeholder={product.productDescription} value={isDescription} onChange={(e)=> setDescription(e.target.value)}></textarea>
                            <div className='flex gap-2 mt-2'>
                                <div className='w-full'>
                                    <h1 className='text-sm font-normal'>Size</h1>
                                    <h3 className='text-xs text-gray-400 font-medium'>Product size</h3>
                                    <SizeUi/>
                                </div> 
                                <div className='w-full'>
                                    <div className='flex items-center gap-1'>
                                        <h1 className='text-sm font-normal'>Sku</h1>
                                        <h3 className='text-xs text-gray-400 font-medium'>(optional)</h3>
                                    </div>
                                    <h3 className='text-xs text-gray-400 font-medium'>SKU (Stock Keeping Unit)</h3>
                                    <input type="text" className='w-full bg-[#EFEFEF] mt-1 rounded-md h-9 text-gray-500 outline-none px-2 text-sm' placeholder={product.Sku} value={isSku} onChange={(e)=> setSku(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className='bg-[#f7f6f6] rounded-lg p-4 shadow-md mt-5'>
                            <h1 className='font-semibold '>Pricing and Stock</h1>
                            <div className='flex gap-2 mt-3 w-full'>
                                <div className='w-full'>
                                    <h4 className='text-sm font-normal'>Price</h4>
                                    <input type="text" className='w-full bg-[#EFEFEF] mt-1 rounded-md h-9 text-gray-500 outline-none px-2 text-sm' placeholder={product.productPrice.toString()} value={isPrice === 0 ? "" : isPrice} onChange={(e)=> {
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
                                    <input type="text" className='w-full bg-[#EFEFEF] mt-1 rounded-md h-9 text-gray-500 outline-none px-2 text-sm' placeholder={product.productStock.toString()} value={isStock === 0 ? "" : isStock} onChange={(e)=> {
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
                                    <input type="text" className='w-full bg-[#EFEFEF] mt-1 rounded-md h-9 text-gray-500 outline-none px-2 text-sm' placeholder={product.productDiscount.toString()} value={isDiscount === 0 ? "" : isDiscount} onChange={(e)=> {
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
                    <div className='second-box w-full xl:w-2/5 mt-5 sm:mt-6'>
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
                            <div className='flex gap-1 items-center'>
                                <FileWarning size={16} color='gray'/>
                                <h6 className='text-[10px] text-gray-500'>To change the product image, you must delete this product and upload a new one.</h6>
                            </div>
                        </div>
                        <div className='bg-[#f7f6f6] rounded-lg p-4 shadow-md mt-5'>
                            <h1 className='font-semibold'>Category</h1>
                            <div className='w-full'>
                                <h4 className='text-sm font-normal'>Product Category</h4>
                                <ProductCategory/>
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
