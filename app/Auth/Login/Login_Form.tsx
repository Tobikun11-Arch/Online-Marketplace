import React from 'react'
import LoginImage from '../Components/LoginImage'
import LoginWrapper from '../Components/ui/LoginWrapper'

const Login_Form = () => {
    return (
        <>
            <div className='h-3/4 w-4/5 bg-white flex shadow-2xl'>
                <LoginImage/>
                <LoginWrapper>
                <h1 className='text-black'>form</h1>
                </LoginWrapper>
            </div>
        </>
    )
}

export default Login_Form