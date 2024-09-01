"use client"
import React, { useEffect, useState } from 'react'
import { Skeleton } from '../../../@/components/ui/skeleton';

export default function ProductCard() {

    const [products, setProducts] = useState<{productName: string, description: string, images: string[], productPrice: number, quantity: number}[]>([])
    const [loading, setLoading] = useState(true); 

    useEffect(() => {

        const fetchData = async () => {

        const token = localStorage.getItem('token');
      
        if (!token) {
          
           console.log("Token error", token)
           return
                
        }

        try {

                const response = await fetch('https://online-marketplace-backend-six.vercel.app/api/productList', {
                 method: 'GET',
                headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
                 },

                  });

                  if(!response.ok) {

                    console.error('Error fetching data:', response);
                    setProducts([])
                    return

                  }

                  const data = await response.json();
                setProducts(data.ProductLists || [])

        } 
        
        catch (error) {
            
            console.error('Error making request:', error);

        }

    }

    fetchData();
  
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);


  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {loading ? (
         
          Array.from({ length: 2 }).map((_, index) => (
            <li key={index} className="bg-white shadow-md rounded-lg overflow-hidden w-48 ml-10">
              <Skeleton className="w-48 h-48 bg-gray-200 p-2" /> {/* Skeleton for image */}
              <div className="p-4">
                <Skeleton className="text-xl font-bold h-4 mb-2 bg-gray-200" />
                <Skeleton className="text-gray-700 h-4 mb-2 bg-gray-200" />
                <Skeleton className="text-gray-700 h-4 mb-2 bg-gray-200" />
                <Skeleton className="text-gray-700 h-4 mb-2 bg-gray-200" />
              </div>
            </li>
          ))
        ) : (
          // Render actual products when not loading
          products.map((list, index) => (
            <li key={index} className="bg-white shadow-md rounded-lg overflow-hidden w-48 ml-10">
              <div
                className="w-48 h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${list.images[0]})` }}
              ></div>
              <div className="p-4">
                <h1 className="text-xl text-gray-700 font-bold">{list.productName}</h1>
                <p className="text-gray-700">{list.productPrice}</p>
                <p className="text-gray-700">{list.quantity}</p>
                <p className="text-gray-700">{list.description}</p>
              </div>
            </li>
          ))
        )}
      </ul>
    </>
  );
}