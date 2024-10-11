import React from 'react'

interface PageWrapperProps {
    children: React.ReactNode;
}

const PageWrapper = ({children}: PageWrapperProps) => {
    return (
        <div className='min-h-screen flex items-center justify-center'> 
            {children}
        </div>
    )
}

export default PageWrapper
