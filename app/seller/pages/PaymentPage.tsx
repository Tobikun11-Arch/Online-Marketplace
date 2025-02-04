import React, { useState } from 'react'

export default function PaymentPage() {
    const [ card, setCard ] = useState<boolean>(false)

    return (
        <main className='px-6 pt-5 pb-16 sm:px-2 sm:py-5 sm:pl-16 sm:pr-4 lg:px-5 xl:px-12'>
            <section>
                <div className='w-24 h-44 shadow-md'>
                    Visa
                </div>
                {card && (
                    <div className='w-24 h-44 shadow-md'>
                        Default card
                    </div>
                )}
            </section>
        </main>
    )
}
