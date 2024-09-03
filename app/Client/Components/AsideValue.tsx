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
import Link from 'next/link'
import axios from 'axios'

export default function AsideValue() {

    const [user, setUser] = useState<{ firstname: string; lastname: string; email: string, userId: string} | null>(null);
    const [loader, setLoader] = useState(false)
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/');
                return;
            }

            try {
                setLoader(true)
                const response = await axios.get('https://online-marketplace-backend-six.vercel.app/api/dashboard', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                    setLoader(false)
                    const data = response.data;

                    const firstname = data.user.FirstName;
                    const lastname = data.user.LastName;
                    
                    // Store in localStorage, overwriting any existing values
                    localStorage.setItem('FirstName', firstname);
                    localStorage.setItem('LastName', lastname);

                    setUser({ firstname: data.user.FirstName, lastname: data.user.LastName, email: data.user.Email, userId: data.user.userId}); 
                          
            
            } 
            
            catch (error) {

                console.error('Error making request:', error);
                router.push('/')

            }

        };

        fetchUserData();
    }, [router]);


    const Logout = () => {

       localStorage.clear();

    }
    
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setFirstname(localStorage.getItem('FirstName') || '');
            setLastname(localStorage.getItem('LastName') || '');
        }
    }, []);


    const handleInventory = () => {

        router.push('/Client/Businessdashboard/Inventory')

    }

    const handleProducts = () => {

        router.push('/Client/Businessdashboard/Add-Products')

    }

  return (
    <>

    <div className="Profie flex items-center gap-1 ml-5 pt-5">
    <div className="h-10 w-10 rounded-full bg-black" style={{
        backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/2919/2919906.png')",
        backgroundSize: 'cover', 
        backgroundPosition: 'center' }}>
    </div>

    <div>
         <p>{firstname ? firstname : user?.firstname} {lastname ? lastname : user?.lastname}</p>
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
