import React from 'react'
import { Products } from '../../entities/entities'

interface productProps {
    productName: string
    productPrice: string
    productDiscount: string
}

const ProductInfoCard = ({ productName, productPrice, productDiscount }: productProps) => {
    const productprice = parseInt(productPrice)
    const productdiscount = parseInt(productDiscount)
    const ProductPrice = productprice - productdiscount

    return (
        <div className="absolute bottom-2 px-5 left-0 w-full">
            <div className="flex">
                <h1>{productName}</h1>
                <h1>{ProductPrice}</h1>
                {/* Continue tommorrow */}
            </div>
        </div>
    )
}

export default ProductInfoCard
