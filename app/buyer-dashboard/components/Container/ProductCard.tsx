import React from 'react'
import { Products } from '../../entities/entities'
import { useProductData } from '../../store/storeProduct'

interface productProps {
    product: Products[]
}

const ProductCard = ({ product } : productProps) => {
    const productImages = product.map((product) => product.images[2])
    console.log("Product image 1 with 3 images: ", productImages)

    return (
        <div>
        
        </div>
    )
}

export default ProductCard
