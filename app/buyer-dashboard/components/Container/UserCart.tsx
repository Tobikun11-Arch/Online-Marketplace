import React, { FC, useState } from 'react'
import { ICartItem } from '../../Interface/CartItem'
import { useProductCart } from '../../store/productCart'
import Image from 'next/image'
import { X, Minus, Plus } from 'lucide-react'
interface cartProps {
    Cart: ICartItem | undefined
}

const UserCart:FC<cartProps> = ({ Cart }) => {
    const { cart: localCart } = useProductCart()
    const [ newQuantity, setNewQuantity ] = useState(1)

    return (
        <div className='cursor-default'>
            {Cart?.user.cart && Cart.user.cart.length > 0 ? (
                Cart.user.cart.map((cartItem, index) => (
                    <>
                        <div key={index} className='flex gap-3 mt-4'>
                        <div className='relative w-24 h-24 flex flex-col cursor-default justify-center items-center md:mb-0 bg-white dark:bg-black rounded-lg border border-[#333333]'>
                            <Image
                                fill
                                src={cartItem.images[0]}
                                alt={`image 1`}
                                className="object-contain object-center p-1"
                                placeholder = 'blur' 
                                blurDataURL='add new url later'
                            />
                        <X className='absolute -top-3 -left-2 flex items-center pr-3 font-bold' size={30}/>
                    </div>

                    <div className="w-full flex justify-between">
                        <div className='flex flex-col'>
                            <h1 className='font-semibold'>{cartItem.productName}</h1>
                            <h1>₱{cartItem.price}</h1>
                        </div>
                        <div className='flex items-end'>
                            <div className='flex gap-2 border border-[#333333] rounded-xl py-1 px-4 items-center'>
                                <Minus size={15} color='gray'/>
                                <p>{cartItem.quantity}</p>
                                <Plus size={15} color='gray'/>
                            </div>
                        </div>
                    </div>

                    </div>
                    <hr className='mt-3'/>
                    </>
                ))
            ) : (
                <h1>Cart is empty</h1>
            )}

            {localCart
            .filter(
                (local, index, self) => {
                    const isUniqueInLocalCart = index === self.findIndex((item) => item.productId === local.productId)
                    const doesNotExistInCart = !Cart?.user.cart?.some((cartItem) => cartItem.productId as any === local.productId as any)
                    return isUniqueInLocalCart && doesNotExistInCart
                }).map((local, index) => (
                    <>
                <div key={index} className='flex gap-3 mt-4'> 
                    <div className='relative w-24 h-24 flex flex-col cursor-default justify-center items-center md:mb-0 bg-white dark:bg-black rounded-lg border border-[#333333]'>
                            <Image
                                fill
                                src={local.images[0]}
                                alt={`image 1`}
                                className="object-contain object-center p-1"
                                placeholder = 'blur' 
                                blurDataURL='add new url later'
                            />
                        <X className='absolute -top-3 -left-2 flex items-center pr-3 font-bold' size={30}/>
                    </div>

                    <div className="w-full flex justify-between">
                        <div className='flex flex-col'>
                            <h1 className='font-semibold'>{local.productName}</h1>
                            <h1>₱{local.productPrice}</h1>
                        </div>
                        <div className='flex items-end'>
                            <div className='flex gap-2 border border-[#333333] rounded-xl py-1 px-4 items-center'>
                                <Minus size={15} color='gray'/>
                                <p>{local.quantity}</p>
                                <Plus size={15} color='gray'/>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='mt-3'/>
                </>
            ))}
        </div>
    );
}

export default UserCart

