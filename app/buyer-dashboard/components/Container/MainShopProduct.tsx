import React from 'react'
import { Products } from '../../entities/entities'
import Image from 'next/image'
import ProductInfoCard from '../ui/ProductInfoCard'

interface productProps {
    products: Products[]
    isOpen: boolean
}

// const ProductCard = ({ products, isOpen } : productProps) => { Original version
//     return (
//         <div className={`${isOpen ? 'z-10' : ''}`}>
//             <div className='w-full h-72 px-4 bg-transparent'>
//                 {products.map((product)=> (
//                     <>
//                     <div key={product._id} className="relative w-full h-full flex flex-col mb-5 bg-white rounded-lg border">
//                         <Image
//                         layout='fill'
//                         src={product.images[0]}
//                         alt={`${product.productName}`}
//                         className='px-10 pt-4 pb-10'
//                         />
//                         <ProductInfoCard productName={product.productName} productPrice={product.productPrice} productDiscount={product.productDiscount}/>
//                     </div>  
//                 </>
//                 ))}
//             </div>
//         </div>
//     )
// }

const ProductCard = ({ products, isOpen } : productProps) => {
    return (
        <div className={`${isOpen ? 'z-10' : ''}`}>
            <div className='w-full h-72 px-4 bg-transparent'>
                {products.map((product)=> (
                    <>
                    <div key={product._id} className="relative w-full h-full flex flex-col justify-center items-center mb-5 bg-white rounded-lg border">
                       <h1>{product.productName}</h1>
                    </div>  
                </>
                ))}
            </div>
        </div>
    )
}

export default ProductCard
