import React, { useRef, useState } from 'react' 
import { Store, Check, Save, Plus, FileWarning } from 'lucide-react'
import SizeUi from '../components/add-product-components/SizeUi'
import QualityComponents from '../components/add-product-components/Quality'
import ProductCategory from '../components/add-product-components/ProductCategory'
import { productDetails, useImages, useCategory } from '../state/add-product-state/ProductDetails'
import { useSize } from '../state/add-product-state/Size'
import Image from 'next/image'
import SubImage from '../components/add-product-components/SubImage'
import { CloudinaryConnection } from '../services/axios/Connection'
import { useUser } from '../state/User'
import { fetchPostData, FetchDraft } from '../services/axios-instance/PostInstance'
import { useToast } from "../../../@/hooks/use-toast"
import ProcessLoading from '../loading/ProcessLoading'

export default function AddProduct() {
    const { setisProductName, isProductName, setDescription, isDescription, setSku, isSku, setPrice, isPrice, setStock, isStock, setDiscount, isDiscount, isQuality, setQuality } = productDetails()
    const { isSubImage_01, isSubImage_02, isSubImage_03, setSubImage_01, setSubImage_02, setSubImage_03, setSelected, isSelected } = useImages();
    const { isCategory, setCategory } = useCategory()
    const { isSize, setSize } = useSize()
    const imgParent = 'relative w-full h-96 mt-2 md:h-[300px] flex flex-col justify-center items-center md:mb-0 bg-[#EFEFEF] rounded-md'
    const imgSubParent = 'relative w-3/4 h-3/4 aspect-w-1 aspect-h-1'
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { user } = useUser()
    const [ isLoading, setLoading ] = useState<boolean>(false)
    const { toast } = useToast()
    const [ isProcess, setProcess ] = useState<string>('')

    const handleAddProduct = async (process: string) => {
        const productImages: string[] = [ isSubImage_01, isSubImage_02, isSubImage_03 ].filter(Boolean)
        let publicIds: string[] = [];
        setProcess(process)

        const resetFormState = () => {
            setisProductName('');
            setDescription('');
            setSku('');
            setPrice(0);
            setStock(0); 
            setDiscount(0);
            setQuality('New'); 
            setSize('XS')
            // Reset images
            setSubImage_01('');
            setSubImage_02('');
            setSubImage_03('');
            setCategory('Electronics'); 
            setSelected('')
        };

        if(!isProductName || !isDescription || isPrice === 0 || isStock === 0 || !isSize || !isSubImage_01 || !isSubImage_02 || !isSubImage_03) {
            toast({
                description: "Please fill all fields",
                className: 'text-white'
            })
            return
        }
        setLoading(true)
        try {
            const uploadPromises = productImages.map(async (image: string, index) => {
                // Convert base64 string to a Blob or File object
                const blob = await fetch(image).then((res) => res.blob());
                const file = new File([blob], `image_${index + 1}.png`, { type: 'image/png' });
                
                // Prepare FormData for Cloudinary upload
                const imgData = new FormData();
                imgData.append('file', file);
                imgData.append('upload_preset', 'Onlinemarket');
                
                // Upload to Cloudinary
                const response = await CloudinaryConnection.post('', imgData);
                const data = response.data;
                return { secure_url: data.secure_url, public_id: data.public_id };
            });
            // Wait for all uploads to complete
            const cloudinaryResults = await Promise.all(uploadPromises);
            const cloudinaryUrls = cloudinaryResults.map((result) => result.secure_url);
            publicIds = cloudinaryResults.map((result) => result.public_id);
            const product_details = {
                userId: user?._id,
                productName: isProductName,
                status: "Published",
                productDescription: isDescription,
                productCategory: isCategory,
                Sku: isSku,
                productPrice: isPrice,
                productStock: isStock,
                productDiscount: isDiscount,
                productQuality: isQuality,
                productSize: isSize,
                images: cloudinaryUrls
            };

            try {
                const response = await fetchPostData(product_details)
                if(response) {
                    resetFormState()
                    toast({
                        description: "Product added successfully!",
                        className: 'text-white'
                    })
                    setLoading(false)
                }
            } catch (error) {
                console.error(error)
                setLoading(false)
                toast({
                    description: "Failed to add product. Please try again.",
                    className: 'text-white'
                })
            }
        } catch (error) {
            console.error(error)
            setLoading(false)
            toast({
                description: "Failed to add product. Please try again.",
                className: 'text-white'
            })
        }
    } 

    const handleDraft = async (process: string) => {
        const productImages: string[] = [ isSubImage_01, isSubImage_02, isSubImage_03 ].filter(Boolean)
        let publicIds: string[] = [];
        setProcess(process)

        const resetFormState = () => {
            setisProductName('');
            setDescription('');
            setSku('');
            setPrice(0);
            setStock(0); 
            setDiscount(0);
            setQuality(''); 
            setSize('XS')
            // Reset images
            setSubImage_01('');
            setSubImage_02('');
            setSubImage_03('');
            setCategory(''); 
        }

        if(!isSubImage_01 || !isSubImage_02 || !isSubImage_03) {
            toast({
                description: "The product image cannot be empty. Please upload an image before saving to draft.",
                className: 'text-black shadow-md bg-white'
            })
            return
        }

        setLoading(true)
        try {
            const uploadPromises = productImages.map(async (image: string, index) => {
                // Convert base64 string to a Blob or File object
                const blob = await fetch(image).then((res) => res.blob());
                const file = new File([blob], `image_${index + 1}.png`, { type: 'image/png' });
                
                // Prepare FormData for Cloudinary upload
                const imgData = new FormData();
                imgData.append('file', file);
                imgData.append('upload_preset', 'Onlinemarket');
                
                // Upload to Cloudinary
                const response = await CloudinaryConnection.post('', imgData);
                const data = response.data;
                return { secure_url: data.secure_url, public_id: data.public_id };
            });
            // Wait for all uploads to complete
            const cloudinaryResults = await Promise.all(uploadPromises);
            const cloudinaryUrls = cloudinaryResults.map((result) => result.secure_url);
            publicIds = cloudinaryResults.map((result) => result.public_id);
            const product_details = {
                userId: user?._id,
                productName: isProductName,
                status: "Draft",
                productDescription: isDescription,
                productCategory: isCategory,
                Sku: isSku,
                productPrice: isPrice,
                productStock: isStock,
                productDiscount: isDiscount,
                productQuality: isQuality,
                productSize: isSize,
                images: cloudinaryUrls
            };

            try {
                const response = await FetchDraft(product_details)
                if(response) {
                    resetFormState()
                    toast({
                        description: "Product added to draft!",
                        className: 'text-black shadow-md bg-white'
                    })
                    setLoading(false)
                }
            } catch (error) {
                console.error(error)
                setLoading(false)
                toast({
                    description: "Failed to add product. Please try again.",
                    className: 'text-black shadow-md bg-white'
                })
            }
        } catch (error) {
            console.error(error)
            setLoading(false)
            toast({
                description: "Failed to add product. Please try again.",
                className: 'text-black shadow-md bg-white'
            })
        }
    }

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
                    //All image slot occs
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            {isLoading ? (
                    <ProcessLoading label={isProcess}/>
            ) : (
                <>
        <div className='px-6 pt-5 pb-16 sm:px-2 sm:py-5 sm:pl-16 sm:pr-4 lg:px-5 xl:px-12'>
            <div className='flex justify-end sm:justify-between items-center'>
                <div className='hidden sm:flex gap-1 items-center'>
                    <Store/>
                    <h1 className='font-semibold text-[#45984d]'>Add New Product</h1>
                </div>
                <div className='flex gap-2'>
                    <button className='shadow-md py-2 px-3 flex items-center gap-1 rounded-xl text-xs font-semibold' onClick={()=> handleDraft('Adding to draft')}>
                        <Save size={17}/>
                        Save Draft
                    </button>
                    <button className='flex items-center gap-1 bg-[#A0EDA8] shadow-md py-2 text-xs px-3 rounded-xl font-semibold' onClick={()=> handleAddProduct('Adding product')}>
                        <Check size={17}/>
                        Add Product
                    </button>
                </div>
            </div>
            <div className='Group md:flex gap-8 lg:gap-3 xl:gap-8'>
                <div className='first-box w-full md:w-3/5 mt-5 sm:mt-10'>
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
                                <h4 className='text-sm font-normal'>Discount (%)</h4>
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
                <div className='second-box w-full xl:w-2/5 mt-10'>
                    <div className='bg-[#f7f6f6] rounded-lg p-4 shadow-md'>
                        <h1 className='font-semibold'>Upload Product</h1>
                        <div className={imgParent}>
                            <div className={imgSubParent}>
                                <Image
                                    fill
                                    key={isSelected || isSubImage_01 ? `image-${isSelected || isSubImage_01}` : 'default-image'}
                                    src={isSelected ? isSelected : isSubImage_01 ? isSubImage_01 : '/assets/sub_img.png'}
                                    alt='First Index'
                                    className="object-contain object-center"
                                    placeholder='blur'
                                    blurDataURL='add new url later'
                                />
                            </div>
                        </div>
                        <div className="mt-2 flex w-full gap-2 ">
                            <SubImage
                            src={isSubImage_01}
                            alt='sum image 1'
                            onClick={()=> setSelected(isSubImage_01)}
                            />
                            <SubImage
                            src={isSubImage_02}
                            alt='sum image 1'
                            onClick={()=> setSelected(isSubImage_02)}
                            />
                            <SubImage
                            src={isSubImage_03}
                            alt='sum image 1'
                            onClick={()=> setSelected(isSubImage_03)}
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
                </>
            )}
        </>
    )
}
