"use client"
import React, { useEffect } from 'react'
import HeroSection from './HeroSection'
import AuthCheck from '../AuthCheck'
import { validateToken } from '../SellerDashboard/axios/axios'
//Continue tommorow
const Page = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await validateToken.get('', { withCredentials: true });
                console.log("Token:", response.data.message);
            } catch (error) {
                console.error("Error fetching token:", error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <HeroSection />
        </div>
    )
}

export default Page
