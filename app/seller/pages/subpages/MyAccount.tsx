import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useUser } from '../../state/User'
import { PencilLine } from 'lucide-react'
import { useSideBarState } from '../../state/Sidebar'
import { httpRequestGet } from '../../services/axios-instance/GetInstance'
import { useQuery } from '@tanstack/react-query'
import { data_seller } from '../../services/axios/UserRequest'
import { ResponseData } from '../../services/axios-instance/GetInstance'
import { seller_datas } from '../../types/SellerData'

async function seller_data(userId?: string): Promise<ResponseData> {
    try {
        const response = await httpRequestGet('', data_seller, userId)
        if(!response) {
            return { user_data: [], productQuantities: [], product_orders: [], buyer_info: [], seller_data: [] }
        }
        return response
    } catch (error) {
        console.error("Fetching error: ", error)
        return { user_data: [], productQuantities: [], product_orders: [], buyer_info: [], seller_data: [] };
    }
}

//Profile tab
export default function MyAccount() {
    const { setData, seller } = seller_datas()
    const { user } = useUser()
    const { setActiveTab } = useSideBarState()
    const [ date, setDate ] = useState<string>('')

    const { data } = useQuery<ResponseData>({
        queryKey: ['seller data'], 
        queryFn: () => seller_data(user?._id),
    });

    useEffect(() => {
        const datas = (data?.seller_data ?? []).map((data_seller) => ({
            productcount: data_seller.productcount,
            ordercount: data_seller.ordercount,
            buyercount: data_seller.buyercount,
        }));
    
        setData(datas);

        const joinDate = user?.createdAt ? new Date(user.createdAt) : null;

        const formattedDate = joinDate
            ? joinDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
        : 'N/A'; // Default text if date is unavailable

        setDate(formattedDate)
    }, [data]);
    
    return (
        <main className='px-6 pt-5 pb-16 sm:px-2 sm:py-5 sm:pl-16 sm:pr-4 lg:px-5 xl:px-12'>
            <section className='font-semibold text-xs sm:text-sm lg:text-base flex justify-between md:px-12 xl:px-16'>
                <h1>Profile</h1>
                <h1>Dashboard/<span className='text-blue-600'>Profile</span></h1>
            </section>
            <section className='mt-4 md:px-12 xl:px-16'>
                <div className="relative w-full h-24 sm:h-60">
                    <Image
                        src={'/assets/profilewallpaper.jpg'}
                        alt='profile wallpaper'
                        loading='lazy'
                        fill
                        className="object-cover object-center"
                    />
                </div>
                <div className='bg-white shadow-md h-[30rem] flex flex-col items-center rounded-b-md'>
                    <div className="relative w-16 h-16 -mt-7 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-md right-0 sm:-mt-12 bg-white border-2 border-blue-600">
                        <Image
                            src={'/assets/sajubazaarlogo.png'}
                            alt="profile logo"
                            loading="lazy"
                            fill
                            className="object-cover object-center p-3"
                        />
                    </div>
                    <div className='flex text-base gap-2 items-center mt-3 font-semibold'>
                        <h4>{user?.FirstName}</h4>
                        <div className='flex items-center gap-1'>
                            <h5>{user?.LastName}</h5>
                            <PencilLine color='blue' size={16} onClick={()=> setActiveTab('Profile')}/>
                        </div>
                    </div>
                    <h1 className='text-sm font-medium text-gray-500'>SajuBazaar seller</h1>
                    {seller.map((info, index)=> (
                        <div key={index} className='flex gap-1 shadow-md rounded-md px-4 py-2 mt-5 font-semibold'>
                            <h4 className='pr-2'>{info.productcount} <span className='font-normal text-xs text-gray-500'>Products</span></h4>
                            <h4 className='border-l pl-2 pr-2'>{info.buyercount} <span className='font-normal text-xs text-gray-500'>Buyers</span></h4>
                            <h4 className='border-l pl-2'>{info.ordercount} <span className='font-normal text-xs text-gray-500'>Orders</span></h4>
                        </div>
                    ))}
                     <p className='text-sm text-gray-500 mt-10'>Joined on {date}</p>
                </div> 
            </section>
        </main>
    )
}
