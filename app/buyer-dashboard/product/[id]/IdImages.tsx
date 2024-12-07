import React, { FC, useState } from 'react'
import { Products } from '../../entities/entities'
import Image from 'next/image'
interface productProps {
    products: Products[]
}

const IdImages: FC<productProps> = ({ products }) => {

    return (
         <div>
            {products.map((product, productIndex) => (
                <ProductImageSwapper key={productIndex} images={product.images} />
            ))}
        </div>
    )
}

interface ProductImageSwapperProps {
    images: string[];
}

const ProductImageSwapper: FC<ProductImageSwapperProps> = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(images[0]); 
    const [thumbnails, setThumbnails] = useState(images.slice(1)); //Making the 2 other imgs as thumbnails

    const handleThumbnailClick = (index: number) => {
        // Swap the clicked thumbnail with the current image
        const newThumbnails = [...thumbnails];
        const newMainImage = thumbnails[index];
        newThumbnails[index] = currentImage; // Replace clicked thumbnail with the main image
        setCurrentImage(newMainImage); // Update the main image
        setThumbnails(newThumbnails); // Update the thumbnails
    };

    return (
        <div className="relative w-full h-[600px] flex flex-col justify-center items-center md:mb-0 bg-white dark:bg-[#171717]">
            {/* Main Image */}
            <div className="relative w-3/4 h-2/3 aspect-w-1 aspect-h-1 hover:scale-105">
                <Image
                    fill
                    src={currentImage}
                    alt="Main Image"
                    className="object-contain object-center"
                    placeholder="blur"
                    blurDataURL="add new url later"
                />
            </div>

            {/* Thumbnails, Ginawang array ung 2 last remaining imgs then map for same concept */}
            <div className="flex gap-4 mt-4"> 
                {thumbnails.map((thumbnail, index) => (
                    <div key={index} className="relative w-32 h-32  border-2 border-blue-800 rounded-lg cursor-pointer" onClick={() => handleThumbnailClick(index)}>
                        <Image
                            fill
                            src={thumbnail}
                            alt={`Thumbnail ${index + 1}`}
                            className="object-contain object-center p-5 aspect-w-1 aspect-h-1 hover:scale-125"
                            placeholder="blur"
                            blurDataURL="add new url later"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}


export default IdImages
