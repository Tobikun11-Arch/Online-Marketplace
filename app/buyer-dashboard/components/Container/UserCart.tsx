import React, { FC, useCallback, useEffect, useState } from 'react'
import { ICartItem } from '../../Interface/CartItem'
import { useProductCart } from '../../store/productCart'
import Image from 'next/image'
import { useUser } from '../../store/User'
import { X, Minus, Plus } from 'lucide-react'
import { updateQuantity } from '../../axios/dataStore'
interface cartProps {
    Cart: ICartItem | undefined
}

const UserCart:FC<cartProps> = ({ Cart }) => {
    const { cart: localCart } = useProductCart()
    const { user } = useUser()
    const [ newQuantity, setNewQuantity ] = useState<{ [key: string]: number }> (
        Cart?.user.cart.reduce((acc, item)=> {
            acc[item.productId as any] = item.quantity
            return acc
        }, {} as { [key: string]: number }) || {}
    )

    const UpdateQuantity = useCallback(async (productId: string, Crement: string, current: number) => {
        let updatedQuantity =  Crement === 'Add' ? current + 1 : Math.max(1, current - 1)

        setNewQuantity((prev)=> ({
            ...prev,
            [productId]: updatedQuantity
        }))

        const userDetails = {
            userId: user?._id,
            productId,
            quantity: updatedQuantity
        }

        console.log("userDetails: ", userDetails)
        try {
            const response = await updateQuantity.put('',  userDetails, { withCredentials: true })
            console.log("success! ", response.data)
        } catch (error) {
            console.error("Fetching error: ", error)
        }
    }, [user])

    return (
        <div className='cursor-default h-full flex flex-col justify-between'>
            <div>
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
                                <Minus onClick={()=> UpdateQuantity(cartItem.productId as any, "Subtract", newQuantity[cartItem.productId as any] || cartItem.quantity)} size={15} color='gray'/>
                                <h2>{newQuantity[cartItem.productId as any] ? newQuantity[cartItem.productId as any] : cartItem.quantity}</h2>
                                <Plus onClick={()=> UpdateQuantity(cartItem.productId as any, "Add", newQuantity[cartItem.productId as any] || cartItem.quantity)} size={15} color='gray'/>
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
                                <Minus onClick={()=> UpdateQuantity(local.productId as any, "Subtract", newQuantity[local.productId as any])} size={15} color='gray'/>
                                <h2>{newQuantity[local.productId as any] ? newQuantity[local.productId as any] : local.quantity}</h2>
                                <Plus onClick={()=> UpdateQuantity(local.productId as any, "Add", newQuantity[local.productId as any])} size={15} color='gray'/>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='mt-3'/>
                </>
            ))}
            </div>
            <button
            className='dark:bg-white rounded-lg py-2 dark:text-black bg-black text-white font-bold'>
                Buy
            </button>
        </div>
    );
}

export default UserCart

