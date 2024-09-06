import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from '../../../@/components/ui/accordion'
import ListAlt from '../Svg/List'
import WareHouse from '../Svg/Warehouse'
import ShowChart from '../Svg/chart'
import Campaign from '../Svg/Campaign'
import AccountSettings from '../Svg/AccountSettings'
import Support from '../Svg/Support'
import { useRouter } from 'next/navigation';
import '../auth/Css/load.css'
import Link from 'next/link'
import axios from 'axios'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient()

export default function AsideValue() {
    return(
        <QueryClientProvider client={queryClient}>
        <Value />
      </QueryClientProvider>
    )
}

interface User {
    FirstName: string;
    LastName: string;
    Email: string;
    userId: string;
}

interface ApiResponse {
    message: string;
    user: User;
}

function Value() {

    const router = useRouter();
    const dataUrl = process.env.NEXT_PUBLIC_DASHBOARD!;

    const { error, data } = useQuery<ApiResponse | null>({
        queryKey: ['UserData'],
        queryFn: async () => {
    
          try {
            const token = localStorage.getItem('token');
            if (!token) {
              throw new Error("No token found");
            }
            const response = await axios.get(dataUrl, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            return response.data;
          } 
          
          catch (error: any) {
            console.error('Error fetching data:', error);
            throw new Error(error.response?.data?.message || 'Failed to fetch products');
          }
    
        },
    }); 

    const Logout = () => {

       localStorage.clear();

    }

    const handleInventory = () => {

        router.push('/Client/Businessdashboard/Inventory')

    }

    const handleProducts = () => {

        router.push('/Client/Businessdashboard/Add-Products')

    }

    if (error) {
        return <p className="text-red-500">An error has occurred: {error.message}</p>;
      }

      const user = data?.user;

  return (
    <>

    <div className="Profie flex items-center gap-1 ml-5 pt-5">
    <div className="h-10 w-10 rounded-full bg-black" style={{
        backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/2919/2919906.png')",
        backgroundSize: 'cover', 
        backgroundPosition: 'center' }}>
    </div>

    <div>
    <p>{user?.FirstName} {user?.LastName}</p>
     </div>

    </div>
    
    <div className="flex ml-5 mt-10 flex-col gap-5">
    <Accordion type="single" collapsible className="w-full">

      <AccordionItem value="item-1"> 
        <div className="ProductManagement flex items-center gap-1">
        <WareHouse />
        <AccordionTrigger className='text-base lg:text-lg py-0'>Product Management</AccordionTrigger>
        </div>
        <AccordionContent className='text-base lg:text-lg ml-3 mt-2 cursor-default' onClick={handleProducts}>
        Add products
        </AccordionContent>
        
        <AccordionContent className='text-base lg:text-lg ml-3 mt-2 cursor-default' onClick={handleInventory}>   
         Inventory
        </AccordionContent>
        </AccordionItem>
        </Accordion>

        <div className="ProductManagement flex gap-1 items-center">
        <ListAlt />
        <p className='text-base lg:text-lg'>Order Management</p>
        </div>

        <div className="SalesAnalystics flex gap-1 items-center">
        <ShowChart/>
        <p className='text-base lg:text-lg'>Sales Analystics</p>
        </div>

        <div className="Promotions flex gap-1 items-center">
        <Campaign/>
        <p className='text-base lg:text-lg'>Promotions</p>
        </div>


        <Accordion type="single" collapsible className="w-full">

        <AccordionItem value="item-1">

        <div className="AccountSettings flex gap-1 items-center">
            <AccountSettings />
        <AccordionTrigger className='text-base lg:text-lg py-0'>Account settings</AccordionTrigger>
        </div>
        <AccordionContent className='text-base lg:text-lg ml-3 mt-2'>
        Profile details
        </AccordionContent>

        <AccordionContent className='text-base lg:text-lg ml-3 mt-2'>
        Address
        </AccordionContent>
        </AccordionItem>
        </Accordion>

        <div className="Support flex gap-1 items-center">
        <Support />
        <p className='text-base lg:text-lg'>Support</p>
        </div>

        <Link href={'/'}><p className='text-base lg:text-lg font-bold' onClick={Logout}>Logout</p></Link>

        </div>

    </>
  )
}