"use client"
import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import NavItems from '../ui/NavItems'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { searchData } from '../../axios/dataStore'
import { useUser } from '../../store/User'
import { Popover } from '@headlessui/react'
import { useSearch } from '../../store/userSearch'
import { useProductData } from '../../store/storeProduct'
import { X } from 'lucide-react';
import { Product } from '../../entities/entities'
import { AllProducts } from '../../axios/dataStore'
import { useQuery } from '@tanstack/react-query'
import { lineSpinner } from 'ldrs'
const fuzz = require('fuzzball');

interface NavbarProps {
    className?: string
    isOpen: boolean
}

interface ProductResponse {
    seller_products: Product[]
}

const Navbar = ({ className, isOpen }: NavbarProps) => {
    const { setSearch, search } = useSearch()
    const { user, setuser } = useUser()
    const [ history, setHistory ] = useState<string[]>([])
    const router = useRouter()
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const { product, setHandler, handler, setProduct } = useProductData()
    const SearchHover = 'text-sm py-1 font-semibold px-2 rounded hover:bg-[#3333]'

    //Fetch the products 
    const { error, data: ProductResponse } = useQuery<ProductResponse>({
        queryKey: ['product'],
        queryFn: async () => {
            const response = await AllProducts.get(''); //All products fetch from all seller
            return response.data
        },  
    })

    useEffect(() => {
        if (ProductResponse?.seller_products) {
            const updatedProducts = ProductResponse.seller_products.filter(
                product => product.productStock > 0
            ).sort((a, b) => a.productName.localeCompare(b.productName));
            setProduct(updatedProducts); // Update the product state
        }
    }, [ProductResponse?.seller_products, setProduct]);

    useEffect(()=> {
        if (user?.SearchData) {
            if(user?.SearchData.length > 8) {
                const search_filter = user?.SearchData.length <= 10 ? user.SearchData : user.SearchData.slice(user.SearchData.length - 10)
                setHistory(search_filter)
            } else {
                setHistory(user.SearchData); //add the function later that will add to the local storage the new search data so it can show without fetching
            }
        }
    }, [user, handler])

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (typeof window !== 'undefined') {
            lineSpinner.register()
        }
        if (e.key === 'Enter') {
            if(search === "") {
                //no searcg
            }
            else {
                if(user) {
                    const details = {
                        userId: user?._id,
                        search
                    }
                    await searchData.put('', details, { withCredentials: true }) //add new search on database
                    setuser({
                        ...user,
                        SearchData: [...user.SearchData, search]
                    });
                }   
                const product_search = product.map(product => ({
                    product,
                    search_similarity: fuzz.ratio(product.productName, search),
                }));
                const filter_average = product_search.filter(item  => item.search_similarity > 50)
                const product_data = filter_average.map(item => item.product)
                router.push('/buyer-dashboard/AllProducts')
                setHandler(product_data)
            }
        }
    };

    if(error) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#171717] dark:bg-[#171717]">
                <h1 className='text-2xl text-red-800'>Error Fetching</h1>
            </div>
        )
    }

    const defaultHistory = [
        "Wireless Bluetooth Headphones",
        "Smartphone Stand with Wireless Charger",
        "Smart Air Purifier",
        "Slim Fit Men’s Blazer",
        "Adjustable Kitchen Shelf",
        "Floral Print Women’s Dress",
        "Organic Face Serum",
        "Car Vacuum Cleaner",
    ];

    const handleRecentHistory = (searchItem: string) => {
        const product_search = product.map(product => ({
            product,
            search_similarity: fuzz.ratio(product.productName, searchItem), 
        }));
        const filter_average = product_search.filter(item  => item.search_similarity > 70)
        const product_data = filter_average.map(item => item.product)
        router.push('/buyer-dashboard/AllProducts')
        setHandler(product_data)
    }

    const handleDeleteHistory = async(deleteItem: string) => {
        if(user) {
            const updatedHistory = user.SearchData.filter(item => item !== deleteItem)
            setuser({
                ...user,
                SearchData: updatedHistory
            }) 
            const details = {
                userId: user._id,
                deleteItem
            }
            await searchData.put('', details, { withCredentials: true })
        }
    }

    return (
        <>
        <nav className={className}>
            <div className='flex items-center md:gap-16 xl:gap-32 cursor-default'>
                <div className='flex items-center gap-10'>
                    <div className="logo flex items-center" onClick={()=> router.push('/')}>
                        <Image
                            alt='logo Image'
                            width={40}
                            height={40}
                            src="/assets/logo.png"
                            placeholder='blur'
                            blurDataURL='data:image/svg+xml;base64,...'
                            className='h-full w-full block dark:hidden'
                        />
                        <Image
                            alt='Whitelogo Image'
                            width={40}
                            height={40}
                            src="/assets/whiteLogo.png"
                            placeholder='blur'
                            blurDataURL='data:image/svg+xml;base64,...'
                            className='h-full w-full hidden dark:block'
                        />
                        <h2 className='text-sm font-bold'>Bazaar</h2>
                    </div>
                    <NavItems className="cursor-default flex gap-3 items-center text-sm text-gray-500"/>
                </div>
                <Popover className="relative md:w-2/5">
                    <>
                        <div className="relative w-full">
                            <input
                            type="search"
                            value={search}
                            onFocus={() => setIsPopoverOpen(true)}
                            onBlur={() => setTimeout(() => setIsPopoverOpen(false), 100)}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-transparent border w-full rounded-md h-10 text-sm pl-2 pr-7 text-gray-800 dark:text-white outline-none"
                            placeholder="Search for products..."
                            />
                            <div className={`absolute inset-y-0 right-3 flex items-center ${isOpen ? 'hidden' : 'absolute'}`}>
                                <Search strokeWidth={2} className='text-black dark:text-white' size={15}/>
                            </div>
                        </div>
                        {isPopoverOpen && (
                            <Popover.Panel
                            className="absolute z-10 mt-1 w-full dark:bg-opacity-90 bg-white dark:backdrop-blur-sm backdrop-blur-md md:border dark:border-black dark:bg-black dark:text-white rounded-md shadow-lg text-gray-500" static>
                                <div className="flex flex-col p-2">
                                    {user?.Role === 'buyer' ? (
                                        <>
                                            {history.length > 0 ? (
                                            [...history].reverse().map((history, index) => (
                                                <>
                                                    <div className={`flex justify-between items-center ${SearchHover}`}>
                                                    <h2 key={index} onClick={()=> handleRecentHistory(history)} className='w-4/5'>
                                                        {history}
                                                    </h2>
                                                    <X size={15} className='hover:bg-white hover:rounded-full hover:text-black' onClick={()=> handleDeleteHistory(history)}/>
                                                    </div>
                                                </>
                                            ))
                                            ) : (
                                                <>
                                                    {defaultHistory.map((dafault, index)=> (
                                                        <h2 key={index} className={SearchHover} onClick={()=> handleRecentHistory(dafault)}>{dafault}</h2>
                                                    ))}
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {defaultHistory.map((dafault, index)=> (
                                                <h2 key={index} className={SearchHover} onClick={()=> handleRecentHistory(dafault)}>{dafault}</h2>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </Popover.Panel>
                        )} 
                    </>
                </Popover>
            </div>
        </nav>
        </>
    )
}

export default Navbar
