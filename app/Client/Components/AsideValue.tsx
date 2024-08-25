import React, { useEffect, useState } from 'react';
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

export default function AsideValue() {

    const [user, setUser] = useState<{ firstname: string; lastname: string; email: string} | null>(null);
    const [loader, setLoader] = useState(false)
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login'); // Redirect to login if token is not found
                return;
            }

            try {
                setLoader(true)
                const response = await fetch('https://online-marketplace-backend-six.vercel.app/api/dashboard', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
        
                if (response.ok) {
                    setLoader(false)
                    const data = await response.json();
                    setUser({ firstname: data.user.FirstName, lastname: data.user.LastName, email: data.user.Email}); 

                }
                
                else {
                    
                    console.error('Error fetching protected data:', await response.json());

                }
            } 
            
            catch (error) {

                console.error('Error making request:', error);

            }

        };

        fetchUserData();
    }, [router]);


  return (
    <>

    <div className="Profie flex items-center gap-1 ml-5 pt-5">
    <div className="h-10 w-10 rounded-full bg-black" style={{
        backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/2919/2919906.png')",
        backgroundSize: 'cover', 
        backgroundPosition: 'center' }}>
    </div>

    <div>{loader ? (
        <>
              <div className="skeleton-loader"></div>
        </>
    ) : (
        <>
         <p>{user?.firstname} {user?.lastname}</p>
         </>
    )}</div>
    </div>
    
    <div className="flex ml-5 mt-10 flex-col gap-5">
    <Accordion type="single" collapsible className="w-full">

      <AccordionItem value="item-1"> 
        <div className="ProductManagement flex items-center gap-1">
        <WareHouse />
        <AccordionTrigger className='text-base lg:text-lg'>Product Management</AccordionTrigger>
        </div>
        <AccordionContent className='text-base lg:text-lg ml-3 mt-2'>
         Add products
        </AccordionContent>

        <AccordionContent className='text-base lg:text-lg ml-3 mt-2'>
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
        <AccordionTrigger className='text-base lg:text-lg'>Account settings</AccordionTrigger>
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
        </div>

    </>
  )
}
