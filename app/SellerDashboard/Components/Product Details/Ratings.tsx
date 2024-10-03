import React from 'react'
import { Star } from "lucide-react"
import { useSelectedProducts } from '../../hooks/ReusableHooks'

export default function Ratings() {
    const { productSelected } = useSelectedProducts()

    const Rating_Review = 2.5 //Sample rating
    const Total_Review = 317
    const Sold_Product = 497
    const Product_Remaining = 233
    const Prod_Price = productSelected?.productPrice ? parseInt(productSelected?.productPrice.toString(), 10) : 0
    const Disc_Price = productSelected?.productDiscount ? parseInt(productSelected?.productDiscount.toString(), 10) : 0
    const Final_Price = Prod_Price - Disc_Price

//Total Points=(200×5)+(200×4)+(100×3)+(0×2)+(0×1)=1000+800+300+0+0=2100

// Calculate the Average:
// Average Rating=2100500=4.2
// Average Rating=5002100​=4.2

    return (
        <>
            <div className="flex justify-between text-base font-semibold mt-1">
                <p>{productSelected?.productName}</p>
                <p>${Final_Price}</p>    
            </div>      

            <div className="flex gap-2 items-center justify-between mt-1">
                <div className="flex items-center">
                    <Star strokeWidth={1} size={17} fill='gray'/>
                    <Star strokeWidth={1} size={17} fill='gray'/>
                    <Star strokeWidth={1} size={17} fill='gray'/>
                    <Star strokeWidth={1} size={17} fill='gray'/>
                    <Star strokeWidth={1} size={17} fill='gray'/>
                    <p className='pl-1 mt-0.5 text-sm font-normal'>{productSelected?.productStatus === 'Published' ? Rating_Review : ''}</p>
                </div>

                <p className='text-sm font-normal mt-0.5'>{productSelected?.productStatus === 'Published' ? `${Total_Review} Reviews` : ''}</p>
            </div>

            <div className="flex gap-2 items-center mt-1">
                <p className='bg-gray-200 rounded-sm py-1 px-3 text-sm font-medium font-abc'>{productSelected?.productStatus === 'Published' ? `${Sold_Product} Sold` : ''}</p>
                <p className='bg-gray-200 rounded-sm py-1 px-3 text-sm font-medium font-abc'>{productSelected?.productStatus === 'Published' ? `${Product_Remaining} Remaining` : ''}</p>
            </div>
        </>
    )
}   
