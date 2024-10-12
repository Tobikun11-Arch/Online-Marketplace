import React from 'react'
import Login_Form from './Login/Login_Form'
import PageWrapper from '../Home Page/Components/ui/PageWrapper'


const Page = () => {

    return (
        <>
            <div className="h-screen w-full flex bg-white sm:items-center sm:justify-center">
                <Login_Form/>
            </div>
        </>
    )
}

export default Page