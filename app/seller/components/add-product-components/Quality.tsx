import { Field, Select } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { productDetails } from '../../state/add-product-state/ProductDetails'

export default function QualityComponents() {
    const { setQuality, isQuality } = productDetails()

    return (
        <div className="w-full max-w-md text-xs font-normal">
        <Field>
            <div className="relative bg-[#EFEFEF] mt-1 rounded-md">
            <Select
                value={isQuality} // Bind the value to isQuality
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setQuality(e.target.value)}
                className={clsx(
                    'block w-full appearance-none rounded-md border-none bg-[#EFEFEF] py-1.5 px-3 text-sm/6 text-black',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                    // Make the text of each option black on Windows
                    '*:text-black font-normal'
                )}
            >
                <option value="New">New</option>
                <option value="Refurbished">Refurbished</option>
                <option value="Used">Used</option>
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