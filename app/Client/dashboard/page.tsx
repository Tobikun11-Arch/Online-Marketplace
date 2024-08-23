"use client"; // Ensure this is at the top of your file
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dotenv from 'dotenv';
import './LogRegs.css'
dotenv.config();

const DashboardPage = () => {
    const [user, setUser] = useState<{ firstname: string; lastname: string; email: string} | null>(null);
    const [loader, setLoader] = useState(false)
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
                 setLoader(true)
            if (!token) {
                router.push('/login'); // Redirect to login if token is not found
                return;
            }

            try {
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


    if(loader) {

        return(
            <>
            
            <div className="w-full h-screen bg-black flex justify-center items-center">

            <div className="loader"></div>
       
            </div>

            </>
        )

    }


    return (
        <>
        
        <div className="w-full h-screen bg-gray-950 flex justify-center items-center">

        <h1 className='w-3/4 text-white'>Welcome, {user?.firstname} {user?.lastname}! All of your data, as well as any data you store on this site, will be 100% secure. This site uses Json Web Token(Jwt) and password hashing, so even if an uninvited guest (hacker) breaches our database, your data will remain protected. HAHHAHA chilax kalang ha next 2 weeks tapos na to.</h1>   
       
        </div>
        </>
    );
};

export default DashboardPage;
