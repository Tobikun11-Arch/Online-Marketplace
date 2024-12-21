import React from 'react'
import { useLoading } from '../../../hooks/ReusableHooks'

const LoadingSchedule = () => {
    const { isLoadingSchedule } = useLoading()

return (
        <div>
            {isLoadingSchedule ? 
            (<>
            <div className="w-full h-screen flex justify-center items-center fixed top-0 left-0 bg-black opacity-50 z-50">
                <div className="load">
                    <l-pinwheel
                    size="70"
                    stroke="3.5"
                    speed="0.9" 
                    color="white" 
                    ></l-pinwheel>
                </div>
            </div>
            </>) : ('')}
        </div>
    )
}

export default LoadingSchedule
