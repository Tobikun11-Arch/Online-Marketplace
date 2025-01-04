import React from 'react'
interface AuthProps {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLParagraphElement> | undefined
}

const AuthStyle = ({children, onClick}: AuthProps) => {
    return (
        <div className='bg-white h-full justify-center w-full flex items-center border border-gray-300 rounded-md' onClick={onClick}>
        {children}
        </div>
    )
}

export default AuthStyle
