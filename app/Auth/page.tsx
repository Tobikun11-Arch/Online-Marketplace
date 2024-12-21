"use client"
import React from 'react'
import Login_Form from './Login/Login_Form'
import SignUp_Form from './SignUp/SignUp_Form'
import { useForm } from './StateHandlers/Form'

const Page = () => {
    const { isForm } = useForm()

    return (
        <>
            <div className="h-screen w-full flex bg-white sm:items-center sm:justify-center">
                {isForm ? (
                <><SignUp_Form/></>
                ) : (
                <><Login_Form/></>  
                )}
            </div>
        </>
    )
}

export default Page

//<Login_Form/>
//<SignUp_Form/>