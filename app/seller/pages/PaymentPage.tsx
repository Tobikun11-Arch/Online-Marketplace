import Image from 'next/image'
import React, { useState } from 'react' 
import CountrySelector from '../components/payment-methods/WorldSelector'
import { CreditCard } from 'lucide-react'
import CreditCardInput from '../components/payment-methods/CreditCard'
import CvcExp from '../components/payment-methods/CvcExp'

export default function PaymentPage() {
    const [ save, setSave ] = useState<boolean>(false)
    const [ card, setCard ] = useState<boolean>(false)

    function handleCancel() {
        setCard(false)
        setSave(false)
    }

    return (
        <main className='px-6 pt-5 pb-16 sm:px-2 sm:py-5 sm:pl-16 sm:pr-4 lg:px-5 xl:px-12 bg-[#D6DCE1] h-full'>
            {!card ? (
                <section className='flex gap-3 items-center'>
                <div className='w-72 rounded-lg shadow-md bg-white p-4 flex items-center flex-col'>
                    <div className='flex'>
                        <div className='relative h-8 w-14 rounded-md'>
                            <Image
                                fill
                                src={'/assets/mastercard.png'}
                                alt='master card'
                                loading='lazy'
                                className=''
                            />
                        </div>
                        <div className='relative h-9 w-14 rounded-md'>
                            <Image
                                fill
                                src={'/assets/visacard.webp'}
                                alt='master card'
                                loading='lazy'
                                className=''
                            />
                        </div>
                    </div>
                    <div className='flex flex-col items-center font-semibold'>
                        <h1 className='mt-5'>Add your first credit card</h1>
                        <h1>for payment</h1>
                    </div>
                    <p className='text-[10px] mt-3 text-gray-500'>This credit card will be used by default for billing.</p>
                    <button className='bg-blue-600 text-white py-2 px-3 text-sm font-medium rounded-md mt-5' onClick={()=> setCard(true)}>
                        Add new card
                    </button>
                </div>
                </section>
            ) : (
                <section className='w-full sm:w-96 rounded-lg shadow-md bg-white p-4 flex flex-col'>
                    <p className='text-xs font-medium'>Country or region</p>
                    <CountrySelector/>
                    <p className='text-xs font-medium mt-2'>Address line 1</p>
                    <input type="text" className='w-full bg-gray-100 rounded-md h-9 mt-1 font-medium text-xs px-2 outline-none' placeholder='210 Townsmith st.'/>
                    <hr className='border border-gray-200 mt-7'/>
                    <h1 className='mt-4 font-semibold'>Payment</h1>
                    <div className='mt-2 rounded-md w-32 pl-2 py-2 border border-blue-600 bg-gray-100'>
                        <CreditCard color='blue' size={20}/>
                        <p className='text-sm text-blue-600'>Card</p>
                    </div>
                    <p className='text-xs font-medium mt-2'>Card number</p>
                    <CreditCardInput/>
                    <CvcExp/>
                    <p className='text-[9px] text-gray-400 font-medium mt-5'>By providing your card information, you allow SajuBazaar to change your
                        card for future payments accordance with their terms.
                    </p>
                    <div className='flex justify-end gap-2 items-center mt-8 font-semibold'>
                        <button className='shadow-md py-2 w-20 rounded-md text-xs' onClick={handleCancel}>Cancel</button>
                        <button className='py-2 w-20 rounded-md bg-blue-600 text-white text-xs' onClick={()=> setSave(true)}>Save</button>
                    </div>
                    {save && (
                        <p className='text-xs font-medium text-red-500 mt-2'>Sorry, but this button is not working as this web app is for a personal project only and does not collect important data like credit card information.</p>
                    )}
                </section>
            )}
        </main>
    )
}
