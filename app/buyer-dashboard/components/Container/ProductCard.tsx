import React, { useEffect } from 'react'
import { useProductData } from '../../store/storeProduct'

const ProductCard = () => {
    const { product } = useProductData()

    return (
        <>
            {product.map((prodTest) => (
                <div key={prodTest._id}>
                    <h1>Product Card: {prodTest.productName}</h1>
                </div>
            ))}
        </>
    )
}

export default ProductCard
