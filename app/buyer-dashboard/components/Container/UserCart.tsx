import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { ICartItem } from '../../Interface/CartItem'
import { useProductCart } from '../../store/productCart'
import Image from 'next/image'
import { useUser, useUserCart } from '../../store/User'
import { X, Minus, Plus } from 'lucide-react'
import { updateQuantity, deleteProduct } from '../../axios/dataStore'
import {loadStripe} from '@stripe/stripe-js';
import { StripePayment } from '../../axios/dataStore'
import { ring2 } from 'ldrs'
import { AddToCartPayload } from '../../Interface/CartItem'
import { myCart } from '../../axios/dataStore'
import { useQuery } from '@tanstack/react-query'
import { useToggle } from '../../store/useToggle'

interface cartProps {
    Cart: ICartItem | undefined
}

const UserCart:FC<cartProps> = ({ Cart }) => {
    const { setAuth, setCart } = useToggle()
    const { cart: localCart } = useProductCart()
    const { user } = useUser()
    const { setCartLength } = useUserCart()
    const [ isCheckout, setCheckout ] = useState<boolean>(false)    
    const [ localproduct, setlocal ] = useState<AddToCartPayload[]>([])
    const [ price, setPrice ] = useState<number | undefined>(0)
    const [ newQuantity, setNewQuantity ] = useState<{ [key: string]: number }> (
        Cart?.user.cart.reduce((acc, item)=> {
            acc[item.productId as any] = item.quantity
            return acc
        }, {} as { [key: string]: number }) || {}
    )

    const fetchData = async (): Promise<ICartItem> => {
        const response = await myCart.post('', { Email: user?.Email! }, { withCredentials: true });
        return response.data;
    };

    const { data, refetch } = useQuery<ICartItem>({
        queryKey: ['cartData'],
        queryFn: fetchData
    });

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

        try {
            await updateQuantity.put('',  userDetails, { withCredentials: true })
            await refetch()
        } catch (error) {
            console.error("Fetching error: ", error)
        }
    }, [user, newQuantity])

    const deleteProducts = async(productId: string) => {
        const userDetails = {
            productId,
            userId: user?._id,
        }
        console.log("Delete: ", userDetails)
        try {
            await deleteProduct.delete('', {data: userDetails, withCredentials: true})

            if(Cart) {
                Cart.user.cart = Cart.user.cart.filter((item) => item.productId?.toString() !== productId)
            } 
            const updatedLocalCart = localCart.filter((item) => item.productId !== productId);
            useProductCart.setState({ cart: updatedLocalCart });
            setNewQuantity((prev) => {
                const updatedQuantity = { ...prev };
                delete updatedQuantity[productId];
                return updatedQuantity;
            });
        } catch (error) {
            console.error(error)
        }
    }

    const totalPrice = useMemo(()=> {
        if(!Cart ||  !localCart) return 0
        const fetchProduct = Cart.user.cart.map((product)=> product)
        const ServerPrice = fetchProduct.reduce((acc, product)=> {
            const quantity = newQuantity[product.productId as any] || product.quantity
            return acc + product.price * quantity
        }, 0)
        const fetchId = Cart?.user.cart.map((product) => product.productId?.toString()) //id ng nasa fetch
        const localId = localCart.filter((product)=> !fetchId?.includes(product.productId.toString())) //filtered !id includes
        const Mapping = localId.map((product)=> product)
        const LocalPrice = Mapping.reduce((acc, product)=> {
            const quantity = newQuantity[product.productId as any] || product.quantity
            return acc + product.productPrice * quantity
        }, 0)
        return ServerPrice! + LocalPrice
    }, [Cart, localCart, newQuantity])

    useEffect(()=> {
        setPrice(totalPrice) 
        const UniqueCart = localCart.filter(
            (localItem)=> !Cart?.user.cart.some((cartItem)=> cartItem.productId as any === localItem.productId)
        ) //Include the localCart productId that doesnt exist on Cart.user or from fetch
        setCartLength(Cart?.user.cart.length!  + UniqueCart.length)
        const LocalCarts = localCart.filter(
            (localItem)=> !Cart?.user.cart.some((cartItem)=> cartItem.productId as any === localItem.productId)
        )
        setlocal(LocalCarts)
    }, [totalPrice, localCart])

    const handleCheckout = async () => {
        if(!user) {
            setCart(false)
            setAuth(true)
            return
        }
        const products_data = (Cart?.user.cart && Cart.user.cart.length >= 1) ? Cart.user.cart : localproduct;
        setCheckout(true)
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPEAPI!)
        const response = await StripePayment.post('', {products: products_data, userId: user?._id}, {withCredentials: true})
        stripe!.redirectToCheckout({
            sessionId: response.data.id
        })
        setCheckout(false)
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            ring2.register()
        }
    }, []);

    return (
        <div className='cursor-default h-full flex flex-col justify-between'>
                <div>
                {user && Cart?.user.cart && Cart.user.cart.length > 0 ? (
                    Cart.user.cart.map((cartItem, index) => (
                        <>
                            <div key={index} className='flex gap-3 mt-4 border-b-2 border-[#4444] pb-2'>
                                <div className='relative w-24 h-24 flex flex-col cursor-default justify-center items-center md:mb-0 bg-white dark:bg-[#333333] rounded-lg border border-[#333333]'>
                                    <Image
                                        fill
                                        src={cartItem.images[0]}
                                        alt={`image 1`}
                                        className="object-contain object-center p-1"
                                        placeholder = 'blur' 
                                        blurDataURL='add new url later'
                                    />
                                <X className='absolute -top-3 -left-2 flex items-center pr-3 font-bold' size={30} onClick={()=> deleteProducts(cartItem.productId as any)}/>
                                </div>
                                <div className="w-full flex justify-between">
                                    <div className='flex flex-col'>
                                        <h1 className='font-semibold'>{cartItem.productName}</h1>
                                        <h1>${cartItem.price}</h1>
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
                        </>
                    ))
                ) : (
                    <h1>{localCart.length === 0 && 'Cart is empty'}</h1>
                )}
    
                {localCart  
                .filter(
                    (local, index, self) => {
                        const isUniqueInLocalCart = index === self.findIndex((item) => item.productId === local.productId)
                        const doesNotExistInCart = !Cart?.user.cart.some((cartItem) => cartItem.productId as any === local.productId as any)
                        return isUniqueInLocalCart && doesNotExistInCart
                    }).map((local, index) => (
                        <>
                    <div key={index} className='flex gap-3 mt-4'> 
                        <div className='relative w-24 h-24 flex flex-col cursor-default justify-center items-center md:mb-0 bg-white dark:bg-[#a79e9e] rounded-lg border border-[#333333]'>
                                <Image
                                    fill
                                    src={local.images[0]}
                                    alt={`image 1`}
                                    className="object-contain object-center p-1"
                                    placeholder = 'blur' 
                                    blurDataURL='add new url later'
                                />
                            <X className='absolute -top-3 -left-2 flex items-center pr-3 font-bold' size={30} onClick={()=> deleteProducts(local.productId as any)}/>
                        </div>
                        <div className="w-full flex justify-between">
                            <div className='flex flex-col'>
                                <h1 className='font-semibold'>{local.productName}</h1>
                                <h1>${local.productPrice}</h1>
                            </div>   
                            <div className='flex items-end'>
                                <div className='flex gap-2 border border-[#333333] rounded-xl py-1 px-4 items-center'>
                                    <Minus onClick={()=> UpdateQuantity(local.productId as any, "Subtract", newQuantity[local.productId as any] || local.quantity)} size={15} color='gray'/>
                                    <h2>{newQuantity[local.productId as any] ? newQuantity[local.productId as any] : local.quantity}</h2>
                                    <Plus onClick={()=> UpdateQuantity(local.productId as any,"Add", newQuantity[local.productId as any] || local.quantity)} size={15} color='gray'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                ))}
                </div>
            <div className='flex flex-col gap-1 mt-5'>
                <div className="flex justify-between">
                    <h3>Total</h3>
                    <h3>${user ? `${price}` : '0'}</h3>
                </div>
                <hr color='gray' className='mb-3'/>
                <button
                className='dark:bg-white rounded-lg py-2 dark:text-black bg-black text-white font-bold mb-3' onClick={handleCheckout}>
                    {isCheckout ? (
                        <div className='flex gap-1 items-center justify-center'>
                            <p>Processing</p>
                            <l-ring-2
                                size="15"
                                stroke="5"
                                stroke-length="0.25"
                                bg-opacity="0.1"
                                speed="0.5" 
                                color="blue">
                            </l-ring-2>
                        </div>
                    ): 'Checkout'}
                </button>
            </div>
        </div>
    );
}

export default UserCart