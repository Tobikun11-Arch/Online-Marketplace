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
                <SelectGroup>
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
