import React, { useState } from "react";
import creditCardType from "credit-card-type";
import Image from "next/image";

const CreditCardInput = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [cardType, setCardType] = useState("Unknown");

    // Function to format the card number
    const formatCardNumber = (value: string) => {
        // Remove all non-digit characters
        const cleanedValue = value.replace(/\D/g, "");
        // Add a space after every 4 digits
        const formattedValue = cleanedValue.replace(/(\d{4})(?=\d)/g, "$1 ");
        return formattedValue.trim(); // Trim any trailing space
    };

    // Handle input change
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const formattedValue = formatCardNumber(inputValue);
        // Update the card number state
        setCardNumber(formattedValue);

        // Detect the card type
        const cardTypes = creditCardType(formattedValue.replace(/\s/g, "")); // Remove spaces for detection
        if (cardNumber.length > 1) {
            if(cardTypes.length > 0) {
                setCardType(cardTypes[0].type);
            }
        } else {
            setCardType("Unknown");
        }
    };

    return (
        <div className="relative flex items-center">
            <input
                id="cardNumber"
                className="w-full bg-gray-100 rounded-md h-9 mt-1 font-medium text-xs px-2 outline-none pr-10"
                type="text"
                value={cardNumber}
                onChange={handleInputChange}
                placeholder="4242 4242 4242 4242"
                maxLength={19} // 16 digits + 3 spaces
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                {cardType === 'Unknown' && (
                     <div className='flex'>
                        <div className='relative h-6 w-9 rounded-md'>
                            <Image
                                fill
                                src={'/assets/mastercard.png'}
                                alt='master card'
                                loading='lazy'
                                className=''
                            />
                        </div>
                        <div className='relative h-6 w-8 rounded-md'>
                            <Image
                                fill
                                src={'/assets/visacard.webp'}
                                alt='visa card'
                                loading='lazy'
                                className=''
                            />
                        </div>
                    </div>
                )}

                {cardType === 'visa' && (
                    <div className='relative h-6 w-8 rounded-md'>
                        <Image
                            fill
                            src={'/assets/visacard.webp'}
                            alt='visa card'
                            loading='lazy'
                            className=''
                        />
                    </div>
                )}

                {cardType === 'mastercard' && (
                    <div className='relative h-6 w-9 rounded-md'>
                        <Image
                            fill
                            src={'/assets/mastercard.png'}
                            alt='master card'
                            loading='lazy'
                            className=''
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreditCardInput;