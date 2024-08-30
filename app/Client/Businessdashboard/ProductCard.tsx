"use client"
import React, { useEffect, useState } from 'react'

export default function ProductCard() {

    const [products, setProducts] = useState<{productName: string, description: string, images: string[], productPrice: number, quantity: number}[]>([])

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

    }, []);

    console.log("ProductLists: ", products)


  return (
   <>
   
   <div className="w-full h-screen flex justify-center items-center">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((list, index) => (
            <li key={index} className="bg-white shadow-md rounded-lg overflow-hidjden">
              <div
                className="w-48 h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${list.images[0]})` }}
              ></div>
              <div className="p-4">
                <h1 className="text-xl font-bold">{list.productName}</h1>
                <p className="text-gray-700">{list.productPrice}</p>
                <p className="text-gray-700">{list.quantity}</p>
                <p className="text-gray-700">{list.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

   </>
  )
}
