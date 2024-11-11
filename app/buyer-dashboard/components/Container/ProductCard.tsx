import React, { useEffect } from 'react'
import { Products } from '../../entities/entities'

interface products {
    product: Products[]
}

const ProductCard = ({ product }: products) => {

    return (
        <>
            {product.map((prodTest) => (
                <div key={prodTest._id}>
                    <h1>Product Card: {prodTest.productName}</h1>
                    {/* <h1>Product Images: {prodTest.images[0]}</h1> Image tommorrow */}
                </div>
            ))}
        </>
    )
}

export default ProductCard
