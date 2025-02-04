import React, { useState } from "react";

const CvcExp = () => {
    const [expiryDate, setExpiryDate] = useState("");
    const [cvc, setCvc] = useState("");
    const [expiryDateValid, setExpiryDateValid] = useState(true);
    const [cvcValid, setCvcValid] = useState(true);

    // Handle expiry date input change
    const handleExpiryDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/\D/g, "").slice(0, 4); // Only allow 4 digits
        const formattedValue = value.length > 2 ? `${value.slice(0, 2)}/${value.slice(2)}` : value;
        setExpiryDate(formattedValue);

        // Validate expiry date
        if (formattedValue.length === 5) {
            const [month, year] = formattedValue.split("/").map(Number);
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed in JS
            const currentYear = currentDate.getFullYear() % 100; // Last 2 digits of the year

            // Check if the month and year are valid
            if (
                (year > currentYear) ||
                (year === currentYear && month >= currentMonth)
            ) {
                setExpiryDateValid(true);
            } else {
                setExpiryDateValid(false);
            }
        }
    };

    // Handle CVC input change
    const handleCvcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/\D/g, "").slice(0, 3); // Only allow 3 digits
        setCvc(value);
        setCvcValid(value.length === 3); // Validate that it's exactly 3 digits
    };

    return (
        <div className="flex gap-2 mt-2 items-center">
            {/* Expiry Date Input */}
           <div>
                <p className='text-xs font-medium'>Expiry</p>
                <div className="relative flex items-center">
                    <input
                        id="expiryDate"
                        className={`w-full bg-gray-100 rounded-md h-9 mt-1 font-medium text-xs px-2 outline-none pr-10 ${!expiryDateValid ? 'border-red-500' : ''}`}
                        type="text"
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                        placeholder="MM/YY"
                        maxLength={5}
                    />
                    {!expiryDateValid && (
                        <div className="absolute -bottom-4 text-xs text-red-500">
                            Expiry Date is invalid
                        </div>
                    )}
                </div>
           </div>

            {/* CVC Input */}
            <div>
                <p className='text-xs font-medium'>CVC</p>
                <div className="relative flex items-center">
                    <input
                        id="cvc"
                        className={`w-full bg-gray-100 rounded-md h-9 mt-1 font-medium text-xs px-2 outline-none pr-10 ${!cvcValid ? 'border-red-500' : ''}`}
                        type="text"
                        value={cvc}
                        onChange={handleCvcChange}
                        placeholder="CVC"
                        maxLength={3}
                    />
                </div>
            </div>
        </div>
    );
};

export default CvcExp;
