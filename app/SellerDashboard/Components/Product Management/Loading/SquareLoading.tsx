import React from 'react'
import { useLoading } from '../../../hooks/ReusableHooks'

const SquareLoading = () => {
    const { isLoading } = useLoading()

    return (
        <div>
            {isLoading ? 
            (<>
            <div className="w-full h-screen flex justify-center items-center fixed top-0 left-0 bg-black opacity-50 z-50">
                <div className="load">
                    <l-square
                    size="70"
                    stroke="3.5"
                    speed="0.9" 
                    color="white" 
                    ></l-square>
                </div>
            </div>
            </>) : ('')}
        </div>
    )
}

export default SquareLoading
