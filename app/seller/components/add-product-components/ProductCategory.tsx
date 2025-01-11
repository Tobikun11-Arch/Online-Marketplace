import { Field, Select } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useCategory } from '../../state/add-product-state/ProductDetails'

export default function ProductCategory() {
    const { setCategory } = useCategory()

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = event.target.value; 
        setCategory(selectedCategory);
    };

    return (
        <div className="w-full text-xs font-normal">
        <Field>
            <div className="relative bg-[#EFEFEF] mt-1 rounded-md">
            <Select
                onChange={handleCategoryChange}
                defaultValue="" // Optional: Set a default value
                className={clsx(
                    'block w-full appearance-none rounded-md border-none bg-[#EFEFEF] py-1.5 px-3 text-sm/6 text-black',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                    // Make the text of each option black on Windows
                    '*:text-black font-normal'
                )}
            >
                <option className='text-black font-abc font-light'>Electronics</option>
                <option className='text-black font-abc font-light'>Home & Kitchen</option>
                <option className='text-black font-abc font-light'>Fashion</option>
                <option className='text-black font-abc font-light'>Health & Beauty</option>
                <option className='text-black font-abc font-light'>Sports & Outdoors</option>
                <option className='text-black font-abc font-light'>Toys & Games</option>
                <option className='text-black font-abc font-light'>Automotive</option>
                <option className='text-black font-abc font-light'>Office Supplies</option>
                <option className='text-black font-abc font-light'>Books & Media</option>
                <option className='text-black font-abc font-light'>Food & Beverages</option>
                <option className='text-black font-abc font-light'>Pet Supplies</option>
                <option className='text-black font-abc font-light'>Garden & Outdoor</option>
                <option className='text-black font-abc font-light'>Crafts & Hobbies</option>
            </Select>
            <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black"
                aria-hidden="true"
            />
            </div>
        </Field>
        </div>
    )
}