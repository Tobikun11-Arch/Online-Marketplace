import React, { useState } from 'react';

const Filtered = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const options = ["Price range", "Ratings", "New arrivals", "DIscounts"];

    const handleSelect = (value: string) => {
        setSelectedItem(value);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full">
            {/* Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-transparent text-white py-2 px-4 rounded-md border outline-none border-gray-600 flex justify-between items-center"
            >
                <span>{selectedItem || "Filtered"}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Content */}
            {isOpen && (
                <ul className="absolute z-10 w-full bg-[#333333] text-white rounded-md shadow-lg mt-2 border border-gray-600">
                    {options.map((option) => (
                        <li
                            key={option}
                            onClick={() => handleSelect(option)}
                            className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Filtered;
