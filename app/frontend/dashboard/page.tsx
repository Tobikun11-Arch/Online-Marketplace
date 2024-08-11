"use client"; // Ensure this is at the top of your file
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

const DashboardPage = () => {
    const [user, setUser] = useState<{ name: string; email: string} | null>(null);
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
                const response = await fetch('https://online-marketplace-backend-ten.vercel.app/api/dashboard', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
        
                if (response.ok) {
                    setLoader(false)
                    const data = await response.json();
                    setUser({ name: data.user.Name, email: data.user.Email}); 

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
            
            <div className="w-full h-screen bg-gray-100 flex justify-center items-center">

            <p>Loading...</p>
       
            </div>

            </>
        )

    }


    return (
        <>
        
        <div className="w-full h-screen bg-gray-100 flex justify-center items-center">

        <h1 className='w-2/4'>Welcome, {user?.name}! All of your data, as well as any data you store on this site, will be 100% secure. This site uses Json Web Token(Jwt) and password hashing, so even if an uninvited guest (hacker) breaches our database, your data will remain protected. HAHHAHA chilax kalang ha next 2 weeks tapos na to.</h1>   
       
        </div>
        </>
    );
};

export default DashboardPage;
