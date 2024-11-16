import React from 'react'
    import {
        Select,
        SelectContent,
        SelectGroup,
        SelectItem,
        SelectLabel,
        SelectTrigger,
        SelectValue,
    } from '../../../@/components/ui/select'

const Category = () => {
    return (
        <Select>
            <SelectTrigger className="w-full outline-none">
                <SelectValue placeholder="Select a fruit" className='text-black dark:text-white'/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup className='w-full py-2 pl-2 pr-16'>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default Category
