import React from 'react'
interface AuthProps {
    children: React.ReactNode;
}

const AuthStyle = ({children}: AuthProps) => {
    return (
        <div className='bg-white h-full gap-2 justify-center w-full flex items-center border border-gray-300 rounded-md'>
        {children}
        </div>
    )
}

export default AuthStyle
